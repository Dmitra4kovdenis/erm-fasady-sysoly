"use client";

import css from "./page.module.scss";
import Button from "@/components/button/button";
import Input from "@/app/login/components/input/input";
import IconButton from "@/components/icon-button/icon-button";
import { IconTrash } from "@/icons";
import { useFieldArray, useForm } from "react-hook-form";
import { OrderModelType } from "@/models/order-model";

const defaultFields = {
  height: 0,
  width: 0,
  thinkness: 0,
  handleId: 0,
  radius: 0,
  millingId: 0,
  color: "",
  count: 1,
  orderId: 0,
};

export default function AddOrderPage() {
  const { control, register, handleSubmit } = useForm<OrderModelType>({
    defaultValues: {
      items: [defaultFields],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = handleSubmit(async (values) => {
    await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  });

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Добавление нового заказа</h1>
      <div className={css.row}>
        <Input
          className={css.col_1}
          label="Номер заказа"
          {...register("orderNumber")}
        />
        <Input
          className={css.col_2}
          label="Заказчик"
          {...register("customerId")}
        />
        <Input className={css.col_1} label="Телефон заказчика" />
        <Input className={css.col_1} label="Дата приемки" />
        <Input className={css.col_1} label="Дата выдачи" />
        <Input className={css.col_3} label="Адрес доставки" />
        <Input className={css.col_3} label="Вид работ" />
      </div>

      {fields.map((field, index) => (
        <div className={css.block} key={field.id}>
          <div className={css.row}>
            <Input
              className={css.col_1}
              label="Высота, мм"
              {...register(`items.${index}.height`)}
            />
            <Input
              className={css.col_1}
              label="Ширина, мм"
              {...register(`items.${index}.width`)}
            />
            <Input
              className={css.col_1}
              label="Толщина"
              {...register(`items.${index}.thinkness`)}
            />
            <Input
              className={css.col_1}
              label="Ручка интегрированная"
              {...register(`items.${index}.handleId`)}
            />
            <Input
              className={css.col_1}
              label="Радиус завала торца"
              {...register(`items.${index}.radius`)}
            />
            <Input
              className={css.col_1}
              label="Фрезеровка"
              {...register(`items.${index}.millingId`)}
            />
            <Input
              className={css.col_1}
              label="Цвет"
              {...register(`items.${index}.color`)}
            />
            <Input
              className={css.col_1}
              label="Количество"
              {...register(`items.${index}.count`)}
            />
          </div>
          <IconButton
            className={css.remove}
            icon={<IconTrash />}
            onClick={() => remove(index)}
          />
        </div>
      ))}

      <Button
        className={css.buttonAdd}
        variant="neutral"
        onClick={() => append(defaultFields)}
      >
        Добавить фасад
      </Button>

      <div className={css.row}>
        <Input className={css.col_1} label="Аванс" />
        <Input className={css.col_1} label="Скидка" />
        <Input className={css.col_1} label="Стоимость 1 кв.м" />
      </div>

      <div className={css.footer}>
        <div>
          <Button variant="neutral">Распечатать Excel</Button>
        </div>
        <Button onClick={onSubmit}>Добавить заказ</Button>
      </div>
    </div>
  );
}
