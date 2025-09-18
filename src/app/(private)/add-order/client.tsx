"use client";

import css from "./page.module.scss";
import Input from "@/components/input/input";
import IconButton from "@mui/material/IconButton";
import IconDelete from "@mui/icons-material/Delete";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { OrderModel } from "@/zod-models/order-model";
import { Button, Container, Typography } from "@mui/material";
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

  // @ts-ignore
    return (
    <FormProvider {...form}>
      <Container sx={{ mb: "100px" }}>
        <Typography variant="h1" component="h1">
          Добавление нового заказа
        </Typography>
        <Grid container spacing={5} sx={{ mt:"50px" }}>
          <Grid size={4}>
            <Input label="Номер заказа" name="orderNumber"  />
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
              <Grid
                  container
                  spacing={5}
                  key={field.id}
                  alignItems="center"
                  sx={{ mt: 5, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
              >
                  <Grid >
                      <Input label="Высота, мм" name={`items.${index}.height`} />
                  </Grid>
                  <Grid >
                      <Input label="Ширина, мм" name={`items.${index}.width`} />
                  </Grid>
                  <Grid >
                      <Input label="Толщина" name={`items.${index}.thickness`} />
                  </Grid>
                  <Grid >
                      <Select
                          label="Ручка интегрированная"
                          options={handles}
                          name={`items.${index}.handleId`}
                      />
                  </Grid>
                  <Grid >
                      <Input label="Радиус завала торца" name={`items.${index}.radius`} />
                  </Grid>
                  <Grid >
                      <Select
                          label="Фрезеровка"
                          options={millings}
                          name={`items.${index}.millingId`}
                      />
                  </Grid>
                  <Grid >
                      <Input label="Цвет" name={`items.${index}.color`} />
                  </Grid>
                  <Grid >
                      <Input label="Количество" name={`items.${index}.count`} />
                  </Grid>
                  <Grid >
                      <IconButton onClick={() => remove(index)}>
                          <IconDelete />
                      </IconButton>
                  </Grid>
              </Grid>
          ))}

          <Grid  sx={{ mt: 3 }}>
              <Button variant="contained" onClick={() => append(defaultFields)}>
                  Добавить фасад
              </Button>
          </Grid>


          <Grid container size={10} spacing={2} sx={{ mt: 5 }}>
          <Grid size={4}>
            <Input label="Аванс" name="advance" />
          </Grid>
          <Grid size={4}>
            <Input label="Скидка" name="discount" />
          </Grid>
        </Grid>

          <Grid container spacing={2} justifyContent="flex-end" className={css.footer}>
              <Grid>
                  <Button variant="outlined">Распечатать Excel</Button>
              </Grid>
              <Grid>
                  <Button onClick={onSubmit} variant="contained">
                      Добавить заказ
                  </Button>
              </Grid>
          </Grid>
      </Container>
    </FormProvider>
  );
}
