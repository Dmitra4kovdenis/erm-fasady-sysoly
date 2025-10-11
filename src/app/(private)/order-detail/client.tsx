"use client";

import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { PrintButtons } from "@/app/(private)/order-detail/components/print-buttons";
import { Info } from "@/app/(private)/order-detail/components/info";
import { StatusBar } from "@/app/(private)/order-detail/components/status-bar";
import { Facades } from "@/app/(private)/order-detail/components/facades";
import { useState } from "react";

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
  const [tabIndex, setTabIndex] = useState(0);
  const onClose = () => push(pathname);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Детали заказа №{order.orderNumber}</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="О заказе" />
            <Tab label="Чат" />
            <Tab label="Табель" />
          </Tabs>
        </Box>
        {tabIndex === 0 && (
          <>
            <Info order={order} />
            <Facades order={order} />
            <StatusBar statuses={statuses} order={order} onClose={onClose} />
          </>
        )}
        <PrintButtons order={order} />
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetailClient;
