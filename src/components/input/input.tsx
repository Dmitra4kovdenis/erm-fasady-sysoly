import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";

interface InputProps extends OutlinedInputProps {
  label: string;
  className?: string;
}

export default function Input({ label, className, ...inputProps }: InputProps) {
  return (
    <div className={className}>
      <FormControl variant="outlined" fullWidth>
        <div>{label}</div>
        <OutlinedInput {...inputProps} />
      </FormControl>
    </div>
  );
}
