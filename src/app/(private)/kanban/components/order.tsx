import css from "@/app/(private)/kanban/order-list.module.scss";
import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { OrderType } from "@/app/(private)/kanban/actions";
import { Avatar, AvatarGroup } from "@mui/material";
import { formatDate } from "@/utils";

export function Order({ id, workType, orderNumber, endDate }: OrderType) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });
  const { push } = useRouter();

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={css.card}
      onClick={() => push(`?orderNumber=${orderNumber}`)}
    >
      <div className={css.deadline}>{formatDate(endDate)}</div>
      <div>
        <div className={css.orderNumber}>{orderNumber}</div>
        <div className={css.text}>{workType}</div>
      </div>
      <div className={css.footer}>
        <div>
          <div className={css.time}>2 дня</div>
        </div>
        <AvatarGroup>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24 }}
          />
          <Avatar
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
            sx={{ width: 24, height: 24 }}
          />
          <Avatar
            alt="Cindy Baker"
            src="/static/images/avatar/3.jpg"
            sx={{ width: 24, height: 24 }}
          />
        </AvatarGroup>
      </div>
    </div>
  );
}
