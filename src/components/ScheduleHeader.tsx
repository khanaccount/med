import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { format, addDays, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface ScheduleHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ selectedDate, onDateChange }) => {
  const handlePrevDay = () => {
    onDateChange(subDays(selectedDate, 1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(selectedDate, 1));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        mb: 2,
      }}
    >
      <IconButton onClick={handlePrevDay} size="small">
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography variant="h5" component="h1">
        {format(selectedDate, "d MMMM yyyy", { locale: ru })}
      </Typography>
      <IconButton onClick={handleNextDay} size="small">
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};
