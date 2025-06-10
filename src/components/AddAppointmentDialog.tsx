import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { NewAppointment, STATUS_LABELS } from "../types/schedule";
import { doctors } from "../constants/schedule";

interface AddAppointmentDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (appointment: NewAppointment) => void;
  selectedDate: Date;
  timeSlots: Date[];
}

export const AddAppointmentDialog: React.FC<AddAppointmentDialogProps> = ({
  open,
  onClose,
  onAdd,
  timeSlots,
}) => {
  const [formData, setFormData] = useState<NewAppointment>({
    patientName: "",
    doctorId: doctors[0].id,
    startTime: format(timeSlots[0], "yyyy-MM-dd'T'HH:mm"),
    duration: 30,
    status: "scheduled",
  });

  const handleTextChange =
    (field: keyof NewAppointment) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSelectChange =
    (field: keyof NewAppointment) => (event: SelectChangeEvent<string | number>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = () => {
    onAdd(formData);
    setFormData({
      patientName: "",
      doctorId: doctors[0].id,
      startTime: format(timeSlots[0], "yyyy-MM-dd'T'HH:mm"),
      duration: 30,
      status: "scheduled",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавить приём</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="ФИО пациента"
            value={formData.patientName}
            onChange={handleTextChange("patientName")}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel>Врач</InputLabel>
            <Select<number>
              value={formData.doctorId}
              label="Врач"
              onChange={handleSelectChange("doctorId")}
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Время</InputLabel>
            <Select<string>
              value={formData.startTime}
              label="Время"
              onChange={handleSelectChange("startTime")}
            >
              {timeSlots.map((slot) => (
                <MenuItem key={slot.toISOString()} value={format(slot, "yyyy-MM-dd'T'HH:mm")}>
                  {format(slot, "HH:mm", { locale: ru })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Длительность (минут)"
            type="number"
            value={formData.duration}
            onChange={handleTextChange("duration")}
            fullWidth
            required
            inputProps={{ min: 15, step: 15 }}
          />
          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select<string>
              value={formData.status}
              label="Статус"
              onChange={handleSelectChange("status")}
            >
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Примечания"
            value={formData.notes || ""}
            onChange={handleTextChange("notes")}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
