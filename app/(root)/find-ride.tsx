import { CustomButton } from "@/components";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useDriverStore } from "@/zustand";
import { useLocationStore } from "@/zustand/state/locationStore";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  Modal,
  Portal,
  SegmentedButtons,
  Snackbar,
} from "react-native-paper";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  const { drivers, setSelectedDriver } = useDriverStore();
  const [carType, setCarType] = React.useState("vpbike");

  const handleFindRide = () => {
    setVisible(true);
    // Randomly select a driver, if there is no drivers, then show an error message
    if (drivers.length === 0) {
      console.log("No drivers");
      return;
    }

    setTimeout(() => {
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
      setSelectedDriver(randomDriver.id);
      router.push("/(root)/book-ride");
      setVisible(false);
    }, 3000);
  };
  const [visible, setVisible] = React.useState(false);

  const hideModal = () => setVisible(false);

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} dismissable={false}>
          <Snackbar
            visible={visible}
            onDismiss={hideModal}
            style={{
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View className="flex-1 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Icon source="information" color="blue" size={20} />
                <Text className="ml-2"> Đang tìm tài xế cho bạn...</Text>
              </View>
              <ActivityIndicator size="small" />
            </View>
          </Snackbar>
        </Modal>
      </Portal>
      <RideLayout title="Ride" snapPoints={["45%", "80%"]}>
        <View className="mt-3">
          <Button onPress={() => setVisible(true)} mode="contained">
            {visible ? "Hide" : "Show"}
          </Button>
          <SegmentedButtons
            density="small"
            style={{ marginBottom: 10 }}
            value={carType}
            onValueChange={setCarType}
            buttons={[
              {
                icon: "motorbike",
                value: "vpbike",
                label: "VPBike",
              },
              {
                icon: "car-hatchback",
                value: "vpcar4",
                label: "VPCar 4",
              },
              { icon: "car-estate", value: "vpcar7", label: "VPCar 7" },
            ]}
          />
          <Text className="text-lg font-JakartaSemiBold mb-3">
            Điểm xuất phát
          </Text>
          <GoogleTextInput
            icon={icons.target}
            initLocation={userAddress}
            containerStyle="bg-neutral-100"
            textInputBgColor="#f5f5f5"
            handlePress={(location) => setUserLocation(location)}
            hasSelectLocationButton={true}
          />
        </View>
        <View className="mb-3">
          <Text className="text-lg font-JakartaSemiBold mb-3">Điểm đến</Text>
          <GoogleTextInput
            icon={icons.map}
            initLocation={destinationAddress}
            containerStyle="bg-neutral-100"
            textInputBgColor="#f5f5f5"
            handlePress={(location) => setDestinationLocation(location)}
          />
        </View>
        <View className="flex-1 flex-row justify-between gap-8">
          <Text className="flex-1 text-3xl text-center font-JakartaSemiBold text-green-500 border-b-2 border-b-gray-400">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(100000)}
          </Text>
          <CustomButton
            className="w-40"
            title="Find now"
            onPress={handleFindRide}
          />
        </View>
      </RideLayout>
    </>
  );
};

export default FindRide;
