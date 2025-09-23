"use client";

import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { Box, Button, ButtonGroup } from "@mui/material";
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
    <Dialog open onClose={onClose}>
      <Box>
        <DialogTitle id="alert-dialog-title">{order.orderNumber}</DialogTitle>
        <DialogContent>
          <ButtonGroup size="small" aria-label="Small button group">
            {statuses.map((status) => {
              return (
                <Button
                  variant="contained"
                  color={order.statusId === status.value ? "primary" : "info"}
                  key={status.value}
                  onClick={async () => {
                    await updateStatus({
                      statusId: status.value,
                      id: order.id,
                    });
                    onClose();
                  }}
                >
                  {status.label}
                </Button>
              );
            })}
          </ButtonGroup>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default OrderDetailClient;
