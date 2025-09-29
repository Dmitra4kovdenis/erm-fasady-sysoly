import css from "@/app/(private)/kanban/order-list.module.scss";
import { useDroppable } from "@dnd-kit/core";
import { Order } from "@/app/(private)/kanban/components/order";
import cn from "classnames";
import type { OrdersType } from "@/app/(private)/kanban/page";

interface ColumnType {
  id: number;
  ordersObj: Record<number, OrdersType[0]>;
  orders: number[];
  title: string;
}

export function Column({ id, ordersObj, orders, title }: ColumnType) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      className={cn(css.column, isOver && css.columnActive)}
      key={id}
      ref={setNodeRef}
    >
      <div className={css.header}>{title}</div>
      {orders?.map((order) => (
        <Order key={order} {...ordersObj[order]} />
      ))}
    </div>
  );
}
