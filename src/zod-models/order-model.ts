import * as z from "zod";

export const OrderModel = z.object({
  // Основная информация
  customerId: z.coerce.number().int().positive("ID заказчика обязательно"),
  deliveryAddress: z.string().min(1, "Поле обязательно"),
  workType: z.string().min(1, "Поле обязательно"),
  startDate: z.coerce.date("Некорректная дата"),
  endDate: z.coerce.date("Некорректная дата"),

  // Финансовые поля
  discount: z.coerce
    .number()
    .min(0, "Скидка не может быть отрицательной")
    .default(0),
  unitCost: z.coerce
    .number()
    .min(0, "Стоимость метра не может быть отрицательной")
    .default(0),

  costOfStraightFacades: z.coerce.number().min(0).default(0),
  millingArea: z.coerce.number().min(0).default(0),
  costOfMilling: z.coerce.number().min(0).default(0),
  handleLength: z.coerce.number().min(0).default(0),
  costOfHandle: z.coerce.number().min(0).default(0),
  costOtherServices: z.coerce.number().min(0).default(0),
  otherServices: z.string().default(""),

  prepayment: z.coerce.number().min(0).default(0),

  // Фасады
  items: z
    .array(
      z.object({
        id: z.number().int().optional(),
        height: z.coerce
          .number()
          .positive("Высота должна быть положительной")
          .min(0.1, "Высота должна быть положительной"),
        width: z.coerce
          .number()
          .positive("Ширина должна быть положительной")
          .min(0.1, "Ширина должна быть положительной"),
        thickness: z.coerce
          .number()
          .positive("Толщина должна быть положительной")
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
    )
    .min(1, "Должен быть хотя бы один фасад"),
});

export type OrderModelType = z.infer<typeof OrderModel>;

// Дополнительно: схема для обновления заказа (все поля опциональны)
export const OrderUpdateModel = OrderModel.partial();

// Схема для валидации при создании (обязательные поля)
export const OrderCreateModel = OrderModel.omit({
  // orderNumber: true, // Генерируется автоматически
}).extend({});

export type OrderCreateModelType = z.infer<typeof OrderCreateModel>;

export const orderFields = {
  // Основная информация
  customerId: "customerId",
  deliveryAddress: "deliveryAddress",
  workType: "workType",
  startDate: "startDate",
  endDate: "endDate",

  discount: "discount",
  unitCost: "unitCost",

  // Площади и расчеты
  allFacadesArea: "allFacadesArea",
  totalArea: "totalArea",
  costOfStraightFacades: "costOfStraightFacades",
  millingArea: "millingArea",
  costOfMilling: "costOfMilling",
  handleLength: "handleLength",
  costOfHandle: "costOfHandle",
  costOtherServices: "costOtherServices",
  otherServices: "otherServices",
  items: "items",
  prepayment: "prepayment",
} as const;
