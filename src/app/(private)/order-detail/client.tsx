"use client";

import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import {
  Box,
  Dialog,
  DialogActions,
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
import { Chat } from "./chat/chat";
import { UserData } from "@/prisma-helpers/get-user-data";
import { Timeline } from "@/app/(private)/order-detail/timeline/timeline";
import {
  CommentType,
  OrderTimelinesType,
  Workers,
} from "@/app/(private)/order-detail/server";

interface OrderDetailClientProps {
  order: NonNullable<OrderDetailType>;
  statuses: {
    value: number;
    label: string;
  }[];
  comments: CommentType;
  userData: UserData;
  timelines: OrderTimelinesType;
  workers: Workers;
}

function OrderDetailClient({
  statuses,
  order,
  comments,
  userData,
  timelines,
  workers,
}: OrderDetailClientProps) {
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
      </DialogContent>
      {tabIndex === 0 && (
        <>
          <DialogContent>
            <Info order={order} />
            <Facades order={order} />
            <StatusBar statuses={statuses} order={order} onClose={onClose} />
          </DialogContent>
          <DialogActions>
            <PrintButtons order={order} />
          </DialogActions>
        </>
      )}
      {tabIndex === 1 && (
        <Chat comments={comments} order={order} userData={userData} />
      )}
      {tabIndex === 2 && (
        <Timeline
          userData={userData}
          order={order}
          timelines={timelines}
          workers={workers}
        />
      )}
    </Dialog>
  );
}

export default OrderDetailClient;
