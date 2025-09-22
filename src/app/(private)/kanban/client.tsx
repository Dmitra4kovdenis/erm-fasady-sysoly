"use client";
import { useEffect, useState } from "react";
import css from "./order-list.module.scss";
import type { OrderStatus, Order } from "@/prisma-helpers/prisma";
import { useRouter } from "next/navigation";

function KanbanClient() {
  const [columns, setColumns] = useState<OrderStatus[]>();
  const { push } = useRouter();

  const fetchOrders = async () => {
    const result = await fetch("/api/get-kanban-columns");
    const json = await result.json();
    setColumns(json);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!columns) {
    return null;
  }

  return (
    <div className={css.wrapper}>
      {columns.map((column) => (
        <div className={css.column} key={column.id}>
          <div className={css.header}>{column.title}</div>
          {(column as unknown as { orders: Order[] }).orders?.map((order) => (
            <div
              className={css.card}
              key={order.id}
              onClick={() => push(`?orderNumber=${order.orderNumber}`)}
            >
              <div>{order.orderNumber}</div>
              <div>{order.workType}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanClient;
