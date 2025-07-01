import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import React from "react";

import { icons } from "@/constants";
import { TabIconProps } from "@/types/type";

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="flex items-center justify-center w-24 h-24">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-9 h-9"
      />
      <Text
        className={`${focused ? "font-semibold" : "font-regular"} text-md`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2196F3",
          tabBarInactiveTintColor: "#64B5F6",
          tabBarShowLabel: false,
            tabBarIconStyle: {
                width: 98,
                height: 70,
                backgroundColor: "#FFFFFF",
                marginTop: -22,
            },
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            height: 70,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
            overflow: "hidden",
            marginHorizontal: 20,
            marginBottom: 10,
          },
          
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.dashboard}
                color={color}
                name="Dashboard"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="slots"
          options={{
            title: "Slots",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.calendar}
                color={color}
                name="Slots"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "Shippments",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.history}
                color={color}
                name="Shippments"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.account}
                color={color}
                name="Account"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;