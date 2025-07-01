import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import Button from "@/components/Button";
import { onboarding } from "@/constants";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  const handleNavigation = () => {
    router.replace("/login");
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-primary-100">
      {/* Skip Button */}
      <TouchableOpacity
        onPress={handleNavigation}
        className="w-full flex justify-end items-end"
      >
        <Text className="text-neutral-800 text-md font-bold bg-neutral-50/80 rounded-full px-3 mr-4">
          Skip
        </Text>
      </TouchableOpacity>

      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[24px] h-[6px] mx-1 bg-neutral-100 rounded-full" />
        }
        activeDot={
          <View className="w-[24px] h-[6px] mx-1 bg-primary-500 rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center">
            <Image
              source={item.image}
              className="w-full h-[550px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-8">
              <Text className="text-neutral-800 text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-semibold text-center text-neutral-600 mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Button */}
      <Button
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() => {
          if (isLastSlide) {
            handleNavigation();
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
        textStyle="text-neutral-50"
        className="w-11/12 mt-5 mb-5 bg-primary-500"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
