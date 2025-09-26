"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ArchiveOrdersType } from "@/prisma-helpers/get-archive-orders";

interface ArchiveProps {
  orders: ArchiveOrdersType;
}

// const getDelayVariant = (date: Date) => {
//   const now = dayjs();
//   const difference = dayjs(date).diff(now, "days");
//
//   const displayDate = dayjs(date).format("D MMMM YYYY");
//
//   if (difference < -2) {
//     return <Chip label={displayDate} color="error" variant="filled" />;
//   }
//
//   if (difference < 0) {
//     return <Chip label={displayDate} color="error" variant="outlined" />;
//   }
//
//   return displayDate;
// };

function ArchiveListClient({ orders }: ArchiveProps) {
  const { push } = useRouter();

  return (
    <>
      <Typography variant="h5" sx={{ p: 2 }}>
        Список заказов
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell># Заказа</TableCell>
            <TableCell>Заказчик</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Заказ</TableCell>
            <TableCell>Время начала</TableCell>
            <TableCell>Дедлайн</TableCell>
            <TableCell align="center">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderNumber}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{order.status.title}</TableCell>
              <TableCell>{order.workType}</TableCell>
              <TableCell>
                {dayjs(order.startDate).format("D MMMM YYYY")}
              </TableCell>
              <TableCell>
                {dayjs(order.endDate).format("D MMMM YYYY")}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() => push(`?orderNumber=${order.orderNumber}`)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ArchiveListClient;
