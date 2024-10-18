import { TextInputProps } from "react-native";

declare interface ICustomButton {
  onPress: () => void;
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "success" | "outline";
  textVariant?: "primary" | "secondary" | "danger" | "success" | "default";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  [key: string]: any;
}

declare interface IInputField extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface ISupabaseClientOptions {
  auth: {
    storage: typeof AsyncStorage;
    autoRefreshToken: boolean;
    persistSession: boolean;
    detectSessionInUrl: boolean;
  };
  global: {
    headers: {
      Authorization: string;
    };
  };
}

declare interface IRide {
  start_address: string;
  destination_address: string;
  start_latitude: number;
  start_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  price: number;
  payment_status: string;
  driver_id: number;
  user_id: string;
  created_at: string;
  driver: {
    full_name: string;
    car_seats: number;
  };
}

declare interface IDriver {
  id: number;
  full_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}

declare interface IGoogleInputProps {
  icon?: string;
  initLocation?: string;
  containerStyle?: string;
  textInputBgColor?: string;
  hasSelectLocationButton?: boolean;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface ILocationStore {
  userAddress: string;
  userLongitude: number;
  userLatitude: number;
  destinationAddress: string;
  destinationLongitude: number;
  destinationLatitude: number;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface IUserStore {
  user: User | null;
  session: Session | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  refreshSession: () => Promise<any>;
}

declare interface IDriverStore {
  drivers: IMarkerData[];
  selectedDriver: number | null;
  setSelectedDriver: (driverId: number) => void;
  setDrivers: (drivers: IMarkerData[]) => void;
  clearSelectedDriver: () => void;
}

declare interface IMarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  full_name: string;
  time?: number;
  price?: string;
}
