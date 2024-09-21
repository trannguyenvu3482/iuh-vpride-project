import React from "react";
import { View } from "react-native";
import PhoneInput from "react-native-phone-number-input";

const PhoneInputField = ({
  phoneInputRef,
  value,
  formattedValue,
  onSetValue,
  onFormattedValueChange,
}: {
  phoneInputRef: React.RefObject<PhoneInput>;
  value: string;
  formattedValue: string;
  onSetValue: (value: string) => void;
  onFormattedValueChange: (value: string) => void;
}) => {
  return (
    <View>
      <PhoneInput
        ref={phoneInputRef}
        defaultValue={value}
        defaultCode="VN"
        layout="first"
        onChangeText={(text) => {
          onSetValue(text);
        }}
        onChangeFormattedText={(text) => {
          onFormattedValueChange(text);
        }}
        autoFocus
        containerStyle={{
          width: "100%",
          borderWidth: 2,
          borderColor: "#f5f5f5",
          borderRadius: 50,
          backgroundColor: "#f5f5f5",
        }}
        countryPickerButtonStyle={{
          backgroundColor: "#f5f5f5",
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
        }}
        textContainerStyle={{
          backgroundColor: "#f5f5f5",
          borderRadius: 50,
          height: "100%",
          paddingLeft: 0,
        }}
        textInputStyle={{
          fontWeight: "bold",
        }}
        placeholder="Nhập số điện thoại"
        filterProps={{
          autoFocus: true,
          placeholder: "Nhập tên quốc gia",
        }}
      />
      {/* <TouchableOpacity
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
            }}
          >
            <Text>Check</Text>
          </TouchableOpacity> */}
    </View>
  );
};

export default PhoneInputField;
