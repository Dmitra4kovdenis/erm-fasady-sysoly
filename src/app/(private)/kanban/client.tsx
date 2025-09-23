"use client";
import { useEffect, useState } from "react";
import css from "./order-list.module.scss";
import { useRouter } from "next/navigation";
import { getColumns, GetColumnsType } from "@/app/(private)/kanban/actions";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Column } from "@/app/(private)/kanban/components/column";
import { updateStatus } from "@/actions/update-status";

interface KanbanClientProps {
  columns: GetColumnsType;
}

function KanbanClient({ columns: columnsDefault }: KanbanClientProps) {
  const [columns, setColumns] = useState(columnsDefault);
  const { refresh } = useRouter();

  const fetchOrders = async () => {
    const result = await getColumns();
    setColumns(result);
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { over, active } = event;

    if (!over) return;
    await updateStatus({
      statusId: +over.id,
      id: +active.id,
    });
    refresh();
  };

  useEffect(() => {
    fetchOrders();
  }, [columnsDefault]);

  if (!columns) {
    return null;
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className={css.wrapper}>
        {columns.map((column) => (
          <Column {...column} key={column.slug} />
        ))}
      </div>
    </DndContext>
  );
}

export default KanbanClient;
