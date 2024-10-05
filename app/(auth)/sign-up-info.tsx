import { CustomButton, InputField, OAuth } from "@/components";
import { icons, images } from "@/constants";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/zustand/state/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import Toast from "react-native-toast-message";
import { z } from "zod";
const signupFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name is too short")
    .regex(
      /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,
      "Họ và tên không hợp lệ",
    ),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Password is too short"),
});

type SignUpForm = z.infer<typeof signupFormSchema>;

const SignUpInfo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signupFormSchema),
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitData, setSubmitData] = useState<SignUpForm | null>(null);
  const session = useUserStore((state) => state.session);

  // TODO: Update user info
  const updateInfo = async ({ name, email, password }: SignUpForm) => {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session.user.id,
        full_name: name,
        email,
        password,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("users").upsert(updates);
    } catch (error) {
      console.error("Error updating user info:", error.message);
    }
  };

  const onSignUp = handleSubmit(
    (data) => {
      setSubmitData(data);
      setShowSuccessModal(true);
    },
    (error: FieldErrors<SignUpForm>) => {
      Object.keys(error).forEach((key) => {
        Toast.show({
          type: "error",
          text1: (error[key as keyof SignUpForm] as { message?: string })
            ?.message,
          position: "bottom",
        });
      });
    },
  );
  return (
    <ScrollView className="flex-1 bg-white h-full">
      <View className="flex-1 bg-white">
        <View className="relative w-full max-h-[25vh]">
          <Image
            source={images.logoWithBG}
            className="z-0 w-full h-full"
            contentFit="cover"
            contentPosition="bottom"
          />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Hoàn tất tài khoản của bạn
          </Text>
        </View>
        <View className="p-5">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Họ và tên"
                placeholder="Nhập họ và tên của bạn"
                icon={icons.person}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="name"
            rules={{ required: "Name is required" }}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Email"
                placeholder="Nhập email của bạn"
                icon={icons.email}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="email"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Mật khẩu"
                placeholder="Nhập mật khẩu của bạn"
                secureTextEntry
                icon={icons.lock}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="password"
            rules={{ required: "Password is required" }}
            defaultValue=""
          />
          <CustomButton title="Hoàn tất" onPress={onSignUp} className="mt-6" />
          <OAuth />
        </View>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Chúc mừng!
            </Text>
            <Text className="text-base text-gray-400 font-JakartaMedium text-center mt-2">
              Bạn đã hoàn tất việc tạo tài khoản, hãy bắt đầu thôi
            </Text>
            <CustomButton
              title="Bắt đầu thôi"
              onPress={() => router.push(`/(root)/(tabs)/home`)}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default SignUpInfo;
