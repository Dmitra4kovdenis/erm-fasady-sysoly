"use client";

import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { updateStatus } from "@/actions/update-status";
import dayjs from "dayjs";

interface OrderDetailClientProps {
  order: NonNullable<OrderDetailType>;
  statuses: {
    value: number;
    label: string;
  }[];
}

function OrderDetailClient({ statuses, order }: OrderDetailClientProps) {
  const { push } = useRouter();
  const pathname = usePathname();

  const onClose = () => push(pathname);

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Детали заказа №{order.orderNumber}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3} mb={5} pr={20}>
            <Grid size={4}>
              <Typography variant="subtitle2">Заказчик</Typography>
              <Typography variant="body1">{order.customer.name}</Typography>
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">Вид работ</Typography>
              <Typography variant="body1">{order.workType}</Typography>
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">Адрес доставки</Typography>
              <Typography variant="body1">{order.deliveryAddress}</Typography>
            </Grid>

            <Grid size={4}>
              <Typography variant="subtitle2">Дата приёмки</Typography>
              <Typography variant="body1">
                {dayjs(order.startDate).format("D MMMM YYYY")}
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">Дата выдачи</Typography>
              <Typography variant="body1">
                {dayjs(order.endDate).format("D MMMM YYYY")}
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">Аванс</Typography>
              <Typography variant="body1">{order.advance}</Typography>
            </Grid>

            <Grid size={4}>
              <Typography variant="subtitle2">Скидка</Typography>
              <Typography variant="body1">{order.discount}</Typography>
            </Grid>

            <Grid></Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Фасады
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <td>Фасад</td>
                  <td>Высота, мм</td>
                  <td>Ширина, мм</td>
                  <td>Толщина</td>
                  <td>Ручка</td>
                  <td>Радиус</td>
                  <td>Фрезеровка</td>
                  <td>Цвет</td>
                  <td>Кол-во</td>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>Фасад {index + 1}</td>
                    <td>{item.height}</td>
                    <td>{item.width}</td>
                    <td>{item.thickness}</td>
                    <td>{item.handle?.title || "-"}</td>
                    <td>{item.radius}</td>
                    <td>{item.milling?.title || "-"}</td>
                    <td>{item.color}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Блок смены статуса */}
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Изменить статус
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={order.statusId}
            exclusive
            onChange={async (event, newAlignment) => {
              if (newAlignment !== null) {
                await updateStatus({
                  statusId: +newAlignment,
                  id: order.id,
                });
                onClose();
              }
            }}
            aria-label="Выбор статуса"
          >
            {statuses.map((status) => (
              <ToggleButton key={status.value} value={status.value}>
                {status.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetailClient;
