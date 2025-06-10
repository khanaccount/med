import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Doctor, STATUS_LABELS } from "../types/schedule";

interface ScheduleFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDoctor: number | "all";
  onDoctorChange: (doctorId: number | "all") => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onAddClick: () => void;
  doctors: Doctor[];
}

export const ScheduleFilters: React.FC<ScheduleFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedDoctor,
  onDoctorChange,
  selectedStatus,
  onStatusChange,
  onAddClick,
  doctors,
}) => {
  const handleDoctorChange = (event: SelectChangeEvent<number | "all">) => {
    onDoctorChange(event.target.value as number | "all");
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    onStatusChange(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <TextField
        size="small"
        placeholder="Поиск пациента..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: "#666" }} />,
        }}
        sx={{ width: 250 }}
      />
      <FormControl size="small" sx={{ width: 200 }}>
        <InputLabel>Врач</InputLabel>
        <Select value={selectedDoctor} label="Врач" onChange={handleDoctorChange}>
          <MenuItem value="all">Все врачи</MenuItem>
          {doctors.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              {doctor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: 200 }}>
        <InputLabel>Статус</InputLabel>
        <Select value={selectedStatus} label="Статус" onChange={handleStatusChange}>
          <MenuItem value="all">Все статусы</MenuItem>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title="Добавить приём">
        <IconButton color="primary" onClick={onAddClick} sx={{ ml: "auto" }}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
