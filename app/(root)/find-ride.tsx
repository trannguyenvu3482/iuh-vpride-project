import { CustomButton } from "@/components";
import GoogleTextInput from "@/components/GoogleTextInput";
import Loading from "@/components/Loading";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { calculateTotalPrice, formatTime, getRandomDriver } from "@/lib/utils";
import { Database } from "@/types/database";
import { useDriverStore } from "@/zustand";
import { useLocationStore } from "@/zustand/state/locationStore";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  ActivityIndicator,
  Icon,
  Modal,
  Portal,
  SegmentedButtons,
  Snackbar,
} from "react-native-paper";

const GOONG_API_KEY = process.env.EXPO_PUBLIC_GOONG_KEY;

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
    setDistance,
    setDuration,
    setPrice,
    duration,
    distance,
    price,
  } = useLocationStore();
  const { drivers, setSelectedDriver } = useDriverStore();
  const [carType, setCarType] =
    useState<Database["public"]["Enums"]["VehicleType"]>("VPBIKE");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios("https://rsapi.goong.io/DistanceMatrix", {
          method: "GET",
          params: {
            origins: `${userLatitude},${userLongitude}`,
            destinations: `${destinationLatitude},${destinationLongitude}`,
            vehicle: carType === "VPBIKE" ? "bike" : "car",
            api_key: GOONG_API_KEY,
          },
        });

        const info = response.data.rows[0].elements[0];

        const price = calculateTotalPrice(info.distance.value, carType);

        console.log("DURATION", info.duration);

        // setRideInfo(response.data.rows[0].elements);
        setDuration(info.duration.value);
        setDistance(info.distance.value);
        setPrice(price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [
    carType,
    destinationLatitude,
    destinationLongitude,
    setDistance,
    setDuration,
    setPrice,
    userLatitude,
    userLongitude,
  ]);

  const handleFindRide = () => {
    setVisible(true);
    // Randomly select a driver, if there is no drivers, then show an error message
    if (drivers.length === 0) {
      console.log("No drivers");
      return;
    }

    setTimeout(() => {
      const randomDriver = getRandomDriver(drivers, carType);
      setSelectedDriver(randomDriver.id);
      router.push("/(root)/book-ride");
      setVisible(false);
    }, 3000);
  };
  const [visible, setVisible] = React.useState(false);

  const hideModal = () => setVisible(false);

  return loading ? (
    <Loading />
  ) : (
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
      <RideLayout title="Tìm xe" snapPoints={["100%", "37%", "50%"]}>
        <View className="mt-3">
          <SegmentedButtons
            density="small"
            style={{ marginBottom: 10 }}
            value={carType}
            onValueChange={(value) =>
              setCarType(value as Database["public"]["Enums"]["VehicleType"])
            }
            buttons={[
              {
                icon: "motorbike",
                value: "VPBIKE",
                label: "VPBike",
              },
              {
                icon: "car-hatchback",
                value: "VPCAR4",
                label: "VPCar 4",
              },
              { icon: "car-estate", value: "VPCAR7", label: "VPCar 7" },
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
          <Text className="text-lg font-JakartaSemiBold mb-3">
            Điểm đến - {Math.round((distance / 1000) * 10) / 10} km -{" "}
            {formatTime(Math.round(duration / 60))}
          </Text>
          <GoogleTextInput
            icon={icons.map}
            initLocation={destinationAddress}
            containerStyle="bg-neutral-100"
            textInputBgColor="#f5f5f5"
            handlePress={(location) => setDestinationLocation(location)}
          />
        </View>
        <View className="flex-row justify-between gap-8">
          <Text className="flex-1 text-[26px] text-center font-JakartaSemiBold text-green-500 border-b-2 border-b-gray-400">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)}
          </Text>
          <CustomButton
            className="w-40 h-14"
            title="Find now"
            onPress={handleFindRide}
          />
        </View>
      </RideLayout>
    </>
  );
};

export default FindRide;
