import { CustomButton } from "@/components";
import RideLayout from "@/components/RideLayout";
import { icons, images } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore, useUserStore } from "@/zustand";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ReactNativeModal from "react-native-modal";
import { Icon, MD3Colors, ProgressBar } from "react-native-paper";

const INIT_TIME = 60; // Init: 60 seconds

const BookRide = () => {
  const { userAddress, destinationAddress, price, duration } =
    useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();
  const { setIsRiding } = useUserStore();
  const [timeLeft, setTimeLeft] = useState(INIT_TIME); // Initialize timer state
  const [progress, setProgress] = useState(1); // Initialize progress bar state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("cash");
  const [items, setItems] = useState([
    { label: "Tiền mặt", value: "cash", icon: () => <Text>💰</Text> },
    { label: "VNPay", value: "vnpay", icon: () => <Text>💳</Text> },
    {
      label: "Ví Momo",
      value: "momo",
      icon: () => <Image source={icons.momo} className="w-5 h-5" />,
    },
  ]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          Alert.alert("Đã hết hạn", "Bạn mất quá lâu để thanh toán.");

          router.back();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress(timeLeft / INIT_TIME); // Update progress bar
  }, [timeLeft]);

  const driverDetails = drivers?.filter(
    (driver) => driver.id === selectedDriver,
  )[0];

  const handleBookRide = () => {};

  return (
    <RideLayout title="Xác nhận chuyến đi" snapPoints={["50%", "50%"]}>
      <>
        <ProgressBar
          style={{
            width: "100%",
            height: 6,
            borderRadius: 10,
            marginBottom: 20,
          }}
          progress={progress}
          color={MD3Colors.primary50}
        />
        <Text className="text-xl font-JakartaSemiBold mb-3">
          Thông tin chuyến đi
        </Text>

        <View className="flex flex-col w-full items-center justify-center mt-10">
          <Image
            source={{ uri: driverDetails?.profile_image_url }}
            className="w-28 h-28 rounded-full"
          />

          <View className="flex flex-row items-center justify-center mt-5 space-x-2">
            <Text className="text-lg font-JakartaSemiBold">
              {driverDetails?.title || driverDetails.full_name}
            </Text>

            <View className="flex flex-row items-center space-x-0.5">
              <Image
                source={icons.star}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-JakartaRegular">
                {driverDetails?.ratings}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Giá</Text>
            <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Thời gian đón</Text>
            <Text className="text-lg font-JakartaRegular">
              {formatTime(Math.round(duration / 60))}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full py-3">
            <Text className="text-lg font-JakartaRegular">Loại xe</Text>
            <View className="flex flex-row items-end gap-2">
              <Text className="text-lg font-JakartaRegular ">
                {driverDetails?.vehicle_type === "VPBIKE" ? (
                  <Icon source="motorbike" color="blue" size={24} />
                ) : (
                  <Icon source="car-hatchback" color="blue" size={24} />
                )}
              </Text>
              <Text className="text-lg font-JakartaRegular">
                {driverDetails?.vehicle_type === "VPBIKE"
                  ? "VPBike"
                  : `VPCar ${
                      driverDetails?.vehicle_type === "VPCAR4" ? "4" : "7"
                    } chỗ`}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center mt-5">
          <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
            <Image source={icons.to} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {userAddress}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
            <Image source={icons.point} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {destinationAddress}
            </Text>
          </View>
        </View>
        <View className="flex-row items-start justify-between mt-5">
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={{
              width: 150,
            }}
            placeholder="Chọn phương thức"
            showBadgeDot={true}
            showTickIcon={true}
            selectedItemContainerStyle={{
              backgroundColor: "#eee",
            }}
          />

          <CustomButton
            className="w-40"
            title="Book ngay"
            onPress={() => setSuccess(true)}
          />
        </View>
      </>
      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => {
          setSuccess(false);
        }}
        onBackButtonPress={() => {
          setSuccess(false);
        }}
        style={{
          flex: 1,
        }}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Đã đặt xe thành công
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Cảm ơn bạn đã tin dùng VPRide, chúc bạn có một chuyến đi tuyệt vời
          </Text>

          <CustomButton
            title="Xem thông tin chuyến đi"
            onPress={() => {
              setIsRiding(true);
              setSuccess(false);
              router.replace("/(root)/confirm-ride");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </RideLayout>
  );
};

export default BookRide;
