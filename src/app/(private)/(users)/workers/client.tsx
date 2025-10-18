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
import { WorkerList, WorkTypes } from "@/app/(private)/(users)/workers/page";
import { FormAddWorker } from "@/app/(private)/(users)/workers/components/form-add-worker";
import { useState } from "react";
import { PageContainer } from "@/components/page-container/page-container";
import { ScrollOverflow } from "@/components/scroll-overflow/scroll-overflow";

interface ClientWorkers {
  workers: WorkerList;
  workTypes: WorkTypes;
}

export function ClientWorkers({ workers, workTypes }: ClientWorkers) {
  // state для хранения id редактируемого в форме пользователя, если добавляем нового, то -1
  const [editId, setEditId] = useState<undefined | number>(undefined);

  return (
    <PageContainer>
      <Typography variant="h1">Специалисты</Typography>
      <Box mb={2}>
        <Button variant="contained" onClick={() => setEditId(-1)}>
          Добавить Специалиста
        </Button>
      </Box>
      <ScrollOverflow>
        <Table>
          <TableBody>
            {workers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell>{worker.id}</TableCell>
                <TableCell>{worker.name}</TableCell>
                <TableCell>{worker.phone}</TableCell>
                <TableCell>{worker.type.title}</TableCell>
                <TableCell>{worker.user?.login}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => setEditId(worker.id)}
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
        <FormAddWorker
          onClose={() => setEditId(undefined)}
          editId={editId}
          workers={workers}
          workTypes={workTypes}
        />
      )}
    </PageContainer>
  );
}
