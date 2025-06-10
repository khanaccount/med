import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { Doctor } from "../types/schedule";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = React.memo<DoctorCardProps>(({ doctor }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 1.5, textAlign: "center" }}>
        <Avatar
          sx={{
            mb: 1,
            mx: "auto",
            width: 40,
            height: 40,
            bgcolor: "#1a237e",
            fontSize: "1rem",
          }}
        >
          {doctor.avatar}
        </Avatar>
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontWeight: 500,
            color: "#1a237e",
          }}
        >
          {doctor.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#666",
            display: "block",
            mt: 0.5,
          }}
          noWrap
        >
          {doctor.specialization}
        </Typography>
      </CardContent>
    </Card>
  );
});
