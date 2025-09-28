import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Input from "@/components/input/input";
import { addWorker, updateWorker } from "@/app/(private)/workers/actions";
import { WorkerList, WorkTypes } from "@/app/(private)/workers/page";
import Select from "@/components/select/select";
import type { Worker, User } from "@prisma/client";

interface FormAddWorkerProps {
  workers: WorkerList;
  editId?: number;
  onClose: () => void;
  workTypes: WorkTypes;
}

export function FormAddWorker({
  onClose,
  workers,
  editId,
  workTypes,
}: FormAddWorkerProps) {
  // если в массиве находим этого пользователя по id - то это текущий и его надо редактировать
  const editWorker = workers.find((item) => item.id === editId);

  const defaultValues = editWorker
    ? {
        worker: {
          name: editWorker.name,
          phone: editWorker.phone,
          typeId: editWorker.typeId,
        },
        user: {
          login: editWorker.user?.login ?? "",
        },
      }
    : {};

  const form = useForm<{ worker: Worker; user: User }>({
    defaultValues,
  });

  const submit = form.handleSubmit(async ({ worker, user }) => {
    if (!editId) return;

    if (editId === -1) {
      await addWorker(worker, user);
    } else {
      await updateWorker(editId, worker, user);
    }
    onClose();
  });

  const title = defaultValues?.worker
    ? `Редактирование специалиста ${defaultValues.worker.name}`
    : "Добавление нового специалиста";

  const options = workTypes.map((item) => ({
    label: item.title,
    value: item.id.toString(),
  }));

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormProvider {...form}>
          <Grid container spacing={2} marginTop={2}>
            <Grid size={8}>
              <Input name="worker.name" label="Имя" required />
            </Grid>
            <Grid size={12}>
              <Input name="worker.phone" label="Номер телефона" required />
            </Grid>
            <Grid size={12}>
              <Select
                name="worker.typeId"
                label="Специальность"
                required
                options={options}
              />
            </Grid>
            <Grid size={12}>
              <Input
                name="user.login"
                label="Логин (для учетной записи)"
                required
              />
            </Grid>
            <Grid size={12}>
              <Input
                name="user.password"
                label="Пароль (для учетной записи)"
                required
              />
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
