import React, { useState, useCallback } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { ScheduleHeader } from "./ScheduleHeader";
import { ScheduleFilters } from "./ScheduleFilters";
import { Schedule } from "./Schedule";
import { AppointmentDetails } from "./AppointmentDetails";
import { AddAppointmentDialog } from "./AddAppointmentDialog";
import { useAppointments } from "../hooks/useAppointments";
import { doctors } from "../constants/schedule";
import { Appointment, NewAppointment } from "../types/schedule";

export const ClinicSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<number | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments();

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleDoctorChange = useCallback((doctorId: number | "all") => {
    setSelectedDoctor(doctorId);
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setSelectedStatus(status);
  }, []);

  const handleAddClick = useCallback(() => {
    setIsAddDialogOpen(true);
  }, []);

  const handleAppointmentClick = useCallback((appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsDetailsOpen(false);
    setSelectedAppointment(null);
  }, []);

  const handleCloseAddDialog = useCallback(() => {
    setIsAddDialogOpen(false);
  }, []);

  const handleAddAppointment = useCallback(
    (newAppointment: NewAppointment) => {
      try {
        addAppointment(newAppointment);
        setIsAddDialogOpen(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ошибка при добавлении приема");
      }
    },
    [addAppointment]
  );

  const handleUpdateAppointment = useCallback(
    (updatedAppointment: Appointment) => {
      try {
        updateAppointment(updatedAppointment.id, updatedAppointment);
        setIsDetailsOpen(false);
        setSelectedAppointment(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ошибка при обновлении приема");
      }
    },
    [updateAppointment]
  );

  const handleDeleteAppointment = useCallback(
    (appointment: Appointment) => {
      try {
        deleteAppointment(appointment.id);
        setIsDetailsOpen(false);
        setSelectedAppointment(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ошибка при удалении приема");
      }
    },
    [deleteAppointment]
  );

  const handleCloseError = useCallback(() => {
    setError(null);
  }, []);

  // Генерация временных слотов
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(selectedDate);
    date.setHours(9 + Math.floor(i / 2), (i % 2) * 30, 0, 0);
    return date;
  });

  // Фильтрация приемов
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.startTime);
    const matchesDate =
      appointmentDate.getDate() === selectedDate.getDate() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getFullYear() === selectedDate.getFullYear();

    const matchesDoctor = selectedDoctor === "all" || appointment.doctorId === selectedDoctor;

    const matchesStatus = selectedStatus === "all" || appointment.status === selectedStatus;

    const matchesSearch =
      searchQuery === "" ||
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.notes?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDate && matchesDoctor && matchesStatus && matchesSearch;
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        py: 4,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <ScheduleHeader selectedDate={selectedDate} onDateChange={handleDateChange} />
      <ScheduleFilters
        searchQuery={searchQuery}
        selectedDoctor={selectedDoctor}
        selectedStatus={selectedStatus}
        onSearchChange={handleSearchChange}
        onDoctorChange={handleDoctorChange}
        onStatusChange={handleStatusChange}
        onAddClick={handleAddClick}
        doctors={doctors}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Schedule
          timeSlots={timeSlots}
          doctors={doctors}
          filteredAppointments={filteredAppointments}
          onAppointmentClick={handleAppointmentClick}
        />
      </Box>

      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          open={isDetailsOpen}
          onClose={handleCloseDetails}
          onUpdate={handleUpdateAppointment}
          onDelete={handleDeleteAppointment}
        />
      )}

      <AddAppointmentDialog
        open={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        onAdd={handleAddAppointment}
        selectedDate={selectedDate}
        timeSlots={timeSlots}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
