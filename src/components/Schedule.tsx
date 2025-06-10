import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Doctor, Appointment } from "../types/schedule";
import { DoctorCard } from "./DoctorCard";
import { AppointmentCell } from "./AppointmentCell";

interface ScheduleProps {
  timeSlots: Date[];
  doctors: Doctor[];
  filteredAppointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
}

export const Schedule: React.FC<ScheduleProps> = ({
  timeSlots,
  doctors,
  filteredAppointments,
  onAppointmentClick,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* Заголовок с временем и врачами */}
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              width: 100,
              flexShrink: 0,
              p: 2,
              bgcolor: "primary.main",
              color: "white",
              position: "sticky",
              left: 0,
              zIndex: 2,
              borderRight: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography variant="h6" align="center">
              Время
            </Typography>
          </Box>
          {doctors.map((doctor) => (
            <Box
              key={doctor.id}
              sx={{
                flex: 1,
                minWidth: 150,
                p: 2,
                bgcolor: "primary.main",
                color: "white",
                borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                "&:last-child": {
                  borderRight: "none",
                },
              }}
            >
              <DoctorCard doctor={doctor} />
            </Box>
          ))}
        </Box>

        {/* Строки с временными слотами */}
        {timeSlots.map((timeSlot) => (
          <Box key={timeSlot.toISOString()} sx={{ display: "flex" }}>
            <Box
              sx={{
                width: 100,
                flexShrink: 0,
                p: 2,
                borderBottom: "1px solid #e0e0e0",
                borderRight: "1px solid #e0e0e0",
                bgcolor: "background.paper",
                position: "sticky",
                left: 0,
                zIndex: 1,
              }}
            >
              <Typography variant="body1" align="center">
                {format(timeSlot, "HH:mm", { locale: ru })}
              </Typography>
            </Box>
            {doctors.map((doctor) => {
              const appointment = filteredAppointments.find(
                (apt) =>
                  apt.doctorId === doctor.id &&
                  format(new Date(apt.startTime), "HH:mm") === format(timeSlot, "HH:mm")
              );

              return (
                <Box
                  key={`${doctor.id}-${timeSlot.toISOString()}`}
                  sx={{
                    flex: 1,
                    minWidth: 150,
                    p: 1,
                    minHeight: 80,
                    borderBottom: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    bgcolor: "background.paper",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                    cursor: appointment ? "pointer" : "default",
                    "&:last-child": {
                      borderRight: "none",
                    },
                  }}
                  onClick={() => appointment && onAppointmentClick(appointment)}
                >
                  <AppointmentCell appointment={appointment} />
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
