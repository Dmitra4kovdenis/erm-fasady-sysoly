import { Button, Grid } from "@mui/material";
import { Print, ContentCut, Edit } from "@mui/icons-material";
import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { useRouter } from "next/navigation";

interface PrintButtonsProps {
  order: NonNullable<OrderDetailType>;
}

export function PrintButtons({ order }: PrintButtonsProps) {
  const print = async () => {
    window.open(`/api/export-order-excel?id=${order.id}`, "_blank");
  };

  const cutting = async () => {
    const res = await fetch(`/api/get-cutting/?id=${order.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank"); // откроет PDF в новой вкладке
  };

  const router = useRouter();

  return (
    <Grid container spacing={1} justifyContent="flex-end" mt={2}>
      <Grid>
        <Button
          startIcon={<Print />}
          color="primary"
          onClick={print}
          variant="outlined"
        >
          Печать
        </Button>
      </Grid>
      <Grid>
        <Button
          startIcon={<Print />}
          color="primary"
          disabled
          onClick={cutting}
          variant="outlined"
        >
          Табель
        </Button>
      </Grid>
      <Grid>
        <Button
          startIcon={<ContentCut />}
          color="primary"
          onClick={cutting}
          variant="outlined"
        >
          Раскрой
        </Button>
      </Grid>
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
    </Grid>
  );
}
