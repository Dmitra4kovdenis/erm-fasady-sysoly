import css from "./order-list.module.scss";
import { OrdersType } from "@/prisma-helpers/get-orders";

interface OrderListProps {
  orders: OrdersType;
}

function OrderListClient({ orders }: OrderListProps) {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Список заказов</h1>
      <div>
        {orders.map((order) => (
          <div className={css.line} key={order.orderNumber}>
            <div>{order.orderNumber}</div>
            <div>{order.status}</div>
            <div>{order.createdAt.toDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderListClient;
