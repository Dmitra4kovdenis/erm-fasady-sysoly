"use client";

import css from "./page.module.scss";
import Input from "@/components/input/input";
import IconButton from "@mui/material/IconButton";
import IconDelete from "@mui/icons-material/Delete";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { OrderModel } from "@/zod-models/order-model";
import { Button, Typography } from "@mui/material";
import Select, { SelectOption } from "@/components/select/select";
import Grid from "@mui/material/Grid";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "@/components/date-picker/date-picker";
import { createOrder } from "./actions";
import { radiusOptions } from "@/app/(private)/add-order/constants";
import { FieldFacadeArea } from "@/app/(private)/add-order/components/field-facade-area";
import { useRouter } from "next/navigation";
import { TableResults } from "@/app/(private)/add-order/components/table-results";
import { PageContainer } from "@/components/page-container/page-container";

const defaultFields = {
  height: "",
  width: "",
  thickness: "",
  handleId: "",
  radius: "",
  millingId: "",
  color: "",
  count: "",
  orderId: "",
  area: "",
};

interface AddOrderClientProps {
  customers: SelectOption[];
  handles: SelectOption[];
  millings: SelectOption[];
}

export function AddOrderClient({
  customers,
  handles,
  millings,
}: AddOrderClientProps) {
  const form = useForm({
    defaultValues: {
      items: [defaultFields],
    },
    mode: "onChange",
    resolver: zodResolver(OrderModel),
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const { push } = useRouter();

  const onSubmit = handleSubmit(async (values) => {
    await createOrder(values);
    push("/order-list");
  });

  return (
    <PageContainer size="m">
      <FormProvider {...form}>
        <Typography variant="h1" component="h1">
          Добавление нового заказа
        </Typography>
        <Grid container spacing={2} sx={{ mt: "50px" }}>
          <Grid size={{ xs: 12, lg: 12 }}>
            <Select label="Заказчик" options={customers} name={"customerId"} />
          </Grid>

          <Grid size={{ lg: 3, xs: 12 }}>
            <DatePicker label="Дата приемки" name="startDate" />
          </Grid>

          <Grid size={{ lg: 3, xs: 12 }}>
            <DatePicker label="Дата выдачи" name="endDate" />
          </Grid>

          <Grid size={{ lg: 6, xs: 12 }}>
            <Input multiline label="Адрес доставки" name="deliveryAddress" />
          </Grid>

          <Grid size={{ lg: 12, xs: 12 }}>
            <Input multiline label="Вид работ" name="workType" />
          </Grid>
        </Grid>

        {fields.map((field, index) => (
          <Grid
            container
            spacing={2}
            key={field.id}
            alignItems="center"
            sx={{
              mt: 5,
              background: "#fafafa",
              pt: { lg: 2, xs: 10 },
              pl: { lg: 8, xs: 2 },
              pr: { lg: 12, xs: 2 },
              pb: { lg: 2, xs: 10 },
              border: "1px solid #ddd",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <div className={css.number}>{index + 1}</div>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Input label="Высота, мм" name={`items.${index}.height`} />
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Input label="Ширина, мм" name={`items.${index}.width`} />
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Input label="Толщина" name={`items.${index}.thickness`} />
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Select
                label="Ручка интегрированная"
                options={handles}
                name={`items.${index}.handleId`}
              />
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Select
                label="Радиус завала торца"
                name={`items.${index}.radius`}
                options={radiusOptions}
              />
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Select
                label="Фрезеровка"
                options={millings}
                name={`items.${index}.millingId`}
              />
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Input label="Цвет" name={`items.${index}.color`} />
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Input label="Количество" name={`items.${index}.count`} />
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              <FieldFacadeArea index={index} />
            </Grid>
            <IconButton onClick={() => remove(index)} className={css.remove}>
              <IconDelete />
            </IconButton>
          </Grid>
        ))}

        <Grid sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => append(defaultFields)}
          >
            Добавить фасад
          </Button>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input label="Стоимость 1 м.кв.,руб." name="facadePrice" />
          </Grid>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input label="Интегрированная ручка, руб." name="handlePrice" />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input label="Прочие услуги, руб" name="otherServicePrice" />
          </Grid>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input label="Аванс" name="advance" />
          </Grid>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input label="Скидка" name="discount" />
          </Grid>
        </Grid>

        <TableResults />

        <Button
          sx={{ marginTop: 6 }}
          onClick={onSubmit}
          variant="contained"
          size="large"
        >
          Добавить заказ
        </Button>
      </FormProvider>
    </PageContainer>
  );
}
