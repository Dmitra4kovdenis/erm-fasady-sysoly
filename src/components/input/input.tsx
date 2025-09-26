import { OutlinedInputProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useFormError } from "@/hooks/use-field-error";

interface InputProps extends OutlinedInputProps {
  name: string;
}

export default function Input({ label, name, ...props }: InputProps) {
  const { control } = useFormContext();

  const fieldError = useFormError(name);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "Выберите цвет" }}
      render={({ field, fieldState }) => {
        return (
          <TextField
            variant="outlined"
            fullWidth
            label={label}
            error={!!fieldError}
            value={field.value ?? ""}
            onChange={field.onChange}
            helperText={fieldState.error?.message}
          />
        );
      }}
    />
  );
}
