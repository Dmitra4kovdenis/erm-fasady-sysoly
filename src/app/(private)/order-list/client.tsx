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
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from "@mui/material";
import { OrdersType } from "@/prisma-helpers/get-orders";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./order-list.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface OrderListProps {
  orders: OrdersType;
}

function pluralize(num: number, titles: string[]): string {
  return titles[
    num % 10 === 1 && num % 100 !== 11
      ? 0
      : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
        ? 1
        : 2
  ];
}

const getDelayVariant = (date: Date) => {
  const now = dayjs();
  const difference = dayjs(date).diff(now, "days") + 1;

  if (difference === 0)
    return (
      <Chip size="small" label="Сегодня" color="warning" variant="outlined" />
    );

  const title = pluralize(Math.abs(difference), [" день", " дня", " дней"]);

  if (difference < 0) {
    return (
      <Chip
        size="small"
        label={Math.abs(difference) + title}
        color="error"
        variant="filled"
      />
    );
  }

  if (difference < 2) {
    return (
      <Chip
        size="small"
        label={difference + title}
        color="warning"
        variant="outlined"
      />
    );
  }

  return null;
};

function OrderListClient({ orders }: OrderListProps) {
  const { push } = useRouter();
  const pathname = usePathname();

  // Определяем, какая кнопка должна быть активна
  let currentValue: string | null = null;
  if (pathname.startsWith("/order-list")) {
    currentValue = "Текущие заказы";
  } else if (pathname.startsWith("/archive-list")) {
    currentValue = "Архив";
  }

  return (
    <>
      <div className={styles.container}>
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
        <Typography variant="h5" sx={{ p: 2 }}>
          Список заказов
        </Typography>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell># Заказа</TableCell>
            <TableCell>Заказчик</TableCell>
            <TableCell>Мастер</TableCell>
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
              <TableCell>{order.worker?.name ?? "Не назначено"}</TableCell>
              <TableCell>{order.status.title}</TableCell>
              <TableCell>{order.workType}</TableCell>
              <TableCell>
                {dayjs(order.startDate).format("D MMMM YYYY")}
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Box>{dayjs(order.endDate).format("D MMMM YYYY")}</Box>
                  {getDelayVariant(order.endDate)}
                </Box>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() => push(`?orderNumber=${order.orderNumber}`)}
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
    </>
  );
}

export default OrderListClient;
