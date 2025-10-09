import { Button, Grid } from "@mui/material";
import Input from "@/components/input/input";
import { FormProvider, useForm } from "react-hook-form";
import { addComment, AddCommentType } from "@/app/(private)/comment/actions";

interface FormAddTimelineProps {
  orderId: number;
  userId: number;
}

export function FormAddComment({ orderId, userId }: FormAddTimelineProps) {
  const form = useForm<AddCommentType>({
    defaultValues: {
      orderId,
      userId,
    },
  });

  const submit = form.handleSubmit(async (values) => {
    await addComment(values);

    form.reset();
  });

  return (
    <FormProvider {...form}>
      <Grid spacing={2} container>
        <Grid size={12}>
          <Input multiline label="Комментарий" name="comment" />
        </Grid>
        <Button variant="contained" size="large" onClick={submit}>
          Сохранить
        </Button>
      </Grid>
    </FormProvider>
  );
}
