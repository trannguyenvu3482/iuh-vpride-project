import { icons } from "@/constants";
import { IGoogleInputProps } from "@/types/type";
import { useLocationStore } from "@/zustand/state/locationStore";
import { Image } from "expo-image";
import * as Location from "expo-location";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

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

        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: `${address[0].formattedAddress}`,
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    requestLocationPermission();
  };

  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        debounce={200}
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
          },
          listView: {
            backgroundColor: textInputBgColor || "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
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
