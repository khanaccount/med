import { useState, useEffect } from "react";
import { Appointment, NewAppointment, AppointmentStatus } from "../types/schedule";
import { addMinutes, isWithinInterval } from "date-fns";

const STORAGE_KEY = "clinic_appointments";

const mockAppointments: Appointment[] = [
  {
    id: 1,
    doctorId: 1,
    patientName: "Анна Смирнова",
    startTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    duration: 30,
    status: "scheduled" as AppointmentStatus,
    notes: "Первичный приём",
  },
  {
    id: 2,
    doctorId: 2,
    patientName: "Иван Петров",
    startTime: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
    duration: 45,
    status: "scheduled" as AppointmentStatus,
    notes: "Повторный приём",
  },
  {
    id: 3,
    doctorId: 3,
    patientName: "Мария Иванова",
    startTime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    duration: 30,
    status: "completed" as AppointmentStatus,
    notes: "Консультация",
  },
  {
    id: 4,
    doctorId: 4,
    patientName: "Петр Сидоров",
    startTime: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(),
    duration: 60,
    status: "cancelled" as AppointmentStatus,
    notes: "Отменён пациентом",
  },
];

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const savedAppointments = localStorage.getItem(STORAGE_KEY);
    if (savedAppointments) {
      try {
        return JSON.parse(savedAppointments) as Appointment[];
      } catch {
        return mockAppointments;
      }
    }
    return mockAppointments;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const hasTimeConflict = (
    doctorId: number,
    startTime: string,
    duration: number,
    excludeAppointmentId?: number
  ) => {
    const startDate = new Date(startTime);
    const endDate = addMinutes(startDate, duration);
    return appointments.some((apt) => {
      if (apt.doctorId !== doctorId || apt.id === excludeAppointmentId) {
        return false;
      }
      const aptStartDate = new Date(apt.startTime);
      const aptEndDate = addMinutes(aptStartDate, apt.duration);
      return (
        isWithinInterval(startDate, {
          start: aptStartDate,
          end: aptEndDate,
        }) ||
        isWithinInterval(endDate, {
          start: aptStartDate,
          end: aptEndDate,
        }) ||
        isWithinInterval(aptStartDate, {
          start: startDate,
          end: endDate,
        })
      );
    });
  };

  const addAppointment = (newAppointment: NewAppointment) => {
    if (!newAppointment.doctorId || !newAppointment.patientName || !newAppointment.startTime) {
      throw new Error("Не все обязательные поля заполнены");
    }

    if (
      hasTimeConflict(newAppointment.doctorId, newAppointment.startTime, newAppointment.duration)
    ) {
      throw new Error("Время приёма пересекается с существующим приёмом");
    }

    const appointment: Appointment = {
      id: appointments.length + 1,
      doctorId: newAppointment.doctorId,
      patientName: newAppointment.patientName,
      startTime: newAppointment.startTime,
      duration: newAppointment.duration,
      status: newAppointment.status,
      notes: newAppointment.notes,
    };
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
  };

  const updateAppointment = (id: number, updatedAppointment: Partial<Appointment>) => {
    const appointment = appointments.find((apt) => apt.id === id);
    if (!appointment) {
      throw new Error("Приём не найден");
    }

    if (
      updatedAppointment.doctorId &&
      updatedAppointment.startTime &&
      updatedAppointment.duration &&
      hasTimeConflict(
        updatedAppointment.doctorId,
        updatedAppointment.startTime,
        updatedAppointment.duration,
        id
      )
    ) {
      throw new Error("Время приёма пересекается с существующим приёмом");
    }

    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, ...updatedAppointment } : appointment
      )
    );
  };

  const deleteAppointment = (id: number) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  const filterAppointments = (
    searchQuery: string,
    selectedDoctor: number | "all",
    selectedStatus: string | "all"
  ) => {
    return appointments.filter((apt) => {
      const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDoctor = selectedDoctor === "all" || apt.doctorId === selectedDoctor;
      const matchesStatus = selectedStatus === "all" || apt.status === selectedStatus;
      return matchesSearch && matchesDoctor && matchesStatus;
    });
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    filterAppointments,
  };
};
