import moment from "moment";

export const formatDate = (date: string): string => {
  moment.locale("vi");
  const currentDate = new Date(date);
  const currentMoment = moment(currentDate);
  return currentMoment.format("DD/MM/YYYY");
};

export function formatTime(minutes: number): string {
  const formattedMinutes = +minutes?.toFixed(0) || 0;

  if (formattedMinutes < 60) {
    return `${minutes} phút`;
  } else {
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = formattedMinutes % 60;
    return `${hours} giờ ${remainingMinutes} phút`;
  }
}

export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
