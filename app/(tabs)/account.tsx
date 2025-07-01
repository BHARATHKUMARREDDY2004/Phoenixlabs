import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";

export default function Account() {
  const user = useAuthStore((state) => state.user);
  const clearAuthData = useAuthStore((state) => state.clearAuthData);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          clearAuthData();
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 px-4">
      <ScrollView showsVerticalScrollIndicator={false} className="py-6">

        {/* Profile Summary */}
        <View className="items-center mb-6">
          <Ionicons name="person-circle-outline" size={80} color="#1976D2" />
          <Text className="text-xl font-semibold text-neutral-800 mt-2">
            {user?.fullName || "Guest User"}
          </Text>
          <Text className="text-neutral-500 text-sm">{user?.patientId}</Text>
        </View>

        {/* Personal Info */}
        <SectionHeader title="Personal Info" />
        <Item label="Full Name" value={user?.fullName || "-"} icon="person-outline" />
        <Item label="Email" value="demo@email.com" icon="mail-outline" />
        <Item label="Patient ID" value={user?.patientId || "-"} icon="id-card-outline" />

        {/* Plan & Medication */}
        <SectionHeader title="Plan & Medication" />
        <Item label="Current Plan" value={user?.currentPlan || "-"} icon="fitness-outline" />
        <Item label="Next Delivery" value={user?.nextDeliveryDate || "-"} icon="calendar-outline" />
        <Item label="Remaining Medication" value={`${user?.remainingMedication || 0} doses`} icon="flask-outline" />
        <Item label="Status" value={user?.status || "-"} icon="pulse-outline" />
        <Item label="Billing Status" value={user?.billingStatus || "-"} icon="card-outline" />

        {/* App Settings */}
        <SectionHeader title="App Settings" />
        <NavItem label="Privacy & Security" icon="shield-checkmark-outline" />
        <NavItem label="Help & Support" icon="help-circle-outline" />
        <NavItem label="Terms & Conditions" icon="document-text-outline" />

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mt-6 bg-red-500 py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-base">Logout</Text>
        </TouchableOpacity>

        <View className="pb-[100px]" />
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable Item Row
function Item({ label, value, icon }: { label: string; value: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-2 border border-neutral-200">
      <Ionicons name={icon} size={22} color="#2196F3" />
      <View className="ml-4">
        <Text className="text-neutral-500 text-sm">{label}</Text>
        <Text className="text-neutral-800 font-medium text-base">{value}</Text>
      </View>
    </View>
  );
}

// Navigable Setting Row
function NavItem({ label, icon }: { label: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3 mb-2 border border-neutral-200">
      <View className="flex-row items-center">
        <Ionicons name={icon} size={22} color="#1976D2" />
        <Text className="ml-4 text-neutral-800 font-medium text-base">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6C757D" />
    </TouchableOpacity>
  );
}

// Section Header
function SectionHeader({ title }: { title: string }) {
  return (
    <Text className="text-lg font-semibold text-neutral-700 mt-6 mb-2">{title}</Text>
  );
}

