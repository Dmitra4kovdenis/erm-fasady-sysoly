import css from "@/app/(private)/kanban/order-list.module.scss";
import { useDraggable } from "@dnd-kit/core";
import { formatDate } from "@/utils";
import { OrdersType } from "@/app/(private)/kanban/page";
import Link from "next/link";

export function Order({ id, workType, orderNumber, endDate }: OrdersType[0]) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Link className={css.card} href={`?orderNumber=${id}`}>
        <div
          className={css.deadline}
        >{`${formatDate(endDate)} - ${formatDate(endDate)}`}</div>
        <div>
          <div className={css.orderNumber}>{orderNumber}</div>
          <div className={css.text}>{workType}</div>
        </div>
        <div className={css.footer}>
          {/*<AvatarGroup>*/}
          {/*  {workers?.map((item) => (*/}
          {/*    <Avatar*/}
          {/*      key={item.id}*/}
          {/*      src="/static/images/avatar/1.jpg"*/}
          {/*      sx={{ width: 40, height: 40 }}*/}
          {/*    >*/}
          {/*      {item.name.slice(0, 2)}*/}
          {/*    </Avatar>*/}
          {/*  ))}*/}
          {/*</AvatarGroup>*/}
        </div>
      </Link>
    </div>
  );
}
