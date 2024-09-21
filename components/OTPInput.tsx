import * as Clipboard from "expo-clipboard";
import React, { useRef } from "react";
import { Alert, StyleSheet } from "react-native";
import OTPTextView from "react-native-otp-textinput";

const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  error: {
    borderColor: "red",
  },
});

const OTPInput = ({
  otpInput,
  setOtpInput,
}: {
  otpInput: string;
  setOtpInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const input = useRef<OTPTextView>(null);

  const clear = () => input.current?.clear();

  const updateOtpText = () => input.current?.setValue(otpInput);

  const showTextAlert = () => otpInput && Alert.alert(otpInput);

  const handleCellTextChange = async (text: string, i: number) => {
    console.log("CELL TEXT CHANGED", text, i);

    if (i === 0) {
      const clippedText = await Clipboard.getStringAsync();
      if (clippedText.slice(0, 1) === text) {
        console.log("CLIPPED TEXT", clippedText);
        input.current?.setValue(clippedText, true);
      }
    }
  };

  return (
    <OTPTextView
      ref={input}
      containerStyle={styles.textInputContainer}
      textInputStyle={styles.roundedTextInput}
      inputCount={6}
      inputCellLength={1}
      autoFocus={true}
      tintColor={"#0286FF"}
      handleCellTextChange={handleCellTextChange}
      handleTextChange={(text) => {
        console.log("OTP INPUT", text);

        setOtpInput(text);
      }}
    />
  );
};

export default OTPInput;
