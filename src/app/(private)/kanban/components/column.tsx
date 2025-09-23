import css from "@/app/(private)/kanban/order-list.module.scss";
import { useDroppable } from "@dnd-kit/core";
import { Order } from "@/app/(private)/kanban/components/order";
import { ColumnType } from "@/app/(private)/kanban/actions";
import cn from "classnames";

export function Column({ id, title, orders }: ColumnType) {
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
        <Order key={order.id} {...order} />
      ))}
    </div>
  );
}
