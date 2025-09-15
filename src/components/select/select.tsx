import { FormControl, MenuItem, Select as MuiSelect } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string;
}

interface InputProps {
  label: string;
  className?: string;
  options: SelectOption[];
  name: string;
}

export default function Select({
  label,
  options,
  className,
  name,
}: InputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "Выберите цвет" }}
      render={({ field }) => (
        <div className={className}>
          <FormControl fullWidth>
            <div>{label}</div>
            <MuiSelect {...field}>
              {options.map((option) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiSelect>
          </FormControl>
        </div>
      )}
    />
  );
}
