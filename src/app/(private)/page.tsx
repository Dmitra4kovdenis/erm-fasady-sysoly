"use client";
import { Container, Typography } from "@mui/material";
import { useUserData } from "@/prisma-helpers/user-data/user-data.provider";
import { InstructionAdmin } from "@/app/(private)/instruction.admin";
import { InstructionWorker } from "@/app/(private)/instruction.worker";

export default function Home() {
  const { role } = useUserData();

  return (
    <Container>
      <Typography variant="h1">Инструкция по пользованию ERM</Typography>
      {role === "admin" ? <InstructionAdmin /> : <InstructionWorker />}
    </Container>
  );
}
