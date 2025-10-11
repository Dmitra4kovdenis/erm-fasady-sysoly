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
import { Chat } from "./chat/chat";
import { CommentType } from "@/app/(private)/comment/comment";
import { UserData } from "@/prisma-helpers/get-user-data";
import { Timeline } from "@/app/(private)/order-detail/timeline/timeline";
import {
  OrderTimelinesType,
  Workers,
} from "@/app/(private)/order-timeline/order-timeline";

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
      <DialogContent
        sx={{ minHeight: "700px", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}>
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
        <Box marginTop={"auto"}>
          <PrintButtons order={order} />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetailClient;
