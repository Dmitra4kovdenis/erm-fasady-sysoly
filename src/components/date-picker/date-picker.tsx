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
      render={({ field: { value, onChange }, fieldState }) => {
        const fieldError = fieldState.error;
        return (
          <div className={className}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <FormControl fullWidth>
                <DatePickerMui
                  label={label}
                  value={value}
                  onChange={onChange}
                  slotProps={{
                    textField: {
                      error: !!fieldError,
                    },
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
