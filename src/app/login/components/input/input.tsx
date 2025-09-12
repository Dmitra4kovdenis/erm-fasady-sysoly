import css from "./input.module.scss";
import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label: string;
  type?: string;
  name: string;
}

export default function Input({
  placeholder,
  label,
  type,
  ...props
}: InputProps) {
  return (
    <div>
      <div className={css.label}>{label}</div>
      <input
        className={css.input}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </div>
  );
}
