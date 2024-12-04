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
    vehicle_type: string;
  };
}

declare interface IDriver {
  id: number;
  full_name: string;
  profile_image_url: string;
  car_image_url: string;
  vehicle_type: string;
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
  distance: number;
  duration: number;
  price: number;
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
  setDistance: (distance: number) => void;
  setDuration: (duration: number) => void;
  setPrice: (price: number) => void;
}

declare interface IUserStore {
  user: any;
  userData: any;
  session: Session | null;
  isRiding: boolean;
  setUser: (user: any) => void;
  setUserData: (userData: any) => void;
  setSession: (session: Session | null) => void;
  refreshSession: () => Promise<any>;
  setIsRiding: (isRiding: boolean) => void;
  resetUser: () => void;
}

declare interface IDriverStore {
  drivers: Database["public"]["Tables"]["drivers"]["Row"][];
  selectedDriver: string | null;
  fetchDrivers: () => void;
  setSelectedDriver: (driverId: string) => void;
  setDrivers: (
    drivers: Database["public"]["Tables"]["drivers"]["Row"][],
  ) => void;
  clearSelectedDriver: () => void;
}

declare interface IMarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  vehicle_type: string;
  rating: number;
  full_name: string;
  time?: number;
  price?: string;
}
