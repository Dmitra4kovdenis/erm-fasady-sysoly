import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useFormError } from "@/hooks/use-field-error";

interface InputProps extends OutlinedInputProps {
  label: string;
  className?: string;
  name: string;
}

export default function Input({
  label,
  className,
  name,
  ...inputProps
}: InputProps) {
  const { register } = useFormContext();

  const fieldError = useFormError(name);

  return (
    <div className={className}>
      <FormControl variant="outlined" fullWidth>
        <div>{label}</div>
        <OutlinedInput
          error={!!fieldError}
          {...inputProps}
          {...register(name)}
        />
        {fieldError && (
          <FormHelperText>{fieldError.message as string}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}
