import React from "react";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";

interface TimeSlotProps {
  time: Date;
  isCurrentTimeSlot: boolean;
  isEvenRow: boolean;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ time, isCurrentTimeSlot, isEvenRow }) => {
  return (
    <Box
      sx={{
        width: 200,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: isCurrentTimeSlot ? "#e3f2fd" : isEvenRow ? "#fafafa" : "white",
        borderRadius: 1,
        mr: 2,
        border: isCurrentTimeSlot ? "2px solid #1976d2" : "none",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: isCurrentTimeSlot ? "#1976d2" : "#424242",
        }}
      >
        {format(time, "HH:mm")}
      </Typography>
    </Box>
  );
};
