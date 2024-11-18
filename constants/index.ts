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

const dummyChatContacts = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Nguyễn Văn An",
    date: "2024-11-18T08:30:00Z",
    img: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Xin chào, bạn có thể giúp mình không?",
    seen: false,
  },
  {
    id: "b2c3d4e5-f678-90ab-cdef-234567890abc",
    name: "Trần Thị Bình",
    date: "2024-11-17T20:15:00Z",
    img: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Cảm ơn bạn rất nhiều!",
    seen: true,
  },
  {
    id: "c3d4e5f6-7890-abcd-ef12-34567890abcd",
    name: "Lê Văn Chính",
    date: "2024-11-17T15:45:00Z",
    img: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Hẹn gặp bạn vào ngày mai nhé.",
    seen: false,
  },
  {
    id: "d4e5f678-90ab-cdef-1234-4567890abcde",
    name: "Phạm Thị Diễm",
    date: "2024-11-16T10:10:00Z",
    img: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Mình đã nhận được tài liệu rồi.",
    seen: true,
  },
  {
    id: "e5f67890-abcd-ef12-3456-567890abcdef",
    name: "Hoàng Văn Dũng",
    date: "2024-11-16T09:05:00Z",
    img: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Khi nào bạn có thời gian rảnh?",
    seen: false,
  },
  {
    id: "f67890ab-cdef-1234-5678-67890abcdef1",
    name: "Đỗ Thị Em",
    date: "2024-11-15T14:20:00Z",
    img: "https://i.pravatar.cc/150?img=6",
    lastMessage: "Bạn đã xem video mới chưa?",
    seen: true,
  },
  {
    id: "67890abc-def1-2345-6789-7890abcdef12",
    name: "Vũ Văn Fai",
    date: "2024-11-15T11:30:00Z",
    img: "https://i.pravatar.cc/150?img=7",
    lastMessage: "Chúng ta nên lên kế hoạch sớm.",
    seen: false,
  },
  {
    id: "7890abcd-ef12-3456-7890-890abcdef123",
    name: "Ngô Thị Giang",
    date: "2024-11-14T16:50:00Z",
    img: "https://i.pravatar.cc/150?img=8",
    lastMessage: "Mình sẽ gửi email cho bạn sau.",
    seen: true,
  },
  {
    id: "890abcde-f123-4567-890a-90abcdef1234",
    name: "Trịnh Văn Hậu",
    date: "2024-11-14T09:40:00Z",
    img: "https://i.pravatar.cc/150?img=9",
    lastMessage: "Bạn đã hoàn thành báo cáo chưa?",
    seen: false,
  },
  {
    id: "90abcdef-1234-5678-90ab-cdef12345678",
    name: "Bùi Thị Hương",
    date: "2024-11-13T13:25:00Z",
    img: "https://i.pravatar.cc/150?img=10",
    lastMessage: "Chúng ta sẽ gặp nhau ở đâu?",
    seen: true,
  },
  {
    id: "abcdef12-3456-7890-abcd-ef1234567890",
    name: "Phan Văn Khoa",
    date: "2024-11-13T10:15:00Z",
    img: "https://i.pravatar.cc/150?img=11",
    lastMessage: "Tôi đã đặt lịch hẹn rồi.",
    seen: false,
  },
  {
    id: "bcdef123-4567-890a-bcde-f1234567890a",
    name: "Đặng Thị Lan",
    date: "2024-11-12T17:35:00Z",
    img: "https://i.pravatar.cc/150?img=12",
    lastMessage: "Bạn có thể gọi lại sau không?",
    seen: true,
  },
  {
    id: "cdef1234-5678-90ab-cdef-234567890abc",
    name: "Vũ Văn Minh",
    date: "2024-11-12T12:45:00Z",
    img: "https://i.pravatar.cc/150?img=13",
    lastMessage: "Mình sẽ kiểm tra và phản hồi.",
    seen: false,
  },
  {
    id: "def12345-6789-0abc-def1-34567890abcd",
    name: "Lê Thị Nga",
    date: "2024-11-11T08:55:00Z",
    img: "https://i.pravatar.cc/150?img=14",
    lastMessage: "Bạn đã đi đâu vậy?",
    seen: true,
  },
  {
    id: "ef123456-7890-abcd-ef12-4567890abcde",
    name: "Trương Văn Phúc",
    date: "2024-11-11T07:20:00Z",
    img: "https://i.pravatar.cc/150?img=15",
    lastMessage: "Chúng ta cần thêm tài liệu.",
    seen: false,
  },
  {
    id: "f1234567-890a-bcde-f123-567890abcdef",
    name: "Hoàng Thị Quỳnh",
    date: "2024-11-10T19:10:00Z",
    img: "https://i.pravatar.cc/150?img=16",
    lastMessage: "Bạn có kế hoạch gì cuối tuần?",
    seen: true,
  },
  {
    id: "12345678-90ab-cdef-1234-67890abcdef1",
    name: "Phạm Văn Sơn",
    date: "2024-11-10T14:30:00Z",
    img: "https://i.pravatar.cc/150?img=17",
    lastMessage: "Mình đang bận, sẽ trả lời sau.",
    seen: false,
  },
  {
    id: "23456789-0abc-def1-2345-7890abcdef12",
    name: "Đỗ Thị Trang",
    date: "2024-11-09T11:50:00Z",
    img: "https://i.pravatar.cc/150?img=18",
    lastMessage: "Bạn đã nghe tin mới chưa?",
    seen: true,
  },
  {
    id: "34567890-abcd-ef12-3456-890abcdef123",
    name: "Nguyễn Văn Tú",
    date: "2024-11-09T09:25:00Z",
    img: "https://i.pravatar.cc/150?img=19",
    lastMessage: "Chúng ta cần họp khẩn.",
    seen: false,
  },
  {
    id: "4567890a-bcde-f123-4567-90abcdef1234",
    name: "Trần Thị Uyên",
    date: "2024-11-08T16:40:00Z",
    img: "https://i.pravatar.cc/150?img=20",
    lastMessage: "Mình sẽ đến sớm hơn dự kiến.",
    seen: true,
  },
  {
    id: "567890ab-cdef-1234-5678-0abcdef12345",
    name: "Lê Văn Vinh",
    date: "2024-11-08T13:15:00Z",
    img: "https://i.pravatar.cc/150?img=21",
    lastMessage: "Bạn đã hoàn tất nhiệm vụ chưa?",
    seen: false,
  },
  {
    id: "67890abc-def1-2345-6789-abcdef123456",
    name: "Phạm Thị Xuân",
    date: "2024-11-07T10:05:00Z",
    img: "https://i.pravatar.cc/150?img=22",
    lastMessage: "Mình có một ý tưởng mới.",
    seen: true,
  },
  {
    id: "7890abcd-ef12-3456-7890-bcdef1234567",
    name: "Đặng Văn Yên",
    date: "2024-11-07T08:50:00Z",
    img: "https://i.pravatar.cc/150?img=23",
    lastMessage: "Bạn đã thử dùng ứng dụng chưa?",
    seen: false,
  },
  {
    id: "890abcde-f123-4567-890a-cdef12345678",
    name: "Vũ Thị Ý",
    date: "2024-11-06T18:30:00Z",
    img: "https://i.pravatar.cc/150?img=24",
    lastMessage: "Cần giúp đỡ về kỹ thuật.",
    seen: true,
  },
  {
    id: "90abcdef-1234-5678-90ab-def123456789",
    name: "Ngô Văn Zinh",
    date: "2024-11-06T14:20:00Z",
    img: "https://i.pravatar.cc/150?img=25",
    lastMessage: "Hãy liên lạc với tôi khi bạn rảnh.",
    seen: false,
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
