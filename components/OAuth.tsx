import React from "react";
import { View } from "react-native";

const OAuth = () => {
  // GoogleSignin.configure({
  //   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  //   webClientId:
  //     "366638647154-l05itblrfoe6snglem0gb6p5hredp5j2.apps.googleusercontent.com",
  // });

  return (
    <View>
      {/* <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Hoặc</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View> */}
      {/* <CustomButton
        bgVariant="outline"
        textVariant="primary"
        title="Tiếp tục với Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.googleLogo}
            contentFit="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        onPress={signInWithFacebook}
      /> */}

      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo?.data?.idToken) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: userInfo.data.idToken,
              });
              console.log(error, data);
            } else {
              throw new Error("no ID token present!");
            }
          } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        }}
      /> */}
    </View>
  );
};
export default OAuth;
