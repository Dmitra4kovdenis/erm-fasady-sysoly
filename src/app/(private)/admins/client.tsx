"use client";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { AdminsList } from "@/app/(private)/admins/page";
import { FormAddAdmin } from "@/app/(private)/admins/components/form-add-worker";
import { useState } from "react";
import { PageContainer } from "@/components/page-container/page-container";
import { ScrollOverflow } from "@/components/scroll-overflow/scroll-overflow";

interface ClientAdmins {
  admins: AdminsList;
}

export function ClientAdmin({ admins }: ClientAdmins) {
  // state для хранения id редактируемого в форме пользователя, если добавляем нового, то -1
  const [editId, setEditId] = useState<undefined | number>(undefined);

  return (
    <PageContainer>
      <Typography variant="h1">Администраторы</Typography>
      <Box mb={2}>
        <Button variant="contained" onClick={() => setEditId(-1)}>
          Добавить администратора
        </Button>
      </Box>
      <ScrollOverflow>
        <Table>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.phone}</TableCell>
                <TableCell>{admin.user?.login}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => setEditId(admin.id)}
                    >
                      Редактировать
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollOverflow>
      {editId !== undefined && (
        <FormAddAdmin
          onClose={() => setEditId(undefined)}
          editId={editId}
          admins={admins}
        />
      )}
    </PageContainer>
  );
}
