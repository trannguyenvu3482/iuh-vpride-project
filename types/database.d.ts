export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      chat_participants: {
        Row: {
          chat_id: string | null;
          id: string;
          joined_at: string | null;
          user_id: string | null;
        };
        Insert: {
          chat_id?: string | null;
          id?: string;
          joined_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          chat_id?: string | null;
          id?: string;
          joined_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chat_participants_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_participants_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      chats: {
        Row: {
          created_at: string | null;
          id: string;
          is_group: boolean | null;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_group?: boolean | null;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_group?: boolean | null;
          name?: string | null;
        };
        Relationships: [];
      };
      drivers: {
        Row: {
          car_image_url: string | null;
          createdAt: string | null;
          full_name: string;
          id: string;
          phone_number: string;
          profile_image_url: string;
          ratings: number;
          status: Database["public"]["Enums"]["driverStatus"] | null;
          totalEarning: number;
          totalRides: number;
          vehicle_color: string;
          vehicle_name: string;
          vehicle_type: Database["public"]["Enums"]["VehicleType"];
        };
        Insert: {
          car_image_url?: string | null;
          createdAt?: string | null;
          full_name: string;
          id?: string;
          phone_number: string;
          profile_image_url?: string;
          ratings?: number;
          status?: Database["public"]["Enums"]["driverStatus"] | null;
          totalEarning?: number;
          totalRides?: number;
          vehicle_color: string;
          vehicle_name: string;
          vehicle_type?: Database["public"]["Enums"]["VehicleType"];
        };
        Update: {
          car_image_url?: string | null;
          createdAt?: string | null;
          full_name?: string;
          id?: string;
          phone_number?: string;
          profile_image_url?: string;
          ratings?: number;
          status?: Database["public"]["Enums"]["driverStatus"] | null;
          totalEarning?: number;
          totalRides?: number;
          vehicle_color?: string;
          vehicle_name?: string;
          vehicle_type?: Database["public"]["Enums"]["VehicleType"];
        };
        Relationships: [];
      };
      messages: {
        Row: {
          chat_id: string | null;
          content: string;
          created_at: string | null;
          id: string;
          user_id: string | null;
        };
        Insert: {
          chat_id?: string | null;
          content: string;
          created_at?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          chat_id?: string | null;
          content?: string;
          created_at?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      rides: {
        Row: {
          created_at: string;
          destination_address: string;
          destination_latitude: number;
          destination_longitude: number;
          driver_id: string;
          id: string;
          price: number;
          ride_time: number;
          start_address: string;
          start_latitude: number;
          start_longitude: number;
          status: Database["public"]["Enums"]["rideStatus"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          destination_address?: string;
          destination_latitude?: number;
          destination_longitude?: number;
          driver_id: string;
          id?: string;
          price?: number;
          ride_time?: number;
          start_address?: string;
          start_latitude?: number;
          start_longitude?: number;
          status?: Database["public"]["Enums"]["rideStatus"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          destination_address?: string;
          destination_latitude?: number;
          destination_longitude?: number;
          driver_id?: string;
          id?: string;
          price?: number;
          ride_time?: number;
          start_address?: string;
          start_latitude?: number;
          start_longitude?: number;
          status?: Database["public"]["Enums"]["rideStatus"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rides_driver_id_fkey";
            columns: ["driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rides_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      transactions: {
        Row: {
          amount: number;
          created_at: string;
          id: number;
          status: Database["public"]["Enums"]["vnpayresponsestatus"] | null;
          transaction_code: string | null;
          user_id: string | null;
        };
        Insert: {
          amount?: number;
          created_at?: string;
          id?: number;
          status?: Database["public"]["Enums"]["vnpayresponsestatus"] | null;
          transaction_code?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: number;
          status?: Database["public"]["Enums"]["vnpayresponsestatus"] | null;
          transaction_code?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          createdAt: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          phone_number: string | null;
          status: Database["public"]["Enums"]["userStatus"] | null;
          totalRides: number | null;
        };
        Insert: {
          createdAt?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          phone_number?: string | null;
          status?: Database["public"]["Enums"]["userStatus"] | null;
          totalRides?: number | null;
        };
        Update: {
          createdAt?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          phone_number?: string | null;
          status?: Database["public"]["Enums"]["userStatus"] | null;
          totalRides?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      driverStatus: "ACTIVE" | "INACTIVE";
      rideStatus: "CREATED" | "GOING" | "FINISHED" | "CANCELLED";
      userStatus: "CREATED" | "AUTHENTICATED" | "DELETED";
      VehicleType: "VPBIKE" | "VPCAR4" | "VPCAR7";
      vnpayresponsestatus:
        | "CANCELLED_BY_USER"
        | "INSUFFICIENT_BALANCE"
        | "TRANSACTION_TIMEOUT"
        | "SUCCESS"
        | "PENDING";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
