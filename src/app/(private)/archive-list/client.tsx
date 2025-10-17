"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from "dayjs";
import { ArchiveOrdersType } from "./page";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { PageContainer } from "@/components/page-container/page-container";
import { ScrollOverflow } from "@/components/scroll-overflow/scroll-overflow";
import { useState } from "react";
import OrderDetailClient from "@/containers/order-detail/client";

interface ArchiveProps {
  orders: ArchiveOrdersType;
}

function ArchiveListClient({ orders }: ArchiveProps) {
  // Определяем, какая кнопка должна быть активна
  const currentValue = "Архив";
  const [orderId, setOrderId] = useState<number>();

  return (
    <PageContainer>
      {orderId && (
        <OrderDetailClient
          id={orderId}
          closeModal={() => setOrderId(undefined)}
        />
      )}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        marginBottom={4}
      >
        <Grid>
          <Typography variant="h5" sx={{ p: 2 }}>
            Список заказов
          </Typography>
        </Grid>
        <Grid>
          <ToggleButtonGroup
            color="warning"
            value={currentValue}
            exclusive
            aria-label="orders-navigation"
          >
            <ToggleButton
              value="Текущие заказы"
              component={Link}
              href="/order-list"
            >
              Текущие заказы
            </ToggleButton>
            <ToggleButton value="Архив" component={Link} href="/archive-list">
              Архив
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <ScrollOverflow>
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
                    onClick={() => setOrderId(order.id)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgb(237 108 2 / 21%)",
                      },
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollOverflow>
    </PageContainer>
  );
}

export default ArchiveListClient;
