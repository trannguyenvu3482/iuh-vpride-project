import Loading from "@/components/Loading";
import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";
import { useUserStore } from "@/zustand";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
  const [recentRides, setRecentRides] = useState<
    Database["public"]["Tables"]["rides"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);
  const [isSortingByNewest, setIsSortingByNewest] = useState(true);
  const { userData } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let { data: rides, error } = await supabase
          .from("rides")
          .select(
            `
            *,
            drivers (
              full_name
            )`,
          )
          .eq("user_id", userData?.id);

        if (rides && rides.length > 0) {
          setRecentRides(rides);

          console.log(">>> RIDES", rides);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [userData?.id]);

  const handleSortByNewest = () => {
    setIsSortingByNewest(!isSortingByNewest);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={recentRides.sort((a, b) => {
          if (isSortingByNewest) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          } else {
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          }
        })}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResults}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">Không có chuyến đi nào</Text>
              </>
            ) : (
              <Loading />
            )}
          </View>
        )}
        ListHeaderComponent={
          <View className="flex flex-row items-center justify-between my-5">
            <Text className="text-2xl font-JakartaBold my-5">
              Chuyến đi gần đây
            </Text>
            <TouchableOpacity
              onPress={handleSortByNewest}
              className="flex-row items-center justify-center"
            >
              <Text className="text-xl text-blue-600 font-JakartaMedium">
                {isSortingByNewest ? "Mới nhất" : "Cũ nhất"}
              </Text>
              <Icon
                source={`${isSortingByNewest ? "chevron-down" : "chevron-up"}`}
                color="#2563eb"
                size={28}
              />
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default History;
