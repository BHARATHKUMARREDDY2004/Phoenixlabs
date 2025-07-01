import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useMemo } from "react";
import { useBookingStore } from "@/stores/bookingStore";
import Button from "@/components/Button";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM",
];

const generateId = () => Date.now().toString() + Math.floor(Math.random() * 1000);

// Get today's date
const getToday = () => {
  const d = new Date();
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
};

export default function Slots() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  
  const bookings = useBookingStore((state) => state.bookings);
  const addBooking = useBookingStore((state) => state.addBooking);
  const clearCompletedBookings = useBookingStore((state) => state.clearCompletedBookings);
  const updateBookingStatus = useBookingStore((state) => state.updateBookingStatus);
  const getBookingsByStatus = useBookingStore((state) => state.getBookingsByStatus);

  const upcomingBookings = useMemo(() => getBookingsByStatus("upcoming"), [bookings]);
  const completedBookings = useMemo(() => getBookingsByStatus("completed"), [bookings]);
  const cancelledBookings = useMemo(() => getBookingsByStatus("cancelled"), [bookings]);

  // Check if a slot is already booked for today
  const isSlotBooked = (timeSlot: string) => {
    const today = getToday();
    return upcomingBookings.some(
      (booking) => booking.time === timeSlot && booking.date === today
    );
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;
    
    if (isSlotBooked(selectedSlot)) {
      Alert.alert("Slot Unavailable", "This time slot is already booked for today.");
      return;
    }

    const newBooking = {
      id: generateId(),
      time: selectedSlot,
      date: getToday(),
      status: "upcoming" as const,
    };
    addBooking(newBooking);
    Alert.alert("Success", `Slot booked for ${selectedSlot} on ${getToday()}`);
    setSelectedSlot(null);
  };

  const handleMarkCompleted = (bookingId: string) => {
    Alert.alert(
      "Mark as Completed",
      "Mark this booking as completed?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Complete",
          onPress: () => {
            updateBookingStatus(bookingId, "completed");
            Alert.alert("Success", "Booking marked as completed!");
          },
        },
      ]
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            updateBookingStatus(bookingId, "cancelled");
            Alert.alert("Cancelled", "Booking has been cancelled.");
          },
        },
      ]
    );
  };

  const handleClearCompleted = () => {
    if (completedBookings.length === 0) {
      Alert.alert("No Data", "No completed bookings to clear.");
      return;
    }

    Alert.alert(
      "Clear Completed Bookings",
      `Are you sure you want to clear all ${completedBookings.length} completed bookings?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            clearCompletedBookings();
            Alert.alert("Cleared", "All completed bookings have been cleared.");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="text-2xl font-semibold text-primary-800 mb-4">
          Book Your Slot
        </Text>

        {/* Available Time Slots */}
        <Text className="text-lg font-medium text-neutral-700 mb-3">
          Available Times for {new Date().toLocaleDateString()}
        </Text>
        
        <FlatList
          data={timeSlots}
          keyExtractor={(item) => item}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const isBooked = isSlotBooked(item);
            const isSelected = selectedSlot === item;
            
            return (
              <TouchableOpacity
                onPress={() => !isBooked && setSelectedSlot(item)}
                disabled={isBooked}
                className={`px-3 py-3 rounded-xl mb-3 w-[30%] items-center ${
                  isBooked
                    ? "bg-red-100 border border-red-200"
                    : isSelected
                    ? "bg-primary-600"
                    : "bg-white border border-neutral-200"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    isBooked
                      ? "text-red-600"
                      : isSelected
                      ? "text-white"
                      : "text-neutral-700"
                  }`}
                >
                  {item}
                </Text>
                {isBooked && (
                  <Text className="text-xs text-red-500 mt-1">Booked</Text>
                )}
              </TouchableOpacity>
            );
          }}
        />

        {selectedSlot && (
          <Button
            title={`Confirm Booking for ${selectedSlot}`}
            onPress={handleConfirm}
            className="mt-2 mb-6"
          />
        )}

        {/* Booking Tabs */}
        <View className="flex-row bg-white rounded-xl p-1 mb-4">
          {["upcoming", "completed", "cancelled"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 px-3 rounded-lg ${
                activeTab === tab ? "bg-primary-600" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-center text-sm font-medium capitalize ${
                  activeTab === tab ? "text-white" : "text-neutral-600"
                }`}
              >
                {tab} ({
                  tab === "upcoming" ? upcomingBookings.length :
                  tab === "completed" ? completedBookings.length :
                  cancelledBookings.length
                })
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Clear Completed Button */}
        {activeTab === "completed" && completedBookings.length > 0 && (
          <Button
            title={`Clear All Completed (${completedBookings.length})`}
            onPress={handleClearCompleted}
            className="mb-4 bg-red-600"
          />
        )}

        {/* Bookings List */}
        {activeTab === "upcoming" && upcomingBookings.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-primary-700 mb-3">
              Upcoming Bookings ({upcomingBookings.length})
            </Text>
            {upcomingBookings.map((booking) => (
              <View
                key={booking.id}
                className="bg-white rounded-xl px-4 py-4 mb-3 border border-neutral-200"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="text-lg text-neutral-800 font-semibold">
                      {booking.time}
                    </Text>
                    <Text className="text-sm text-neutral-500">
                      Date: {new Date(booking.date).toLocaleDateString()}
                    </Text>
                    <View className="bg-green-100 px-2 py-1 rounded-full mt-1 self-start">
                      <Text className="text-xs text-green-800 font-medium capitalize">
                        {booking.status}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row gap-2 mt-3">
                  <TouchableOpacity
                    onPress={() => handleMarkCompleted(booking.id)}
                    className="flex-1 bg-green-600 py-2 px-3 rounded-lg"
                  >
                    <Text className="text-white text-center text-sm font-medium">
                      Mark Complete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleCancelBooking(booking.id)}
                    className="flex-1 bg-red-600 py-2 px-3 rounded-lg"
                  >
                    <Text className="text-white text-center text-sm font-medium">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        {activeTab === "completed" && completedBookings.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-green-700 mb-3">
              Completed Bookings ({completedBookings.length})
            </Text>
            {completedBookings.map((booking) => (
              <View
                key={booking.id}
                className="bg-green-50 rounded-xl px-4 py-4 mb-3 border border-green-200"
              >
                <Text className="text-lg text-neutral-800 font-semibold">
                  {booking.time}
                </Text>
                <Text className="text-sm text-neutral-500">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </Text>
                <View className="bg-green-100 px-2 py-1 rounded-full mt-1 self-start">
                  <Text className="text-xs text-green-800 font-medium capitalize">
                    ✓ {booking.status}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        {activeTab === "cancelled" && cancelledBookings.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-red-700 mb-3">
              Cancelled Bookings ({cancelledBookings.length})
            </Text>
            {cancelledBookings.map((booking) => (
              <View
                key={booking.id}
                className="bg-red-50 rounded-xl px-4 py-4 mb-3 border border-red-200"
              >
                <Text className="text-lg text-neutral-800 font-semibold line-through">
                  {booking.time}
                </Text>
                <Text className="text-sm text-neutral-500">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </Text>
                <View className="bg-red-100 px-2 py-1 rounded-full mt-1 self-start">
                  <Text className="text-xs text-red-800 font-medium capitalize">
                    ✗ {booking.status}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Empty States */}
        {activeTab === "upcoming" && upcomingBookings.length === 0 && (
          <View className="bg-white rounded-xl p-6 items-center">
            <Text className="text-neutral-500 text-center">
              No upcoming bookings.{"\n"}Book a slot above to get started!
            </Text>
          </View>
        )}

        {activeTab === "completed" && completedBookings.length === 0 && (
          <View className="bg-white rounded-xl p-6 items-center">
            <Text className="text-neutral-500 text-center">
              No completed bookings yet.
            </Text>
          </View>
        )}

        {activeTab === "cancelled" && cancelledBookings.length === 0 && (
          <View className="bg-white rounded-xl p-6 items-center">
            <Text className="text-neutral-500 text-center">
              No cancelled bookings.
            </Text>
          </View>
        )}

        <View className="pb-[120px]" />
      </ScrollView>
    </SafeAreaView>
  );
}
