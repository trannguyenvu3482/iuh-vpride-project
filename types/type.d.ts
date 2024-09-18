import { TextInputProps } from "react-native";

declare interface ICustomButton {
  onPress: () => void;
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "success" | "outline";
  textVariant?: "primary" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  [key: string]: any;
}

declare interface IInputField extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}
