import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
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
          <FormControl variant="outlined" fullWidth>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
              {...props}
              label={label}
              error={!!fieldError}
              {...field}
            />
            {fieldState.error && (
              <FormHelperText>
                {fieldState.error.message as string}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
