"use client";

import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { PrintButtons } from "@/app/(private)/order-detail/components/print-buttons";
import { Info } from "@/app/(private)/order-detail/components/info";
import { StatusBar } from "@/app/(private)/order-detail/components/status-bar";
import { Facades } from "@/app/(private)/order-detail/components/facades";
import { Comments } from "@/app/(private)/order-detail/components/comments";

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
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Детали заказа №{order.orderNumber}</DialogTitle>
      <DialogContent>
        <Box position="relative">
          <Grid container spacing={2}>
            <Grid size={{ lg: 8 }}>
              <Info order={order} />
            </Grid>
          </Grid>
          <Facades order={order} />
          <Comments />
          <StatusBar statuses={statuses} order={order} onClose={onClose} />
          <PrintButtons />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetailClient;
