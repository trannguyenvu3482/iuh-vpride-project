import { icons } from "@/constants";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { getRandomItems } from "@/lib/utils";
import { IMarkerData } from "@/types/type";
import { useDriverStore } from "@/zustand/state/driverStore";
import { useLocationStore } from "@/zustand/state/locationStore";
import React, { useEffect, useRef, useState } from "react";
import "react-native-get-random-values";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const { setDrivers, drivers, fetchDrivers } = useDriverStore();
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const [markers, setMarkers] = useState<IMarkerData[]>([]);
  const mapRef = useRef<MapView>(null);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    fetchDrivers();

    if (drivers.length > 0) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: getRandomItems(drivers, 5),
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [fetchDrivers, userLatitude, userLongitude]);

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="standard"
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
      ref={mapRef}
      showsMyLocationButton={true}
    >
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            image={icons.marker}
          />
        );
      })}

      {destinationLatitude && destinationLongitude ? (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
          <MapViewDirections
            origin={{
              latitude: userLatitude,
              longitude: userLongitude,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
            strokeColor="#0286ff"
            strokeWidth={3}
            mode="DRIVING"
            optimizeWaypoints={true}
            timePrecision="now"
            onReady={(e) => {
              console.log(">>> ONREADY", e.fares, e.distance, e.duration);
            }}
          />
        </>
      ) : null}
    </MapView>
  );
};

export default Map;
