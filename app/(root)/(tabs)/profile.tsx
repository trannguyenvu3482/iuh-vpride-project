import React from "react";
import { Text, Image, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IInputField } from "@/types/type";
import { InputField } from "@/components";
const Profile = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',

        }}>Thông tin cá nhân của bạn</Text>
      </View>
      <View style={{
        width: 200,
        height: 200,
        backgroundColor: 'red',
        marginLeft: 105,
      }}>
      </View>
      <View style={{
        width: '90%',
        marginLeft: 20,
      }}>
        <InputField label="Họ" />
      </View>

    </SafeAreaView>
  );
};

export default Profile;
