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
  DialogActions,
  IconButton,
} from "@mui/material";
import { Print, ContentCut } from "@mui/icons-material";
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
          <Grid container spacing={5} mb={5}>
            <Grid>
              <Typography variant="subtitle2">Заказчик</Typography>
              <Typography variant="body1">{order.customer.name}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2">Вид работ</Typography>
              <Typography variant="body1">{order.workType}</Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2">Адрес доставки</Typography>
              <Typography variant="body1">{order.deliveryAddress}</Typography>
            </Grid>

            <Grid>
              <Typography variant="subtitle2">Дата приёмки</Typography>
              <Typography variant="body1">
                {dayjs(order.startDate).format("D MMMM YYYY")}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2">Дата выдачи</Typography>
              <Typography variant="body1">
                {dayjs(order.endDate).format("D MMMM YYYY")}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2">Аванс</Typography>
              <Typography variant="body1">{order.advance}</Typography>
            </Grid>

            <Grid>
              <Typography variant="subtitle2">Скидка</Typography>
              <Typography variant="body1">{order.discount}</Typography>
            </Grid>
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

            <Grid position={"absolute"} right={80} bottom={60}>
              <IconButton
                color="primary"
                onClick={() => console.log("Печать")}
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                <Print />
              </IconButton>
            </Grid>
            <Grid position={"absolute"} right={25} bottom={60}>
              <IconButton
                onClick={() => console.log("Раскрой")}
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                <ContentCut />
              </IconButton>
            </Grid>
          </ToggleButtonGroup>
        </Box>
      </DialogContent>

      <DialogActions sx={{ mb: 3, mr: 4 }}>
        <Grid container justifyContent="flex-end" spacing={2}></Grid>
      </DialogActions>
    </Dialog>
  );
}

export default OrderDetailClient;
