import {
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { updateStatus } from "@/actions/update-status";

interface StatusBarProps {
  statuses: {
    value: number;
    label: string;
  }[];
  order: NonNullable<OrderDetailType>;
  onClose: () => void;
}

export function StatusBar({ statuses, order, onClose }: StatusBarProps) {
  return (
    <>
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
          <ToggleButton size="small" key={status.value} value={status.value}>
            {status.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
}
