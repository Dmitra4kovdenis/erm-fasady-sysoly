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
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
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
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Заказчик
              </Typography>
              <Typography variant="body1">{order.customer.name}</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Вид работ
              </Typography>
              <Typography variant="body1">{order.workType}</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Адрес доставки
              </Typography>
              <Typography variant="body1">{order.deliveryAddress}</Typography>
            </Grid>

            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Дата приёмки
              </Typography>
              <Typography variant="body1">
                {dayjs(order.startDate).format("D MMMM YYYY")}
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Дата выдачи
              </Typography>
              <Typography variant="body1">
                {dayjs(order.endDate).format("D MMMM YYYY")}
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Аванс
              </Typography>
              <Typography variant="body1">{order.advance}</Typography>
            </Grid>

            <Grid size={3}>
              <Typography variant="subtitle2" color="textSecondary">
                Скидка
              </Typography>
              <Typography variant="body1">{order.discount}</Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Фасады
          </Typography>
          <Box marginBottom={10}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Фасад</TableCell>
                  <TableCell>Высота, мм</TableCell>
                  <TableCell>Ширина, мм</TableCell>
                  <TableCell>Толщина</TableCell>
                  <TableCell>Ручка</TableCell>
                  <TableCell>Радиус</TableCell>
                  <TableCell>Фрезеровка</TableCell>
                  <TableCell>Цвет</TableCell>
                  <TableCell>Кол-во</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={item.id || index}>
                    <TableCell>Фасад {index + 1}</TableCell>
                    <TableCell>{item.height}</TableCell>
                    <TableCell>{item.width}</TableCell>
                    <TableCell>{item.thickness}</TableCell>
                    <TableCell>{item.handle?.title || "-"}</TableCell>
                    <TableCell>{item.radius}</TableCell>
                    <TableCell>{item.milling?.title || "-"}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
              <ToggleButton
                size="small"
                key={status.value}
                value={status.value}
              >
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
