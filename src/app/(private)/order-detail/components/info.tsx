import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
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
import { getOrderFields } from "@/utils/helper/orderFields";

interface InfoProps {
  order: NonNullable<OrderDetailType>;
}

export function Info({ order }: InfoProps) {
  const orderFields = getOrderFields(order);
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={3} mb={5}>
          <Grid size={8}>
            <Grid container={true} spacing={3} mb={5}>
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
          <Grid size={{ sm: 12, md: 12 }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Информация</Typography>
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
