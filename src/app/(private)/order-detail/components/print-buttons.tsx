import { Grid, IconButton } from "@mui/material";
import { Print, ContentCut } from "@mui/icons-material";
import { OrderDetailType } from "@/prisma-helpers/get-order-detail";

interface PrintButtonsProps {
  order: NonNullable<OrderDetailType>;
}

export function PrintButtons({ order }: PrintButtonsProps) {
  const print = async () => {
    window.open(`/api/export-order-excel?id=${order.id}`, "_blank");
  };

  return (
    <Grid container spacing={1} justifyContent="flex-end" mt={2}>
      <Grid>
        <IconButton
          color="primary"
          onClick={print}
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
      <Grid>
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
    </Grid>
  );
}
