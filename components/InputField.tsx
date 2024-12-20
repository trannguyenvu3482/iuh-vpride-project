import { IInputField } from "@/types/type";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const InputField = ({
  label,
  labelStyle,
  className,
  containerStyle,
  icon,
  iconStyle,
  inputStyle,
  secureTextEntry = false,
  onAction,
  ActionIcon,
  ...props
}: IInputField) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          {label && (
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
              {label}
            </Text>
          )}
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
            {ActionIcon && (
              <TouchableOpacity className="pr-4">{ActionIcon}</TouchableOpacity>
            )}
          </View>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default InputField;
