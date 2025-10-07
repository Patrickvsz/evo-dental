export type UserRole = 'patient' | 'dentist_senior' | 'dentist_master' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  city: string;
  role: UserRole;
  rating?: number;
  created_at: string;
  referral_code: string;
  points: number;
  premium: boolean;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  city: string;
  rating: number;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  dentist_id: string;
  clinic_id: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  type: string;
  notes?: string;
  created_at: string;
}

export interface Rating {
  id: string;
  appointment_id: string;
  patient_id: string;
  dentist_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  appointment_id: string;
  sender_id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_email: string;
  status: 'pending' | 'completed';
  reward_claimed: boolean;
  created_at: string;
}

export interface ClinicClick {
  id: string;
  user_id: string;
  clinic_id: string;
  appointment_id: string;
  clicked_at: string;
}

export interface DashboardStats {
  totalAppointments: number;
  dailyAppointments: number;
  weeklyAppointments: number;
  monthlyAppointments: number;
  averageRating: number;
  totalUsers: number;
  totalClinics: number;
  topClinics: Array<{
    clinic: Clinic;
    clickCount: number;
  }>;
  topDentists: Array<{
    dentist: User;
    rating: number;
    appointmentCount: number;
  }>;
}