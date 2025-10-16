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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PrintButtons } from "@/app/(private)/order-detail/components/print-buttons";
import { Info } from "@/app/(private)/order-detail/components/info";
import { Facades } from "@/app/(private)/order-detail/components/facades";
import { useEffect, useState } from "react";
import { Chat } from "./chat/chat";
import { Timeline } from "@/app/(private)/order-detail/timeline/timeline";
import {
  getOrderDetail,
  OrderDetailType,
} from "@/app/(private)/order-detail/actions";
import { Loading } from "@/app/(private)/order-detail/loading";

function OrderDetailClient() {
  const { push } = useRouter();
  const pathname = usePathname();
  const [tabIndex, setTabIndex] = useState(0);
  const onClose = () => push(pathname);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const id = orderNumber ? +orderNumber : -1;

  const [order, setOrder] = useState<OrderDetailType | null>(null);

  useEffect(() => {
    getOrderDetail(id)
      .then((res) => setOrder(res))
      .catch();
  }, [id]);

  if (!order) {
    return (
      <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
        <Loading />
      </Dialog>
    );
  }

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
