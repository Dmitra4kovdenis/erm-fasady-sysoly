"use client";
import { useEffect, useState } from "react";
import css from "./order-list.module.scss";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Column } from "@/app/(private)/kanban/components/column";
import { updateStatus } from "@/actions/update-status";
import type { OrdersType, StatusesType } from "@/app/(private)/kanban/page";
import { Box } from "@mui/material";

interface KanbanClientProps {
  ordersObj: Record<number, OrdersType[0]>;
  statusesObj: Record<number, StatusesType[0]>;
  columns: Record<number, number[]>;
}

function KanbanClient({
  ordersObj,
  columns: columnsDefault,
  statusesObj,
}: KanbanClientProps) {
  const [columns, setColumns] = useState(columnsDefault);

  useEffect(() => {
    setColumns(columnsDefault);
  }, [columnsDefault]);

  const onDragEnd = async (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const orderId = +active.id;
    const newStatusId = +over.id;

    // костыль, чтобы карточка не пропадала при не перемещении
    let a = true;

    const _columns = Object.entries(columns).reduce(
      (acc, [statusId, orderIds]) => {
        if (orderIds.includes(orderId)) {
          acc[+statusId] = orderIds.filter((item) => item !== orderId);
          a = !a;
        } else if (newStatusId === +statusId) {
          acc[+statusId] = orderIds.concat(orderId);
          a = !a;
        } else {
          acc[+statusId] = orderIds;
        }

        return acc;
      },
      {} as Record<number, number[]>,
    );
    if (a) {
      setColumns(_columns);
      await updateStatus({
        statusId: newStatusId,
        id: orderId,
        revalidate: false,
      });
    }
  };

  if (!columns) {
    return null;
  }

  return (
    <Box overflow="auto" width={"100%"}>
      <DndContext onDragEnd={onDragEnd}>
        <div className={css.wrapper}>
          {Object.entries(columns).map(([columnId, orders]) => (
            <Column
              title={statusesObj[+columnId].title}
              id={+columnId}
              orders={orders}
              ordersObj={ordersObj}
              key={columnId}
            />
          ))}
        </div>
      </DndContext>
    </Box>
  );
}

export default KanbanClient;
