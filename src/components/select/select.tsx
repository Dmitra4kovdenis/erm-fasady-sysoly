import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface InputProps {
  label: string;
  options: SelectOption[];
  name: string;
  required?: boolean;
}

export default function Select({
  label,
  options,
  name,
  required = true,
}: InputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required && "Поле обязательно" }}
      render={({ field, fieldState }) => {
        const fieldError = fieldState.error;
        const { value, onChange } = field;

        return (
          <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
              onChange={onChange}
              value={value ?? ""}
              error={!!fieldError}
              label={label}
            >
              {options.map((option) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiSelect>
            {fieldError && (
              <FormHelperText>{fieldError.message as string}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
