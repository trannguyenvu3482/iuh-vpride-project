import { Database } from "@/types/database";
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

// Calculate the price based on the distance
// (Open, Since the 3km)
// VPBike: 13000VND, 4800VND
// (Open, First 24km, Since the 26km)
// VPCar 4: 20000VND, 14000VND, 12000VND
// VPCar 7: 21000VND, 21000VND, 21000VND
export const calculateTotalPrice = (
  distance: number,
  vehicleType: Database["public"]["Enums"]["VehicleType"],
) => {
  const distanceInKm = distance / 1000;
  let price = 0;

  switch (vehicleType) {
    case "VPBIKE":
      if (distanceInKm <= 3) {
        price = 13000;
      } else {
        price = 13000 + (distanceInKm - 3) * 4800;
      }
      break;

    case "VPCAR4":
      if (distanceInKm <= 24) {
        price = 20000 + (distanceInKm - 1) * 14000; // Open price covers 1 km
      } else if (distanceInKm > 24 && distanceInKm <= 26) {
        price = 20000 + 23 * 14000 + (distanceInKm - 24) * 12000;
      } else {
        price = 20000 + 23 * 14000 + 2 * 12000 + (distanceInKm - 26) * 12000;
      }
      break;

    case "VPCAR7":
      if (distanceInKm <= 26) {
        price = 21000 * distanceInKm; // Uniform price per km
      } else {
        price = 21000 * 26 + 21000 * (distanceInKm - 26); // Same uniform rate beyond 26 km
      }
      break;

    default:
      throw new Error("Invalid vehicle type");
  }

  return Math.round(price / 500) * 500;
};

export const getRandomDriver = (
  drivers: Database["public"]["Tables"]["drivers"]["Row"][],
  vehicleType: Database["public"]["Enums"]["VehicleType"],
) => {
  // Find a random driver that has the car type
  const filteredDrivers = drivers.filter(
    (driver) => driver.vehicle_type === vehicleType,
  );

  if (filteredDrivers.length === 0) {
    throw new Error("No drivers found");
  }

  const randomDriver =
    filteredDrivers[Math.floor(Math.random() * filteredDrivers.length)];

  return randomDriver;
};
