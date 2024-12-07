import { icons } from "@/constants";
import { IGoogleInputProps } from "@/types/type";
import { useLocationStore } from "@/zustand/state/locationStore";
import axios from "axios";
import { Image } from "expo-image";
import * as Location from "expo-location";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const GOONG_API_KEY = process.env.EXPO_PUBLIC_GOONG_KEY;

const GoogleTextInput = ({
  icon,
  initLocation,
  containerStyle,
  textInputBgColor,
  handlePress,
  hasSelectLocationButton,
}: IGoogleInputProps) => {
  const { setUserLocation } = useLocationStore();
  const handleGetCurrentLocation = async () => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          return;
        }

        let location = await Location.getCurrentPositionAsync({});

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

        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: `${data.results[0].formatted_address}`,
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    requestLocationPermission();
  };

  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5 shadow-md border border-gray-300 font-JakartaMedium`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        enablePoweredByContainer={false}
        placeholder="Search"
        debounce={200}
        isRowScrollable={true}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBgColor || "white",
            fontSize: 16,
            fontWeight: "600",
            width: "100%",
            borderRadius: 200,
            fontFamily: "Jakarta-Bold",
          },
          listView: {
            backgroundColor: textInputBgColor || "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
            fontFamily: "Jakarta-Medium",
          },
          description: {
            fontFamily: "Jakarta-SemiBold",
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: "vi",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon || icons.search}
              className="w-4 h-4"
              contentFit="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initLocation ?? "Hôm nay bạn muốn đi đâu?",
        }}
        renderRightButton={() =>
          hasSelectLocationButton ? (
            <TouchableOpacity
              onPress={handleGetCurrentLocation}
              className="justify-center items-center w-6 h-6"
            >
              <Image
                source={icons.point}
                className="w-6 h-6"
                contentFit="contain"
              />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
      />
    </View>
  );
};

export default GoogleTextInput;
