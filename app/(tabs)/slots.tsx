import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { useBookingStore } from '@/stores/bookingStore';
import Button from '@/components/Button';
import { showCustomAlert } from '@/components/Alert';

const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
];

const generateId = () => Date.now().toString() + Math.floor(Math.random() * 1000);

// Get today's date
const getToday = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

export default function Slots() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const bookings = useBookingStore((state) => state.bookings);
  const addBooking = useBookingStore((state) => state.addBooking);
  const clearCompletedBookings = useBookingStore((state) => state.clearCompletedBookings);
  const updateBookingStatus = useBookingStore((state) => state.updateBookingStatus);
  const getBookingsByStatus = useBookingStore((state) => state.getBookingsByStatus);

  const upcomingBookings = useMemo(() => getBookingsByStatus('upcoming'), [bookings]);
  const completedBookings = useMemo(() => getBookingsByStatus('completed'), [bookings]);
  const cancelledBookings = useMemo(() => getBookingsByStatus('cancelled'), [bookings]);

  // Check if a slot is already booked for today
  const isSlotBooked = (timeSlot: string) => {
    const today = getToday();
    return upcomingBookings.some((booking) => booking.time === timeSlot && booking.date === today);
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;

    if (isSlotBooked(selectedSlot)) {
      showCustomAlert('Slot Unavailable', 'This time slot is already booked for today.', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      return;
    }

    const newBooking = {
      id: generateId(),
      time: selectedSlot,
      date: getToday(),
      status: 'upcoming' as const,
    };
    addBooking(newBooking);
    showCustomAlert('Success', `Slot booked for ${selectedSlot} on ${getToday()}`);
    setSelectedSlot(null);
  };

  const handleMarkCompleted = (bookingId: string) => {
showCustomAlert(
  'Mark as Completed', 
  'Mark this booking as completed?', 
  [
    { 
      text: 'Cancel', 
      style: 'cancel' 
    },
    {
      text: 'Complete',
      onPress: () => {
        updateBookingStatus(bookingId, 'completed');
        showCustomAlert('Success', 'Booking marked as completed!');
      },
    },
  ]
);
  };

  const handleCancelBooking = (bookingId: string) => {
    showCustomAlert('Cancel Booking', 'Are you sure you want to cancel this booking?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: () => {
          updateBookingStatus(bookingId, 'cancelled');
          showCustomAlert('Cancelled', 'Booking has been cancelled.');
        },
      },
    ]);
  };

  const handleClearCompleted = () => {
    if (completedBookings.length === 0) {
      showCustomAlert('No Data', 'No completed bookings to clear.');
      return;
    }

    showCustomAlert(
      'Clear Completed Bookings',
      `Are you sure you want to clear all ${completedBookings.length} completed bookings?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearCompletedBookings();
            showCustomAlert('Cleared', 'All completed bookings have been cleared.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="mb-4 text-2xl font-semibold text-primary-800">Book Your Slot</Text>

        {/* Available Time Slots */}
        <Text className="mb-3 text-lg font-medium text-neutral-700">
          Available Times for {new Date().toLocaleDateString()}
        </Text>

        <FlatList
          data={timeSlots}
          keyExtractor={(item) => item}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const isBooked = isSlotBooked(item);
            const isSelected = selectedSlot === item;

            return (
              <TouchableOpacity
                onPress={() => !isBooked && setSelectedSlot(item)}
                disabled={isBooked}
                className={`mb-3 w-[30%] items-center rounded-xl px-3 py-3 ${
                  isBooked
                    ? 'border border-primary-200 bg-primary-100'
                    : isSelected
                      ? 'bg-primary-600'
                      : 'border border-neutral-200 bg-white'
                }`}>
                <Text
                  className={`text-sm font-medium ${
                    isBooked ? 'text-primary-600' : isSelected ? 'text-white' : 'text-neutral-700'
                  }`}>
                  {item}
                </Text>
                {isBooked && <Text className="mt-1 text-xs text-primary-500">Booked</Text>}
              </TouchableOpacity>
            );
          }}
        />

        {selectedSlot && (
          <Button
            title={`Confirm Booking for ${selectedSlot}`}
            onPress={handleConfirm}
            className="mb-6 mt-2"
          />
        )}

        {/* Booking Tabs */}
        <View className="mb-4 flex-row rounded-xl bg-white p-1">
          {['upcoming', 'completed', 'cancelled'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              className={`flex-1 rounded-lg px-3 py-2 ${
                activeTab === tab ? 'bg-primary-600' : 'bg-transparent'
              }`}>
              <Text
                className={`text-center text-sm font-medium capitalize ${
                  activeTab === tab ? 'text-white' : 'text-neutral-600'
                }`}>
                {tab} (
                {tab === 'upcoming'
                  ? upcomingBookings.length
                  : tab === 'completed'
                    ? completedBookings.length
                    : cancelledBookings.length}
                )
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Clear Completed Button */}
        {activeTab === 'completed' && completedBookings.length > 0 && (
          <Button
            title={`Clear All Completed (${completedBookings.length})`}
            onPress={handleClearCompleted}
            className="mb-4 bg-primary-600"
          />
        )}

        {/* Bookings List */}
        {activeTab === 'upcoming' && upcomingBookings.length > 0 && (
          <>
            <Text className="mb-3 text-lg font-semibold text-primary-700">
              Upcoming Bookings ({upcomingBookings.length})
            </Text>
            {upcomingBookings.map((booking) => (
              <View
                key={booking.id}
                className="mb-3 rounded-xl border border-neutral-200 bg-white px-4 py-4">
                <View className="mb-2 flex-row items-start justify-between">
                  <View>
                    <Text className="text-lg font-semibold text-neutral-800">{booking.time}</Text>
                    <Text className="text-sm text-neutral-500">
                      Date: {new Date(booking.date).toLocaleDateString()}
                    </Text>
                    <View className="mt-1 self-start rounded-full bg-primary-100 px-2 py-1">
                      <Text className="text-xs font-medium capitalize text-primary-800">
                        {booking.status}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="mt-3 flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => handleMarkCompleted(booking.id)}
                    className="flex-1 rounded-lg bg-primary-600 px-3 py-2">
                    <Text className="text-center text-sm font-medium text-white">
                      Mark Complete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleCancelBooking(booking.id)}
                    className="flex-1 rounded-lg bg-primary-600 px-3 py-2">
                    <Text className="text-center text-sm font-medium text-white">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        {activeTab === 'completed' && completedBookings.length > 0 && (
          <>
            <Text className="mb-3 text-lg font-semibold text-primary-700">
              Completed Bookings ({completedBookings.length})
            </Text>
            {completedBookings.map((booking) => (
              <View
                key={booking.id}
                className="mb-3 rounded-xl border border-primary-200 bg-primary-50 px-4 py-4">
                <Text className="text-lg font-semibold text-neutral-800">{booking.time}</Text>
                <Text className="text-sm text-neutral-500">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </Text>
                <View className="mt-1 self-start rounded-full bg-primary-100 px-2 py-1">
                  <Text className="text-xs font-medium capitalize text-primary-800">
                    ✓ {booking.status}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        {activeTab === 'cancelled' && cancelledBookings.length > 0 && (
          <>
            <Text className="mb-3 text-lg font-semibold text-primary-700">
              Cancelled Bookings ({cancelledBookings.length})
            </Text>
            {cancelledBookings.map((booking) => (
              <View
                key={booking.id}
                className="mb-3 rounded-xl border border-primary-200 bg-primary-100 px-4 py-4">
                <Text className="text-lg font-semibold text-neutral-800 line-through">
                  {booking.time}
                </Text>
                <Text className="text-sm text-neutral-500">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </Text>
                <View className="mt-1 self-start rounded-full bg-primary-100 px-2 py-1">
                  <Text className="text-xs font-medium capitalize text-primary-800">
                    ✗ {booking.status}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Empty States */}
        {activeTab === 'upcoming' && upcomingBookings.length === 0 && (
          <View className="items-center rounded-xl bg-white p-6">
            <Text className="text-center text-neutral-500">
              No upcoming bookings.{'\n'}Book a slot above to get started!
            </Text>
          </View>
        )}

        {activeTab === 'completed' && completedBookings.length === 0 && (
          <View className="items-center rounded-xl bg-white p-6">
            <Text className="text-center text-neutral-500">No completed bookings yet.</Text>
          </View>
        )}

        {activeTab === 'cancelled' && cancelledBookings.length === 0 && (
          <View className="items-center rounded-xl bg-white p-6">
            <Text className="text-center text-neutral-500">No cancelled bookings.</Text>
          </View>
        )}

        <View className="pb-[120px]" />
      </ScrollView>
    </SafeAreaView>
  );
}
