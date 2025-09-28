import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Input from "@/components/input/input";
import {
  addCustomer,
  AddCustomerData,
  updateCustomer,
} from "@/app/(private)/customers/actions";
import { CustomerList } from "@/app/(private)/customers/page";

interface FormAddCustomersProps {
  customers: CustomerList;
  editId?: number;
  onClose: () => void;
}

export function FormAddCustomers({
  onClose,
  customers,
  editId,
}: FormAddCustomersProps) {
  // если в массиве находим этого пользователя по id - то это текущий и его надо редактировать
  const defaultValues = customers.find((item) => item.id === editId);

  const form = useForm<AddCustomerData>({
    defaultValues,
  });

  const submit = form.handleSubmit(async (values) => {
    if (!editId) return;

    if (editId === -1) {
      await addCustomer(values);
    } else {
      await updateCustomer(editId, values);
    }
    onClose();
  });

  const title = defaultValues
    ? `Редактирование заказчика ${defaultValues.name}`
    : "Добавление нового заказчика";

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormProvider {...form}>
          <Grid container spacing={2} marginTop={2}>
            <Grid size={8}>
              <Input name="name" label="Имя заказчика" required />
            </Grid>
            <Grid size={12}>
              <Input name="phone" label="Номер телефона" required />
            </Grid>
            <Grid size={12}>
              <Input name="companyName" label="Название компании" required />
            </Grid>
            <Grid>
              <Button size="large" variant="contained" onClick={submit}>
                Добавить
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
