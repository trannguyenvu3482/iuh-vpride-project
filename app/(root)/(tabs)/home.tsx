import GoogleTextInput from "@/components/GoogleTextInput";
import Loading from "@/components/Loading";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { homeSwiper, icons, images } from "@/constants";
import { useLocationStore } from "@/zustand/state/locationStore";
import { useUserStore } from "@/zustand/state/userStore";
import { Image } from "expo-image";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const recentRides = [
  {
    ride_id: "1",
    start_address: "Kathmandu, Nepal",
    destination_address: "Pokhara, Nepal",
    start_latitude: "27.717245",
    start_longitude: "85.323961",
    destination_latitude: "28.209583",
    destination_longitude: "83.985567",
    ride_time: 391,
    price: "19500.00",
    payment_status: "paid",
    driver_id: 2,
    user_id: "1",
    created_at: "2024-08-12 05:19:20.620007",
    driver: {
      driver_id: "2",
      full_name: "David Brown",
      profile_image_url:
        "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      car_seats: 2,
      rating: "4.60",
    },
  },
  {
    ride_id: "2",
    start_address: "Jalkot, MH",
    destination_address: "Pune, Maharashtra, India",
    start_latitude: "18.609116",
    start_longitude: "77.165873",
    destination_latitude: "18.520430",
    destination_longitude: "73.856744",
    ride_time: 491,
    price: "24500.00",
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 06:12:17.683046",
    driver: {
      driver_id: "1",
      full_name: "James Wilson",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    ride_id: "3",
    start_address: "Zagreb, Croatia",
    destination_address: "Rijeka, Croatia",
    start_latitude: "45.815011",
    start_longitude: "15.981919",
    destination_latitude: "45.327063",
    destination_longitude: "14.442176",
    ride_time: 124,
    price: "6200.00",
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 08:49:01.809053",
    driver: {
      driver_id: "1",
      full_name: "James Wilson",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    ride_id: "4",
    start_address: "Okayama, Japan",
    destination_address: "Osaka, Japan",
    start_latitude: "34.655531",
    start_longitude: "133.919795",
    destination_latitude: "34.693725",
    destination_longitude: "135.502254",
    ride_time: 159,
    price: "7900.00",
    payment_status: "paid",
    driver_id: 3,
    user_id: "1",
    created_at: "2024-08-12 18:43:54.297838",
    driver: {
      driver_id: "3",
      full_name: "Michael Johnson",
      profile_image_url:
        "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      car_image_url:
        "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      car_seats: 4,
      rating: "4.70",
    },
  },
];

const Home = () => {
  const loading = true;
  const { user } = useUserStore();
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  console.log(user);

  const [hasPermission, setHasPermission] = useState(false);

  const handleSignOut = () => {};
  const handleDestinationPress = () => {};

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setHasPermission(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});

        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setUserLocation({
          latitute: location.coords.latitude,
          longitude: location.coords.longitude,
          address: `${address[0].name}, ${address[0].region}`,
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    requestLocationPermission();
  }, []);

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

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Swiper
                className="w-full h-[200px] object-contain"
                ref={swiperRef}
                loop={false}
                dot={
                  <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"></View>
                }
                activeDot={
                  <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full"></View>
                }
                onIndexChanged={(index) => setActiveIndex(index)}
                autoplay={true}
                autoplayTimeout={3000}
                autoplayDirection={true}
              >
                {homeSwiper.map((item) => (
                  <View
                    key={item.id}
                    className="flex items-center justify-center"
                  >
                    <Image
                      source={item.image}
                      className="w-full h-[200px] object-contain"
                      contentFit="contain"
                    />
                  </View>
                ))}
              </Swiper>
            </>

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
