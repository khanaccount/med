import { Doctor, AppointmentStatus } from "../types/schedule";

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Иванов Иван Иванович",
    specialization: "Терапевт",
    avatar: "ИИ",
  },
  {
    id: 2,
    name: "Петрова Анна Сергеевна",
    specialization: "Кардиолог",
    avatar: "АП",
  },
  {
    id: 3,
    name: "Сидоров Петр Николаевич",
    specialization: "Невролог",
    avatar: "ПС",
  },
  {
    id: 4,
    name: "Козлова Мария Александровна",
    specialization: "Офтальмолог",
    avatar: "МК",
  },
  { id: 5, name: "Морозов Д.С.", specialization: "Отоларинголог", avatar: "ДМ" },
  { id: 6, name: "Смирнова О.Л.", specialization: "Гинеколог", avatar: "ОС" },
  { id: 7, name: "Кузнецов Р.А.", specialization: "Уролог", avatar: "РК" },
  { id: 8, name: "Новикова Т.В.", specialization: "Эндокринолог", avatar: "ТН" },
  { id: 9, name: "Шевчук Д.С.", specialization: "Хирург", avatar: "ДШ" },
];

export const statusColors: Record<AppointmentStatus, string> = {
  scheduled: "#2196f3", // Яркий синий
  completed: "#9c27b0", // Яркий фиолетовый
  cancelled: "#f44336", // Яркий красный
  no_show: "#ff9800", // Оранжевый
};

export const statusTextColors: Record<AppointmentStatus, string> = {
  scheduled: "#ffffff",
  completed: "#ffffff",
  cancelled: "#ffffff",
  no_show: "#ffffff",
};
