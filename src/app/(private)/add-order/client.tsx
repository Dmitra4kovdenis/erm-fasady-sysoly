"use client";

import css from "./page.module.scss";
import Input from "@/components/input/input";
import IconButton from "@mui/material/IconButton";
import IconDelete from "@mui/icons-material/Delete";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { OrderModel } from "@/zod-models/order-model";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Select, { SelectOption } from "@/components/select/select";
import Grid from "@mui/material/Grid";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "@/components/date-picker/date-picker";
import { createOrder } from "./actions";
import { radiusOptions } from "@/app/(private)/add-order/constants";
import { FieldFacadeArea } from "@/app/(private)/add-order/components/field-facade-area";
import { FieldAllFacadesArea } from "@/app/(private)/add-order/components/field-all-facades-area";

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
    await createOrder(values);
  });

  return (
    <FormProvider {...form}>
      <Container sx={{ mb: "100px" }}>
        <Typography variant="h1" component="h1">
          Добавление нового заказа
        </Typography>
        <Grid container spacing={2} sx={{ mt: "50px" }}>
          <Grid size={8}>
            <Select label="Заказчик" options={customers} name={"customerId"} />
          </Grid>
          <Grid size={4} />
          <Grid size={3}>
            <DatePicker label="Дата приемки" name="startDate" />
          </Grid>
          <Grid size={3}>
            <DatePicker label="Дата выдачи" name="endDate" />
          </Grid>
          <Grid size={10}>
            <Input multiline label="Адрес доставки" name="deliveryAddress" />
          </Grid>
          <Grid size={10}>
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
              p: 2,
              pl: 8,
              pr: 12,
              border: "1px solid #ddd",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <div className={css.number}>{index + 1}</div>
            <Grid size={3}>
              <Input label="Высота, мм" name={`items.${index}.height`} />
            </Grid>
            <Grid size={3}>
              <Input label="Ширина, мм" name={`items.${index}.width`} />
            </Grid>
            <Grid size={3}>
              <Input label="Толщина" name={`items.${index}.thickness`} />
            </Grid>
            <Grid size={3} />
            <Grid size={3}>
              <Select
                label="Ручка интегрированная"
                options={handles}
                name={`items.${index}.handleId`}
              />
            </Grid>
            <Grid size={3}>
              <Select
                label="Радиус завала торца"
                name={`items.${index}.radius`}
                options={radiusOptions}
              />
            </Grid>
            <Grid size={3}>
              <Select
                label="Фрезеровка"
                options={millings}
                name={`items.${index}.millingId`}
              />
            </Grid>
            <Grid size={3} />
            <Grid size={3}>
              <Input label="Цвет" name={`items.${index}.color`} />
            </Grid>
            <Grid size={3}>
              <Input label="Количество" name={`items.${index}.count`} />
            </Grid>
            <Grid size={3}>
              <FieldFacadeArea index={index} />
            </Grid>
            <IconButton onClick={() => remove(index)} className={css.remove}>
              <IconDelete />
            </IconButton>
          </Grid>
        ))}

        <Grid sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => append(defaultFields)}>
            Добавить фасад
          </Button>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={3}>
            <Input label="Аванс" name="advance" />
          </Grid>
          <Grid size={3}>
            <Input label="Скидка" name="discount" />
          </Grid>
        </Grid>

        <Grid container size={12} spacing={2} sx={{ mt: 5 }}>
          <Grid size={4}>
            <FieldAllFacadesArea />
          </Grid>
        </Grid>

        <TableContainer sx={{ mt: 10 }}>
          <Table sx={{ maxWidth: 600 }}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Стоимость прямых фасадов, руб.
                </TableCell>
                <TableCell align="right">300</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  fsdf
                </TableCell>
                <TableCell align="right">300</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          className={css.footer}
        >
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
