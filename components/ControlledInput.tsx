import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { ControlledInputProps } from '@/types/type';

const ControlledInput: React.FC<ControlledInputProps> = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View className="mb-4">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="flex-row items-center rounded-xl bg-neutral-100 px-4">
            <TextInput
              className="flex-1 py-3 text-lg text-black"
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry && !showPassword}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
            />
            {secureTextEntry && (
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Eye className="text-neutral-600" />
                ) : (
                  <EyeOff className="text-neutral-600" />
                )}
              </Pressable>
            )}
          </View>
        )}
      />
      {error && <Text className="mt-1 pl-1 text-sm text-red-500">{error}</Text>}
    </View>
  );
};

export default ControlledInput;
