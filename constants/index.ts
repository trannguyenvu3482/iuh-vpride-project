import imageOnboarding1 from "../assets/images/onboarding1.png";
import imageOnboarding2 from "../assets/images/onboarding2.png";
import imageOnboarding3 from "../assets/images/onboarding3.png";
import vietnamFlag from "../assets/images/vietnam-flag.png";
import logoWithBG from "../assets/images/vpride-logo-with-bg.png";
export const images = {
  logoWithBG,
};

export const icons = {
  vietnamFlag,
};

const onboarding = [
  {
    id: 1,
    title: "Tìm những loại xe tốt nhất với VPRide",
    description: "Khám phá sự tiện nghi khi sử dụng ứng dụng của chúng tôi",
    image: imageOnboarding1,
  },

  {
    id: 2,
    title: "Chuyến đi hoàn hảo chỉ với một cú chạm",
    description:
      "Không cần phải tốn thời gian chờ đợi lâu nữa, tiết kiệm thời gian ngay bây giờ với VPRide",
    image: imageOnboarding2,
  },

  {
    id: 3,
    title: "Đi tới đâu, về tới đó một cách an toàn nhất",
    description:
      "Nhập địa điểm cần đến, và để chúng tôi lo phần còn lại cho bạn",
    image: imageOnboarding3,
  },
];

export { onboarding };
