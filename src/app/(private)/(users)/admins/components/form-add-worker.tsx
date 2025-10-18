import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Input from "@/components/input/input";
import { addAdmin, updateAdmin } from "@/app/(private)/(users)/admins/actions";
import { AdminsList } from "@/app/(private)/(users)/admins/page";
import type { Admin, User } from "@prisma/client";

interface FormAddAdminProps {
  admins: AdminsList;
  editId?: number;
  onClose: () => void;
}

export function FormAddAdmin({ onClose, admins, editId }: FormAddAdminProps) {
  // если в массиве находим этого пользователя по id - то это текущий и его надо редактировать
  const editAdmin = admins.find((item) => item.id === editId);

  const isCreating = editId === -1;

  const defaultValues = editAdmin
    ? {
        admin: {
          name: editAdmin.name,
          phone: editAdmin.phone,
        },
        user: {
          login: editAdmin.user?.login ?? "",
        },
      }
    : {};

  const form = useForm<{ admin: Admin; user: User }>({
    defaultValues,
  });

  const submit = form.handleSubmit(async ({ admin, user }) => {
    if (editId === undefined) return;

    if (isCreating) {
      await addAdmin(admin, user);
    } else {
      await updateAdmin(editId, admin, user);
    }
    onClose();
  });

  const title = defaultValues?.admin
    ? `Редактирование специалиста ${defaultValues.admin.name}`
    : "Добавление нового специалиста";

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormProvider {...form}>
          <Grid container spacing={2} marginTop={2}>
            <Grid size={8}>
              <Input name="admin.name" label="Имя" required={isCreating} />
            </Grid>
            <Grid size={12}>
              <Input
                name="admin.phone"
                label="Номер телефона"
                required={isCreating}
              />
            </Grid>

            <Grid size={12}>
              <Input
                name="user.login"
                label="Логин (для учетной записи)"
                required={isCreating}
              />
            </Grid>
            <Grid size={12}>
              <Input
                name="user.password"
                label="Пароль (для учетной записи)"
                required={isCreating}
              />
            </Grid>
            <Grid>
              <Button size="large" variant="contained" onClick={submit}>
                Сохранить
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
