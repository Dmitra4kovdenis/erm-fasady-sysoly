import {
  DatePicker as DatePickerMui,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
        // Обеспечиваем, что value никогда не будет undefined
        const dateValue = value ? dayjs(value) : null;
        return (
          <div className={className}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <FormControl fullWidth>
                <DatePickerMui
                  label={label}
                  value={dateValue} // Конвертируем в dayjs объект
                  onChange={(newValue) => {
                    onChange(newValue ? newValue.toISOString() : null); // Конвертируем обратно в строку
                  }}
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
