"use client";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from "@mui/material";
import { PrintButtons } from "@/containers/order-detail/components/print-buttons";
import { Info } from "@/containers/order-detail/components/info";
import { Facades } from "@/containers/order-detail/components/facades";
import { useEffect, useState } from "react";
import { Chat } from "./chat/chat";
import { Timeline } from "@/containers/order-detail/timeline/timeline";
import {
  getOrderDetail,
  OrderDetailType,
} from "@/containers/order-detail/actions";
import { Loader } from "@/components/loader";

function OrderDetailClient({
  id,
  closeModal,
}: {
  id: number;
  closeModal: () => void;
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: any, newValue: number) => {
    setTabIndex(newValue);
  };

  const [order, setOrder] = useState<OrderDetailType | null>(null);

  useEffect(() => {
    getOrderDetail(id)
      .then((res) => setOrder(res))
      .catch();
  }, [id]);

  if (!order) {
    return (
      <Dialog open onClose={closeModal} maxWidth="lg" fullWidth>
        <Loader />
      </Dialog>
    );
  }

  return (
    <Dialog open onClose={closeModal} maxWidth="lg" fullWidth>
      <DialogTitle>Детали заказа №{order.orderNumber}</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="О заказе" />
            <Tab label="Чат" />
            <Tab label="Табель" />
          </Tabs>
        </Box>
      </DialogContent>
      {tabIndex === 0 && (
        <>
          <DialogContent>
            <Info order={order} />
            <Facades order={order} />
          </DialogContent>
          <DialogActions>
            <PrintButtons order={order} />
          </DialogActions>
        </>
      )}
      {tabIndex === 1 && <Chat order={order} />}
      {tabIndex === 2 && <Timeline order={order} />}
    </Dialog>
  );
}

export default OrderDetailClient;
