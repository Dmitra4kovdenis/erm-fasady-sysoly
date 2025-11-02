"use client";

import css from "./page.module.scss";
import Input from "@/components/input/input";
import IconButton from "@mui/material/IconButton";
import IconDelete from "@mui/icons-material/Delete";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import {
  orderFields,
  OrderModel,
  OrderModelType,
} from "@/zod-models/order-model";
import { Button, Typography } from "@mui/material";
import Select, { SelectOption } from "@/components/select/select";
import Grid from "@mui/material/Grid";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "@/components/date-picker/date-picker";
import { createOrder, updateOrder } from "./actions";
import {
  colorTypes,
  radiusOptions,
  thicknessOptions,
} from "@/app/(private)/add-order/constants";
import { FieldFacadeArea } from "@/app/(private)/add-order/components/field-facade-area";
import { useRouter } from "next/navigation";
import { TableResults } from "@/app/(private)/add-order/components/table-results";
import { PageContainer } from "@/components/page-container/page-container";

const item = {
  height: undefined,
  width: undefined,
  thickness: undefined,
  handleId: undefined,
  radius: undefined,
  millingId: undefined,
  color: undefined,
  count: undefined,
  orderId: undefined,
  area: undefined,
};

interface AddOrderClientProps {
  customers: SelectOption[];
  handles: SelectOption[];
  millings: SelectOption[];
  defaultValues: OrderModelType | null;
  editId?: number;
}

export function AddOrderClient({
  customers,
  handles,
  millings,
  defaultValues,
  editId,
}: AddOrderClientProps) {
  const _defaultValues = defaultValues || { items: [item] };

  const isEdit = !!editId;

  const form = useForm({
    defaultValues: _defaultValues,
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
    let result;
    if (editId) {
      result = await updateOrder(editId, values);
    } else {
      result = await createOrder(values);
    }

    push("/order-list?orderId=" + result.id);
  });

  return (
    <PageContainer size="m">
      <FormProvider {...form}>
        <Typography variant="h1" component="h1">
          Добавление нового заказа
        </Typography>
        <Grid container spacing={2} sx={{ mt: "50px" }}>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Input name={orderFields.orderNumber} label="Номер заявки" />
          </Grid>
          <Grid size={{ xs: 12, lg: 9 }}>
            <Select
              label="Заказчик"
              options={customers}
              name={orderFields.customerId}
            />
          </Grid>

          <Grid size={{ lg: 3, xs: 12 }}>
            <DatePicker label="Дата приемки" name={orderFields.startDate} />
          </Grid>

          <Grid size={{ lg: 3, xs: 12 }}>
            <DatePicker label="Дата выдачи" name={orderFields.endDate} />
          </Grid>

          <Grid size={{ lg: 6, xs: 12 }}>
            <Input label="Вид работ" name={orderFields.workType} />
          </Grid>

          <Grid size={{ lg: 12, xs: 12 }}>
            <Input label="Адрес доставки" name={orderFields.deliveryAddress} />
          </Grid>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Select
              label="Тип покрытия"
              options={colorTypes}
              name="colorTypeId"
            />
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
              <Input
                label="Высота"
                name={`items.${index}.height`}
                type="number"
                postfix="мм"
              />
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Input
                label="Ширина"
                name={`items.${index}.width`}
                type="number"
                postfix="мм"
              />
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Select
                label="Толщина"
                name={`items.${index}.thickness`}
                options={thicknessOptions}
              />
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
              <Input
                label="Количество"
                name={`items.${index}.count`}
                type="number"
              />
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
            onClick={() => append(item as any)}
          >
            Добавить фасад
          </Button>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input
              label="Стоимость 1 м.кв."
              name={orderFields.unitCost}
              type="number"
              postfix="₽"
            />
          </Grid>
        </Grid>
        <Grid container mt={4} spacing={2}>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input
              label="Интегрированная ручка"
              name={orderFields.handleLength}
              type="number"
              postfix="м"
            />
          </Grid>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input
              label="Интегрированная ручка"
              name={orderFields.costOfHandle}
              type="number"
              postfix="₽"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={4}>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input
              label="Площадь фрезировки"
              name={orderFields.millingArea}
              type="number"
              postfix="м²"
            />
          </Grid>{" "}
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input
              label="Стоимость фрезировки"
              name={orderFields.costOfMilling}
              type="number"
              postfix="₽"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={4}>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input
              label="Прочие услуги, описание"
              name={orderFields.otherServices}
            />
          </Grid>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input
              label="Прочие услуги"
              name={orderFields.costOtherServices}
              type="number"
              postfix="₽"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input
              label="Аванс"
              name={orderFields.prepayment}
              type="number"
              postfix="₽"
            />
          </Grid>
          <Grid size={{ lg: 4, xs: 12 }}>
            <Input
              label="Скидка"
              name={orderFields.discount}
              type="number"
              postfix="₽"
            />
          </Grid>
        </Grid>

        <TableResults />

        <Button
          sx={{ marginTop: 6 }}
          onClick={onSubmit}
          variant="contained"
          size="large"
        >
          {isEdit ? "Сохранить" : "Добавить заказ"}
        </Button>
      </FormProvider>
    </PageContainer>
  );
}
