import { OrderDetailType } from "@/containers/order-detail/actions";

export const getOrderFields = (order: NonNullable<OrderDetailType>) => {
  return [
    { title: order.deliveryAddress, description: "Адрес доставки заказа" },
    {
      title: order.totalArea,
      description: "Общая площадь фасадов (суммируется по элементам)",
    },
    { title: order.unitCost, description: "Стоимость квадратного метра" },
    {
      title: order.costOfStraightFacades,
      description: "Стоимость прямых фасадов",
    },
    { title: order.millingArea, description: "Площадь фрезеровки" },
    { title: order.costOfMilling, description: "Стоимость фрезеровки" },
    {
      title: order.handleLength,
      description: "Общая длина интегрированной ручки (в метрах)",
    },
    {
      title: order.costOfHandle,
      description: "Стоимость интегрированной ручки",
    },
    { title: order.costOtherServices, description: "Стоимость прочих услуг" },
    { title: order.otherServices, description: "Описание прочих услуг" },
    { title: order.summPrice, description: "Итоговая цена без скидки" },
    { title: order.discount, description: "Размер скидки" },
    { title: order.totalPrice, description: "Общая стоимость с учетом скидки" },
    { title: order.prepayment, description: "Авансовый платеж" },
    { title: order.remainder, description: "Оставшаяся сумма к оплате" },
    { title: order.itemsCount, description: "Количество фасадов в заказе" },
    {
      title: order.statusId,
      description: "ID статуса заказа (связь с таблицей OrderStatus)",
    },
  ];
};
