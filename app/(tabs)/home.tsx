import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/stores/authStore";
import Button from "@/components/Button";

function VitalCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View className="w-[47%] bg-white border border-neutral-200 rounded-xl px-4 py-3">
      <View className="flex-row items-center mb-2">
        <Ionicons name={icon} size={20} color="#1976D2" />
        <Text className="ml-2 text-sm text-neutral-500">{label}</Text>
      </View>
      <Text className="text-xl font-bold text-neutral-800">{value}</Text>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <Text className="text-lg font-semibold text-neutral-700 mt-6 mb-3">{title}</Text>
  );
}

function MedicationStatus({ taken }: { taken: boolean }) {
  return (
    <View className="bg-white border border-neutral-200 rounded-xl px-4 py-3 flex-row justify-between items-center">
      <View>
        <Text className="text-base text-neutral-700 font-medium">
          Morning Dose
        </Text>
        <Text className="text-sm text-neutral-500">Taken at 9:00 AM</Text>
      </View>
      <Ionicons
        name={taken ? "checkmark-circle-outline" : "close-circle-outline"}
        size={26}
        color={taken ? "#07BEB8" : "#FF5252"}
      />
    </View>
  );
}

function InfoCard({
  icon,
  title,
  subtitle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}) {
  return (
    <View className="bg-white border border-neutral-200 rounded-xl px-4 py-3 mb-2 flex-row items-center">
      <Ionicons name={icon} size={22} color="#2196F3" />
      <View className="ml-4">
        <Text className="text-base font-semibold text-neutral-800">{title}</Text>
        <Text className="text-sm text-neutral-500">{subtitle}</Text>
      </View>
    </View>
  );
}

export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 px-4 pt-4">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Greeting */}
        <Text className="text-2xl font-semibold text-primary-800 mb-1">
          Hello, {user?.fullName || "Patient"}
        </Text>
        <Text className="text-primary-700 mb-4">Back to Phoenix Health ! </Text>

        {/* Vitals Section */}
        <SectionHeader title="Your Vitals" />
        <View className="flex-row flex-wrap justify-between gap-3">
          <VitalCard label="Blood Pressure" value="120/80" icon="pulse-outline" />
          <VitalCard label="Heart Rate" value="72 bpm" icon="heart-outline" />
          <VitalCard label="Oxygen Level" value="98%" icon="water-outline" />
          <VitalCard label="Temperature" value="98.6°F" icon="thermometer-outline" />
        </View>

        <Button
          title="Add Today's Vitals"
          onPress={() => {}}
          className="mt-4"
        />

        {/* Medication Status */}
        <SectionHeader title="Today's Medication" />
        <MedicationStatus taken={true} />

        {/* Delivery Details */}
        <SectionHeader title="Next Refill Delivery" />
        <InfoCard
          icon="calendar-outline"
          title="Next Delivery Date"
          subtitle={user?.nextDeliveryDate || "Not Scheduled"}
        />

        {/* Current Plan */}
        <SectionHeader title="Current Plan" />
        <InfoCard
          icon="medkit-outline"
          title={user?.currentPlan || "Not Assigned"}
          subtitle={`${user?.remainingMedication || 0} doses remaining`}
        />

        <View className="pb-[100px]" />
      </ScrollView>
    </SafeAreaView>
  );
}
