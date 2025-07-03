import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Platform,
} from "react-native";

type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: "cancel" | "destructive" | "default";
};

type AlertOptions = {
  title?: string;
  message?: string;
  buttons?: AlertButton[];
};

let showAlertFn: (options: AlertOptions) => void;

export const showCustomAlert = (title: string, message?: string, buttons?: AlertButton[]) => {
  showAlertFn({ title, message, buttons });
};

export default function CustomAlert() {
  const [visible, setVisible] = useState(false);
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({});

  const hide = () => setVisible(false);

  useEffect(() => {
    showAlertFn = ({ title, message, buttons }: AlertOptions) => {
      setAlertOptions({ title, message, buttons });
      setVisible(true);
    };

    const back = BackHandler.addEventListener("hardwareBackPress", () => {
      if (visible) {
        hide();
        return true;
      }
      return false;
    });

    return () => back.remove();
  }, [visible]);

  const renderButtons = () => {
    const buttons = alertOptions.buttons || [{ text: "OK", onPress: hide }];

    return buttons.map((btn, idx) => {
      const isCancel = btn.style === "cancel";
      const isDestructive = btn.style === "destructive";

      return (
        <TouchableOpacity
          key={idx}
          className={`px-4 py-3 flex-1 items-center rounded-lg mx-1
            ${isCancel ? "bg-neutral-200" : isDestructive ? "bg-red-500" : "bg-primary-500"}`}
          onPress={() => {
            hide();
            btn.onPress?.();
          }}
        >
          <Text className={`text-white font-medium`}>
            {btn.text}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        <View className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
          {alertOptions.title && (
            <Text className="text-lg font-bold text-primary-800 mb-2">{alertOptions.title}</Text>
          )}
          {alertOptions.message && (
            <Text className="text-base text-neutral-700 mb-4">{alertOptions.message}</Text>
          )}

          <View className="flex-row justify-end">{renderButtons()}</View>
        </View>
      </View>
    </Modal>
  );
}
