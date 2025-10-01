import { OrderModelType } from "@/zod-models/order-model";

const millingCost = 1000;

export const calcFieldsByEditable = (values: OrderModelType) => {
  const { items } = values;

  // Общая площадь, м.кв
  const totalArea = items.reduce((acc, item) => {
    const area: number = +item.height * +item.width * +item.count * 0.01 * 0.01;
    return acc + area;
  }, 0);

  // Стоимость 1 м.кв.,руб.
  const { unitCost } = values;

  // стоимость прямых фасадов
  const costOfStraightFacades = +totalArea * +unitCost;

  // площадь фрезеровки
  const { millingArea } = values;

  // стоимость фрезеровки
  const costOfMilling = +millingArea * +millingCost;

  // интегрированная ручка, руб
  const { costOfHandle } = values;

  // итого
  const summPrice =
    +costOfStraightFacades +
    +costOfMilling +
    +costOfHandle +
    +values.costOtherServices;

  const totalPrice = +summPrice - +values.discount;

  const remainder = +totalPrice - +values.prepayment;

  const itemsCount = values.items.reduce((acc, item) => {
    return acc + +item.count;
  }, 0);

  return {
    totalArea,
    costOfStraightFacades,
    millingArea,
    costOfMilling,
    summPrice,
    totalPrice,
    itemsCount,
    remainder,
  };
};
