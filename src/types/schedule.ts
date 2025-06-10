export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  avatar?: string;
}

export interface Appointment {
  id: number;
  doctorId: number;
  patientName: string;
  startTime: string;
  duration: number;
  status: AppointmentStatus;
  notes?: string;
}

export type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no_show";

export interface NewAppointment {
  patientName: string;
  doctorId: number;
  startTime: string;
  duration: number;
  status: AppointmentStatus;
  notes?: string;
}

export interface StatusColors {
  [key: string]: string;
}

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  scheduled: "Запланирован",
  completed: "Завершен",
  cancelled: "Отменен",
  no_show: "Не явился",
};
