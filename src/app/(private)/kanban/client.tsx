"use client";
import { useEffect, useState } from "react";
import css from "./order-list.module.scss";
import { useRouter } from "next/navigation";
import { getColumns, GetColumnsType } from "@/app/(private)/kanban/actions";

interface KanbanClientProps {
  columns: GetColumnsType;
}

function KanbanClient({ columns: columnsDefault }: KanbanClientProps) {
  const [columns, setColumns] = useState(columnsDefault);
  const { push } = useRouter();

  const fetchOrders = async () => {
    const result = await getColumns();
    setColumns(result);
  };

  useEffect(() => {
    fetchOrders();
  }, [columnsDefault]);

  if (!columns) {
    return null;
  }

  return (
    <div className={css.wrapper}>
      {columns.map((column) => (
        <div className={css.column} key={column.id}>
          <div className={css.header}>{column.title}</div>
          {column.orders?.map((order) => (
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
