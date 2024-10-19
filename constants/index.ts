import backArrow from "../assets/icons/back-arrow.png";
import chat from "../assets/icons/chat.png";
import email from "../assets/icons/email.png";
import home from "../assets/icons/home.png";
import list from "../assets/icons/list.png";
import lock from "../assets/icons/lock.png";
import map from "../assets/icons/map.png";
import marker from "../assets/icons/marker.png";
import momo from "../assets/icons/momo.png";
import out from "../assets/icons/out.png";
import person from "../assets/icons/person.png";
import pin from "../assets/icons/pin.png";
import point from "../assets/icons/point.png";
import profile from "../assets/icons/profile.png";
import search from "../assets/icons/search.png";
import star from "../assets/icons/star.png";
import target from "../assets/icons/target.png";
import to from "../assets/icons/to.png";
import banner1 from "../assets/images/banners/banner1.jpg";
import banner2 from "../assets/images/banners/banner2.jpg";
import banner3 from "../assets/images/banners/banner3.jpg";
import check from "../assets/images/check.png";
import googleLogo from "../assets/images/google.png";
import noResults from "../assets/images/no-result.png";
import imageOnboarding1 from "../assets/images/onboarding1.png";
import imageOnboarding2 from "../assets/images/onboarding2.png";
import imageOnboarding3 from "../assets/images/onboarding3.png";
import vietnamFlag from "../assets/images/vietnam-flag.png";
import logoWithBG from "../assets/images/vpride-logo-with-bg.png";

export const images = {
  logoWithBG,
  check,
  noResults,
  banner1,
  banner2,
  banner3,
};

export const icons = {
  vietnamFlag,
  googleLogo,
  lock,
  person,
  email,
  home,
  chat,
  profile,
  list,
  to,
  point,
  out,
  search,
  marker,
  backArrow,
  target,
  map,
  star,
  momo,
  pin,
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
    description: "Không phải chờ đợi lâu nữa, tiết kiệm thời gian với VPRide",
    image: imageOnboarding2,
  },

  {
    id: 3,
    title: "Đi tới đâu, về tới đó một cách an toàn nhất",
    description: "Nhập địa điểm cần đến, và để chúng tôi lo phần còn lại",
    image: imageOnboarding3,
  },
];

const homeSwiper = [
  {
    id: 1,
    image: banner1,
  },
  {
    id: 2,
    image: banner2,
  },
  {
    id: 3,
    image: banner3,
  },
];

export { homeSwiper, onboarding };
