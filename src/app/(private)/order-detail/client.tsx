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
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { updateStatus } from "@/actions/update-status";
import dayjs from "dayjs";
import { PrintButtons } from "@/app/(private)/order-detail/components/print-buttons";

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
        <Box position="relative">
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={5} mb={5}>
              <Grid size={{ sm: 12, md: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Заказчик
                </Typography>
                <Typography variant="body1">{order.customer.name}</Typography>
              </Grid>
              <Grid size={{ sm: 12, md: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Вид работ
                </Typography>
                <Typography variant="body1">{order.workType}</Typography>
              </Grid>
              <Grid size={{ sm: 12, md: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Адрес доставки
                </Typography>
                <Typography variant="body1">{order.deliveryAddress}</Typography>
              </Grid>

              <Grid size={{ sm: 12, md: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Дата приёмки
                </Typography>
                <Typography variant="body1">
                  {dayjs(order.startDate).format("D MMMM YYYY")}
                </Typography>
              </Grid>
              <Grid size={{ sm: 12, md: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Дата выдачи
                </Typography>
                <Typography variant="body1">
                  {dayjs(order.endDate).format("D MMMM YYYY")}
                </Typography>
              </Grid>
              <Grid size={{ sm: 12, md: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Аванс
                </Typography>
                <Typography variant="body1">{order.advance}</Typography>
              </Grid>

              <Grid size={{ sm: 12, md: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Скидка
                </Typography>
                <Typography variant="body1">{order.discount}</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>
              Фасады Фасады
            </Typography>
            <Box marginBottom={10} sx={{ maxWidth: "100%", overflowX: "auto" }}>
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
              sx={{ maxWidth: "100%", overflowX: "auto" }}
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
            </ToggleButtonGroup>
          </Box>
          <PrintButtons />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetailClient;
