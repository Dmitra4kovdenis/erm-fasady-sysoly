"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { OrdersType } from "./page";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pluralize } from "@/utils";
import { PageContainer } from "@/components/page-container/page-container";
import { ScrollOverflow } from "@/components/scroll-overflow/scroll-overflow";

interface OrderListProps {
  orders: OrdersType;
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
    return <Chip size="small" label={title} color="error" variant="filled" />;
  }

  if (difference < 2) {
    return (
      <Chip size="small" label={title} color="warning" variant="outlined" />
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
    <PageContainer>
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
          <ToggleButtonGroup color="warning" value={currentValue} exclusive>
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
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Box>{dayjs(order.endDate).format("D MMMM YYYY")}</Box>
                    {getDelayVariant(order.endDate)}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => push(`?orderNumber=${order.id}`)}
                  >
                    Подробнее
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollOverflow>
    </PageContainer>
  );
}

export default OrderListClient;
