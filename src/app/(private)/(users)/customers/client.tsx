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
import { CustomerList } from "@/app/(private)/(users)/customers/page";
import { FormAddCustomers } from "@/app/(private)/(users)/customers/components/form-add-customer";
import { useState } from "react";
import { PageContainer } from "@/components/page-container/page-container";
import { ScrollOverflow } from "@/components/scroll-overflow/scroll-overflow";

interface ClientCustomers {
  customers: CustomerList;
}

export function ClientCustomers({ customers }: ClientCustomers) {
  // state для хранения id редактируемого в форме пользователя, если добавляем нового, то -1
  const [editId, setEditId] = useState<undefined | number>(undefined);

  return (
    <PageContainer>
      <Typography variant="h1">Заказчики</Typography>
      <Box mb={2}>
        <Button variant="contained" onClick={() => setEditId(-1)}>
          Добавить заказчика
        </Button>
      </Box>
      <ScrollOverflow>
        <Table>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.companyName}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => setEditId(customer.id)}
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
        <FormAddCustomers
          onClose={() => setEditId(undefined)}
          editId={editId}
          customers={customers}
        />
      )}
    </PageContainer>
  );
}
