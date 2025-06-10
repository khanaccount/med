import React from "react";
import { Box, Typography, Tooltip, Chip } from "@mui/material";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Appointment, STATUS_LABELS } from "../types/schedule";
import { statusColors } from "../constants/schedule";

interface AppointmentCellProps {
  appointment: Appointment | undefined;
}

export const AppointmentCell: React.FC<AppointmentCellProps> = ({ appointment }) => {
  if (!appointment) return null;

  const statusColor = statusColors[appointment.status];
  const statusLabel = STATUS_LABELS[appointment.status];

  return (
    <Tooltip
      title={
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" color="inherit">
            {appointment.patientName}
          </Typography>
          <Typography variant="body2" color="inherit">
            Время: {format(new Date(appointment.startTime), "HH:mm", { locale: ru })}
          </Typography>
          <Typography variant="body2" color="inherit">
            Длительность: {appointment.duration} мин.
          </Typography>
          {appointment.notes && (
            <Typography variant="body2" color="inherit">
              Примечания: {appointment.notes}
            </Typography>
          )}
        </Box>
      }
      arrow
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "background.paper",
            color: "text.primary",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: 3,
            "& .MuiTooltip-arrow": {
              color: "background.paper",
              "&:before": {
                border: "1px solid",
                borderColor: "divider",
              },
            },
          },
        },
      }}
    >
      <Box
        sx={{
          p: 1,
          borderRadius: 1,
          bgcolor: `${statusColor}15`,
          border: `1px solid ${statusColor}30`,
          "&:hover": {
            bgcolor: `${statusColor}25`,
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: statusColor,
            mb: 0.5,
          }}
        >
          {appointment.patientName}
        </Typography>
        <Chip
          label={statusLabel}
          size="small"
          sx={{
            bgcolor: statusColor,
            color: "white",
            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />
      </Box>
    </Tooltip>
  );
};
