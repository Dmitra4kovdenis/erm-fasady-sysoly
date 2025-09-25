import {
  DatePicker as DatePickerMui,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface InputProps {
  label: string;
  className?: string;
  name: string;
}

export default function DatePicker({ label, className, name }: InputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "Выберите цвет" }}
      render={({ field, fieldState }) => {
        const fieldError = fieldState.error;
        return (
          <div className={className}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl fullWidth>
                <DatePickerMui
                  label={label}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
                {fieldError && (
                  <FormHelperText>
                    {fieldError.message as string}
                  </FormHelperText>
                )}
              </FormControl>
            </LocalizationProvider>
          </div>
        );
      }}
    />
  );
}
