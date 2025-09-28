import { Avatar, Button, Grid, Typography } from "@mui/material";
import { removeWorker, setWorker } from "@/app/(private)/order-detail/actions";
import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { UserData } from "@/prisma-helpers/get-user-data";

interface ProfilesProps {
  order: NonNullable<OrderDetailType>;
  userData: UserData;
}

export function Profiles({ order, userData }: ProfilesProps) {
  const isAdmin = !order.worker;

  if (!order.worker)
    return (
      <>
        <Typography variant="h6">Не назначена</Typography>

        {userData.worker && !isAdmin && (
          <Button
            color="primary"
            variant={"contained"}
            onClick={async () => {
              await setWorker(order.id, userData.worker?.id as number);
            }}
          >
            Взять в работу
          </Button>
        )}
      </>
    );

  // если я активный работник над заказом
  const isMyOrder = userData.worker && order.worker.id === userData.worker?.id;

  return (
    <>
      <Typography variant="h6">В работе</Typography>
      <Grid container spacing={2} marginTop={2}>
        <Grid>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Grid>
        <Grid>
          <Typography variant="body1" sx={{ lineHeight: 1 }}>
            {order.worker.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ lineHeight: 1 }}
            color={"textSecondary"}
          >
            {order.worker.typeId}
          </Typography>
        </Grid>
      </Grid>
      {isAdmin &&
        (isMyOrder ? (
          <Button
            size="small"
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={async () => {
              await removeWorker(order.id, userData.id);
            }}
          >
            Закончить работу
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={async () => {
              await setWorker(order.id, userData.id);
            }}
          >
            Взять в работу
          </Button>
        ))}
    </>
  );
}
