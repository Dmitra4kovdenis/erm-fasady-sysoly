import { OrderModelType } from "@/zod-models/order-model";

const millingCost = 1000;

export const calcFieldsByEditable = (values: OrderModelType) => {
  const { items } = values;

  // Общая площадь, м.кв
  const totalArea = items.reduce((acc, item) => {
    const height = item.height ?? 0;
    const width = item.width ?? 0;
    const count = item.count ?? 0;

    const area: number = height * width * count * 0.01 * 0.01;
    return acc + area;
  }, 0);

  // Стоимость 1 м.кв.,руб.
  const unitCost = values.unitCost ?? 0;

  // стоимость прямых фасадов
  const costOfStraightFacades = totalArea * unitCost;

  // площадь фрезеровки
  const millingArea = values.millingArea ?? 0;

  // стоимость фрезеровки
  const costOfMilling = millingArea * millingCost;

  // интегрированная ручка, руб
  const costOfHandle = values.costOfHandle ?? 0;

  const costOtherServices = values.costOtherServices ?? 0;

  // итого
  const summPrice =
    costOfStraightFacades + costOfMilling + costOfHandle + costOtherServices;

  const discount = values.discount ?? 0;

  const totalPrice = summPrice - discount;

  const prepayment = values.prepayment ?? 0;

  const remainder = totalPrice - prepayment;

  const itemsCount = values.items.reduce((acc, item) => {
    return acc + (item.count ?? 0);
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
