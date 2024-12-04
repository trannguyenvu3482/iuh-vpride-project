import { CustomButton } from "@/components";
import GoogleTextInput from "@/components/GoogleTextInput";
import Loading from "@/components/Loading";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { homeSwiper, icons, images } from "@/constants";
import { supabase } from "@/lib/supabase";
import { useLocationStore } from "@/zustand/state/locationStore";
import { useUserStore } from "@/zustand/state/userStore";
import axios from "axios";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const recentRides = [
  {
    ride_id: "1",
    start_address: "Công Viên Hoàng Văn Thụ",
    destination_address: "Sân vận động Thống Nhất",
    start_latitude: "10.7727094",
    start_longitude: "106.6607663",
    destination_latitude: "10.7601807",
    destination_longitude: "106.6603973",
    ride_time: 21,
    price: "19500.00",
    payment_status: "paid",
    driver_id: 2,
    user_id: "1",
    created_at: "2024-08-12 05:19:20.620007",
    driver: {
      driver_id: "2",
      full_name: "David Nộp",
      profile_image_url:
        "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      car_seats: 2,
      rating: "4.60",
    },
  },
];

const GOONG_API_KEY = process.env.EXPO_PUBLIC_GOONG_KEY;

const Home = () => {
  const loading = true;
  const { user, setUser, setUserData, isRiding } = useUserStore();
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [hasPermission, setHasPermission] = useState(false);

  const handleSignOut = () => {
    supabase.auth.signOut();
    setUser(null);
    router.push("/(auth)/otp-enter");
  };
  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setHasPermission(false);
          console.log("No permission");

          return;
        }

        const location = await Location.getCurrentPositionAsync({});

        // const address = await Location.reverseGeocodeAsync({
        //   latitude: location.coords.latitude,
        //   longitude: location.coords.longitude,
        // });

        const { data } = await axios.get("https://rsapi.goong.io/Geocode", {
          params: {
            api_key: GOONG_API_KEY,
            latlng: `${location.coords.latitude},${location.coords.longitude}`,
          },
        });

        console.log(">>> address", data.results[0].address);
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: `${data.results[0].address}`,
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    requestLocationPermission();
  }, [setUserLocation]);

  useEffect(() => {
    const fetchData = async () => {
      let { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id);

      if (users && users.length > 0) {
        setUserData(users[0]);
      }
    };

    fetchData();
  }, [setUserData, user]);

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image source={images.noResults} />
                <Text className="text-md font-JakartaMedium text-gray-500">
                  No recent rides
                </Text>
              </>
            ) : (
              <Loading />
            )}
          </View>
        }
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-xl font-JakartaExtraBold">
                Chào buổi sáng, {user?.phone}
              </Text>
              <TouchableOpacity
                className="justify-center items-center w-10 h-10 rounded-full bg-white shadow-sm shadow-neutral-300"
                onPress={handleSignOut}
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            {isRiding ? (
              <CustomButton
                title="Xem chuyến đi hiện tại"
                onPress={() => {
                  router.navigate("/(root)/confirm-ride");
                }}
                className="w-full mb-6"
                bgVariant="primary"
              />
            ) : (
              <GoogleTextInput
                icon={icons.search}
                containerStyle="bg-white shadow-md shadow-neutral-300"
                handlePress={handleDestinationPress}
              />
            )}

            <Swiper
              className="w-full h-[200px] object-contain"
              ref={swiperRef}
              dot={
                <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"></View>
              }
              activeDot={
                <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full"></View>
              }
              onIndexChanged={(index) => setActiveIndex(index)}
              loop={false}
            >
              {homeSwiper.map((item) => (
                <View
                  key={item.id}
                  className="flex items-center justify-center"
                >
                  <Image
                    source={item.image}
                    className="w-full h-[200px]"
                    contentFit="contain"
                  />
                </View>
              ))}
            </Swiper>
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Vị trí hiện tại của bạn
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Chuyến đi gần đây
            </Text>
          </>
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default Home;
