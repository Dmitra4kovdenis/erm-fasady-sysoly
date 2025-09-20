"use client";

import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface OrderDetailClientProps {
  order: NonNullable<OrderDetailType>;
  statuses: {
    value: number;
    label: string;
  }[];
}

function OrderDetailClient({ statuses, order }: OrderDetailClientProps) {
  const { push } = useRouter();

  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        right: "0",
        top: "0",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
        }}
      >
        {order.orderNumber}
        <div>
          {statuses.map((status) => {
            return (
              <Button
                variant="contained"
                color={order.statusId === status.value ? "primary" : "info"}
                key={status.value}
                onClick={async () => {
                  await fetch("/api/update-status", {
                    method: "POST",
                    body: JSON.stringify({
                      statusId: status.value,
                      id: order.id,
                    }),
                  });
                  push("/order-list/");
                }}
              >
                {status.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailClient;
