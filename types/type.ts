import { TextInputProps, TouchableOpacityProps, ImageProps } from "react-native";
import { Control } from 'react-hook-form';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: string;
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}


declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}


export interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

declare interface EmptyStateProps {
  title: string;
  subtitle: string;
  image: ImageProps;
}

declare interface SearchInputProps {
  initialQuery?: string;
}


export interface ControlledInputProps {
  control: Control<any>;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
}


export interface AuthState {
  token: string | null;
  user: {
    fullName: string;
    patientId: string;
    currentPlan: string;
    nextDeliveryDate: string;
    remainingMedication: number;
    status: 'active' | 'inactive';
    billingStatus: string;
  } | null;
  setAuthData: (token: string, user: any) => void;
  clearAuthData: () => void;
}

export type BookingStatus = "upcoming" | "completed" | "cancelled";

export interface Booking {
  id: string;
  time: string;
  date: string;
  status: BookingStatus;
}

export interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  getBookingsByStatus: (status: BookingStatus) => Booking[];
  clearCompletedBookings: () => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
}


export interface Shipment {
  _id: string;
  date: string;
  status: string;
  quantity: number;
}

export interface ShipmentState {
  shipments: Shipment[];
  setShipments: (shipments: Shipment[]) => void;
}
