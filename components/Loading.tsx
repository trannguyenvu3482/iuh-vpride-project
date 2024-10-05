import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";

const Loading = () => {
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-5">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};

export default Loading;
