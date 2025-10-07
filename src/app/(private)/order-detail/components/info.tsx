import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { Box, Typography, Grid } from "@mui/material";
import dayjs from "dayjs";

interface InfoProps {
  order: NonNullable<OrderDetailType>;
}

export function Info({ order }: InfoProps) {
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={3} mb={5}>
          <Grid size={{ sm: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Заказчик
            </Typography>
            <Typography variant="body1">{order.customer.name}</Typography>
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Вид работ
            </Typography>
            <Typography variant="body1">{order.workType}</Typography>
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Адрес доставки
            </Typography>
            <Typography variant="body1">{order.deliveryAddress}</Typography>
          </Grid>

          <Grid size={{ sm: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Дата приёмки
            </Typography>
            <Typography variant="body1">
              {dayjs(order.startDate).format("D MMMM YYYY")}
            </Typography>
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Дата выдачи
            </Typography>
            <Typography variant="body1">
              {dayjs(order.endDate).format("D MMMM YYYY")}
            </Typography>
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Аванс
            </Typography>
            <Typography variant="body1">{order.prepayment}</Typography>
          </Grid>

          <Grid size={{ sm: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Скидка
            </Typography>
            <Typography variant="body1">{order.discount}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
