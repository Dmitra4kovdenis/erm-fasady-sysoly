import { Button, Grid } from "@mui/material";
import { Print, ContentCut, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useUserData } from "@/prisma-helpers/user-data/user-data.provider";
import { OrderDetailType } from "@/containers/order-detail/actions";

interface PrintButtonsProps {
  order: NonNullable<OrderDetailType>;
}

export function PrintButtons({ order }: PrintButtonsProps) {
  const print = async () => {
    window.open(`/api/export-order-blank?id=${order.id}`, "_blank");
  };

  const printWork = async () => {
    window.open(`/api/export-order-work?id=${order.id}`, "_blank");
  };

  const cutting = async () => {
    const res = await fetch(`/api/get-cutting/?id=${order.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank"); // откроет PDF в новой вкладке
  };

  const router = useRouter();

  const { role } = useUserData();

  return (
    <Grid container spacing={1} justifyContent="flex-end" mt={2}>
      <Grid>
        <Button
          startIcon={<Print />}
          color="primary"
          onClick={print}
          variant="outlined"
        >
          Распечатать заказ
        </Button>
      </Grid>
      <Grid>
        <Button
          startIcon={<Print />}
          color="primary"
          onClick={printWork}
          variant="outlined"
        >
          Распечатать табель
        </Button>
      </Grid>
      <Grid>
        <Button
          startIcon={<ContentCut />}
          color="primary"
          onClick={cutting}
          variant="outlined"
        >
          Распечатать раскрой
        </Button>
      </Grid>
      {role === "admin" && (
        <Grid>
          <Button
            startIcon={<Edit />}
            color="primary"
            onClick={() => router.push(`/add-order?editId=${order.id}`)}
            variant="contained"
          >
            Редактировать
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
