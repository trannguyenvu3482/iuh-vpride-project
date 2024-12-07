import { icons } from "@/constants";
import { Image } from "expo-image";
import { Tabs, useSegments } from "expo-router";
import React from "react";
import { ImageSourcePropType, View } from "react-native";

const TabBarIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View
      className={`flex-row justify-center items-center rounded-full ${focused ? "bg-general-400" : ""}`}
    >
      <View
        className={`flex rounded-full w-10 h-10 items-center justify-center ${focused ? "bg-general-400" : ""}`}
      >
        <Image
          source={source}
          className="w-7 h-7 flex items-center justify-center"
          tintColor="white"
          contentFit="contain"
        />
      </View>
    </View>
  );
};

const Layout = () => {
  const segments = useSegments();

  console.log(segments);

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0, // ios only
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: `${(segments[3] && segments[3] === "[id]") || segments[3] === "gemini" ? "none" : "flex"}`,
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
