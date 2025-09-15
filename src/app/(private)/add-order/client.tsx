"use client";

import css from "./page.module.scss";
import Input from "@/components/input/input";
import IconButton from "@mui/material/IconButton";
import IconDelete from "@mui/icons-material/Delete";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { OrderModelType } from "@/zod-models/order-model";
import { Button } from "@mui/material";
import Select, { SelectOption } from "@/components/select/select";
import Grid from "@mui/material/Grid";

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

interface AddOrderClientProps {
  customers: SelectOption[];
  handles: SelectOption[];
  millings: SelectOption[];
}

export default function AddOrderClient({
  customers,
  handles,
  millings,
}: AddOrderClientProps) {
  const form = useForm<OrderModelType>({
    defaultValues: {
      items: [defaultFields],
      customerId: 0,
    },
  });

  const { control, register, handleSubmit } = form;

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
    <FormProvider {...form}>
      <div className={css.wrapper}>
        <h1 className={css.title}>Добавление нового заказа</h1>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Input label="Номер заказа" {...register("orderNumber")} />
          </Grid>
          <Grid size={8}>
            <Select
              label="Заказчик"
              options={customers}
              {...register("customerId")}
            />
          </Grid>
          <Grid size={4}>
            <Input label="Телефон заказчика" />
          </Grid>
          <Grid size={4}>
            <Input label="Дата приемки" />
          </Grid>
          <Grid size={4}>
            <Input label="Дата выдачи" />
          </Grid>
          <Grid size={12}>
            <Input label="Адрес доставки" />
          </Grid>
          <Grid size={12}>
            <Input label="Вид работ" />
          </Grid>
        </Grid>

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
              <Select
                className={css.col_1}
                label="Ручка интегрированная"
                options={handles}
                {...register(`items.${index}.handleId`)}
              />
              <Input
                className={css.col_1}
                label="Радиус завала торца"
                {...register(`items.${index}.radius`)}
              />
              <Select
                className={css.col_1}
                label="Фрезеровка"
                options={millings}
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
            <div className={css.remove}>
              <IconButton onClick={() => remove(index)}>
                <IconDelete />
              </IconButton>
            </div>
          </div>
        ))}

        <div className={css.buttonAdd}>
          <Button variant="contained" onClick={() => append(defaultFields)}>
            Добавить фасад
          </Button>
        </div>

        <div className={css.row}>
          <Input className={css.col_1} label="Аванс" />
          <Input className={css.col_1} label="Скидка" />
          <Input className={css.col_1} label="Стоимость 1 кв.м" />
        </div>

        <div className={css.footer}>
          <div>
            <Button variant="outlined">Распечатать Excel</Button>
          </div>
          <Button onClick={onSubmit} variant="contained">
            Добавить заказ
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
