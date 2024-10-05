import { IGoogleInputProps } from "@/types/type";
import React from "react";
import { Text, View } from "react-native";

const GoogleTextInput = ({
  icon,
  initLocation,
  containerStyle,
  textInputBgColor,
  handlePress,
}: IGoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <Text>Search</Text>
    </View>
  );
};

export default GoogleTextInput;
