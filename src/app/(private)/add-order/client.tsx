"use client";

import css from "./page.module.scss";
import Input from "@/components/input/input";
import IconButton from "@mui/material/IconButton";
import IconDelete from "@mui/icons-material/Delete";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { OrderModel } from "@/zod-models/order-model";
import { Button } from "@mui/material";
import Select, { SelectOption } from "@/components/select/select";
import Grid from "@mui/material/Grid";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultFields = {
  height: 0,
  width: 0,
  thickness: 0,
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
  const form = useForm({
    defaultValues: {
      items: [defaultFields],
      customerId: 0,
    },
    mode: "onChange",
    resolver: zodResolver(OrderModel),
  });

  const { control, handleSubmit } = form;

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
            <Input label="Номер заказа" name="orderNumber" />
          </Grid>
          <Grid size={8}>
            <Select label="Заказчик" options={customers} name={"customerId"} />
          </Grid>
          <Grid size={4}>
            <Input label="Дата приемки" name="startDate" />
          </Grid>
          <Grid size={4}>
            <Input label="Дата выдачи" name="endDate" />
          </Grid>
          <Grid size={10}>
            <Input
              multiline
              rows={2}
              label="Адрес доставки"
              name="deliveryAddress"
            />
          </Grid>
          <Grid size={10}>
            <Input multiline rows={2} label="Вид работ" name="workType" />
          </Grid>
        </Grid>

        {fields.map((field, index) => (
          <div className={css.block} key={field.id}>
            <div className={css.row}>
              <Input
                className={css.col_1}
                label="Высота, мм"
                name={`items.${index}.height`}
              />
              <Input
                className={css.col_1}
                label="Ширина, мм"
                name={`items.${index}.width`}
              />
              <Input
                className={css.col_1}
                label="Толщина"
                name={`items.${index}.thickness`}
              />
              <Select
                className={css.col_1}
                label="Ручка интегрированная"
                options={handles}
                name={`items.${index}.handleId`}
              />
              <Input
                className={css.col_1}
                label="Радиус завала торца"
                name={`items.${index}.radius`}
              />
              <Select
                className={css.col_1}
                label="Фрезеровка"
                options={millings}
                name={`items.${index}.millingId`}
              />
              <Input
                className={css.col_1}
                label="Цвет"
                name={`items.${index}.color`}
              />
              <Input
                className={css.col_1}
                label="Количество"
                name={`items.${index}.count`}
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

        <Grid container size={10} spacing={2}>
          <Grid size={4}>
            <Input label="Аванс" name="advance" />
          </Grid>
          <Grid size={4}>
            <Input label="Скидка" name="discount" />
          </Grid>
        </Grid>

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
