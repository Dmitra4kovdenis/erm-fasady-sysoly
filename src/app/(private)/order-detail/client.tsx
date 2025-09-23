"use client";

import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import {
  Box,
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { updateStatus } from "@/actions/update-status";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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
    <Dialog open onClose={onClose} maxWidth="lg">
      <Box>
        <DialogTitle id="alert-dialog-title">{order.orderNumber}</DialogTitle>
        <DialogContent>
          <ToggleButtonGroup
            color="primary"
            value={order.statusId}
            exclusive
            onChange={async (event, newAlignment) => {
              await updateStatus({
                statusId: +newAlignment,
                id: order.id,
              });
              onClose();
            }}
            aria-label="Platform"
          >
            {statuses.map((status) => {
              return (
                <ToggleButton key={status.value} value={status.value}>
                  {status.label}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default OrderDetailClient;
