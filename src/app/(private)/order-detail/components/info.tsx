import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderDetailType } from "@/app/(private)/order-detail/actions";
import { getOrderFields } from "@/app/(private)/order-detail/components/order-fields";

interface InfoProps {
  order: NonNullable<OrderDetailType>;
}

export function Info({ order }: InfoProps) {
  const orderFields = getOrderFields(order);
  return (
    <>
      <Box>
        <Grid container spacing={3} mb={5}>
          <Grid size={8}>
            <Grid container spacing={3} mb={5}>
              <Grid size={{ sm: 12, md: 6 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Заказчик
                </Typography>
                <Typography variant="body1">
                  {order.customer.name} ({order.customer.companyName})
                </Typography>
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Вид работ
                </Typography>
                <Typography variant="body1">{order.workType}</Typography>
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
            </Grid>
          </Grid>
          <Box>
            <Accordion
              sx={{
                border: "solid 1px rgb(0,0,0,0.1)",
                boxShadow: "none",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span">Подробная информация</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3} mb={5}>
                  {orderFields.map((item, index) => {
                    return (
                      <Grid size={{ sm: 12, md: 3 }} key={index}>
                        <Typography variant="subtitle2" color="textSecondary">
                          {item.description}
                        </Typography>
                        <Typography variant="body1">{item.title}</Typography>
                      </Grid>
                    );
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
