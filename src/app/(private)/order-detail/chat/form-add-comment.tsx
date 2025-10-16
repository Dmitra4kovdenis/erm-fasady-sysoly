import { Button, Grid } from "@mui/material";
import { Send } from "@mui/icons-material";
import Input from "@/components/input/input";
import { FormProvider, useForm } from "react-hook-form";
import { addComment, AddCommentType } from "../actions";
import { useUserData } from "@/prisma-helpers/user-data/user-data.provider";

interface FormAddTimelineProps {
  orderId: number;
  update: () => void;
}

export function FormAddComment({ orderId, update }: FormAddTimelineProps) {
  const { userId } = useUserData();

  const form = useForm<AddCommentType>({
    defaultValues: {
      orderId,
      userId,
    },
  });

  const submit = form.handleSubmit(async (values) => {
    await addComment(values);
    form.reset({
      orderId,
      userId,
    });
    update();
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <FormProvider {...form}>
      <Grid component="form" spacing={1} mt={2} container onSubmit={submit}>
        <Grid size={11}>
          <Input
            multiline
            label="Комментарий"
            name="text"
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid size={1}>
          <Button
            variant="contained"
            size="large"
            endIcon={<Send />}
            type="submit"
            sx={{ height: "56px", width: "100%" }}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
