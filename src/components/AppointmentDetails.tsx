import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Appointment, STATUS_LABELS } from "../types/schedule";

interface AppointmentDetailsProps {
  appointment: Appointment;
  open: boolean;
  onClose: () => void;
  onUpdate: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
}

export const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  open,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState<Appointment>(appointment);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedAppointment);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAppointment(appointment);
    setIsEditing(false);
  };

  const handleTextChange =
    (field: keyof Appointment) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditedAppointment((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSelectChange = (field: keyof Appointment) => (event: SelectChangeEvent) => {
    setEditedAppointment((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Детали приёма</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {isEditing ? (
            <>
              <TextField
                label="ФИО пациента"
                value={editedAppointment.patientName}
                onChange={handleTextChange("patientName")}
                fullWidth
                required
              />
              <Typography variant="subtitle1">
                Время: {format(new Date(editedAppointment.startTime), "HH:mm", { locale: ru })}
              </Typography>
              <Typography variant="subtitle1">
                Длительность: {editedAppointment.duration} мин.
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select<string>
                  value={editedAppointment.status}
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
                value={editedAppointment.notes || ""}
                onChange={handleTextChange("notes")}
                fullWidth
                multiline
                rows={3}
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle1">Пациент: {appointment.patientName}</Typography>
              <Typography variant="subtitle1">
                Время: {format(new Date(appointment.startTime), "HH:mm", { locale: ru })}
              </Typography>
              <Typography variant="subtitle1">Длительность: {appointment.duration} мин.</Typography>
              <Typography variant="subtitle1">
                Статус: {STATUS_LABELS[appointment.status]}
              </Typography>
              {appointment.notes && (
                <Typography variant="subtitle1">Примечания: {appointment.notes}</Typography>
              )}
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onDelete(appointment)} color="error">
          Удалить
        </Button>
        {isEditing ? (
          <>
            <Button onClick={handleCancel}>Отмена</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Сохранить
            </Button>
          </>
        ) : (
          <Button onClick={handleEdit} variant="contained" color="primary">
            Изменить
          </Button>
        )}
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};
