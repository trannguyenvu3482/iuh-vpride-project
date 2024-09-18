import React from "react";
import { Pressable, Text } from "react-native";

const getBgVariantStyle = (
  variant: "primary" | "secondary" | "danger" | "success" | "outline",
) => {
  switch (variant) {
    case "primary":
      return "bg-primary-500";
    case "secondary":
      return "bg-secondary-500";
    case "danger":
      return "bg-danger-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (
  variant: "primary" | "secondary" | "danger" | "success",
) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "bg-gray-100";
    case "danger":
      return "bg-red-100";
    case "success":
      return "bg-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant,
  IconLeft,
  IconRight,
  className,
  ...props
}: ICustomButton) => {
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
      className={`w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
      onPress={onPress}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </Pressable>
  );
};

export default CustomButton;
