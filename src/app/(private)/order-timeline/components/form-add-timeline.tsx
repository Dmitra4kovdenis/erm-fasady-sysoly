import { Button, Dialog, DialogContent, Grid } from "@mui/material";
import Input from "@/components/input/input";
import DatePicker from "@/components/date-picker/date-picker";
import { FormProvider, useForm } from "react-hook-form";
import {
  addTimeline,
  editTimeline,
} from "@/app/(private)/order-timeline/actions";
import type { WorkTimeline } from "@prisma/client";
import { OrderTimelinesType } from "@/app/(private)/order-timeline/order-timeline";

interface FormAddTimelineProps {
  orderId: number;
  workerId: number;
  statusId: number;
  editIndex: number;
  onClose: () => void;
  timelines: OrderTimelinesType;
}

export function FormAddTimeline({
  workerId,
  orderId,
  statusId,
  editIndex,
  onClose,
  timelines,
}: FormAddTimelineProps) {
  const defaultValues = timelines.find((item) => item.id === editIndex);

  const form = useForm<WorkTimeline>({
    defaultValues: {
      orderId,
      workerId,
      statusId,
      dateStart: defaultValues?.dateStart,
      dateEnd: defaultValues?.dateEnd,
      comment: defaultValues?.comment,
    },
  });

  const submit = form.handleSubmit(async (values) => {
    if (editIndex === -1) {
      await addTimeline(values);
    } else {
      await editTimeline(editIndex, values);
    }
    onClose();
    form.reset();
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogContent>
        <FormProvider {...form}>
          <Grid spacing={2} container>
            <Grid size={12}>
              <Input multiline label="Комментарий" name="comment" />
            </Grid>
            <DatePicker label="Дата начала" name="dateStart" />
            <DatePicker label="Дата конца" name="dateEnd" />
            <Button variant="contained" size="large" onClick={submit}>
              Добавить
            </Button>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
