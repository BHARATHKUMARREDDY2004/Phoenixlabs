import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/types/type";

const Button = ({
  onPress,
  title,
  textStyle,
  IconLeft,
  IconRight,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        rounded-full py-3 px-4 
        flex flex-row justify-center items-center 
        bg-primary-500 
        shadow-md shadow-primary-800/30
        ${className}
      `}
      {...props}
    >
      {IconLeft && <IconLeft className="mr-2 text-neutral-50" />}
      <Text className={`text-lg font-semibold text-neutral-50 ${textStyle}`}>
        {title}
      </Text>
      {IconRight && <IconRight className="ml-2 text-neutral-50" />}
    </TouchableOpacity>
  );
};

export default Button;
