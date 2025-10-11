import { InputAdornment, OutlinedInputProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useFormError } from "@/hooks/use-field-error";
import { ChangeEvent } from "react";

interface InputProps extends OutlinedInputProps {
  name: string;
  required?: boolean;
  type?: "number" | "string" | "password";
  postfix?: string;
}

export default function Input({
  label,
  name,
  required = true,
  multiline,
  type,
  onKeyPress,
  postfix,
}: InputProps) {
  const { control } = useFormContext();

  const fieldError = useFormError(name);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required && "Поле обязательно" }}
      render={({ field, fieldState }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value;
          if (type === "number") {
            const _val = Number(value);
            if (!isNaN(_val)) field.onChange(_val);
          } else {
            field.onChange(value);
          }
        };

        return (
          <TextField
            multiline={multiline}
            variant="outlined"
            fullWidth
            label={label}
            error={!!fieldError}
            value={field.value ?? ""}
            onChange={handleChange}
            helperText={fieldState.error?.message}
            onKeyPress={onKeyPress}
            slotProps={{
              input: {
                endAdornment: postfix && (
                  <InputAdornment position="end">{postfix}</InputAdornment>
                ),
              },
            }}
          />
        );
      }}
    />
  );
}
