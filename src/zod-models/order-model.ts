import * as z from "zod";

export const OrderModel = z.object({
  orderNumber: z.string().min(1, "Поле обязательно"),
  status: z.string().default("new"),
  customerId: z.coerce.number().int(),
  deliveryAddress: z.string().min(1, "Поле обязательно"),
  workType: z.string().min(1, "Поле обязательно"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  advance: z.coerce.number().default(0),
  discount: z.coerce.number().default(0),
  items: z.array(
    z.object({
      id: z.number().int().optional(),
      height: z.coerce
        .number()
        .positive()
        .min(0.1, "Высота должна быть положительной"),
      width: z.coerce
        .number()
        .positive()
        .min(0.1, "Ширина должна быть положительной"),
      thickness: z.coerce
        .number()
        .positive()
        .min(0.1, "Толщина должна быть положительной"),
      handleId: z.coerce.number("ID ручки обязательно"),
      radius: z.coerce.number().min(0).default(0),
      millingId: z.coerce.number("ID фрезеровки обязательно"),
      color: z.string().min(1, "Цвет обязателен"),
      count: z.coerce
        .number()
        .int()
        .positive("Количество должно быть положительным")
        .min(1),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    }),
  ),
});

export type OrderModelType = z.infer<typeof OrderModel>;
