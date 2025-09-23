import css from "@/app/(private)/kanban/order-list.module.scss";
import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { OrderType } from "@/app/(private)/kanban/actions";

export function Order({ id, workType, orderNumber }: OrderType) {
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
      <div>{orderNumber}</div>
      <div>{workType}</div>
    </div>
  );
}
