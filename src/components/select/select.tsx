import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string;
}

interface InputProps {
  label: string;
  options: SelectOption[];
  name: string;
}

export default function Select({ label, options, name }: InputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "Выберите цвет" }}
      render={({ field, fieldState }) => {
        const fieldError = fieldState.error;

        return (
          <FormControl fullWidth>
            <div>{label}</div>
            <MuiSelect {...field} error={!!fieldError}>
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
