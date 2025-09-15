import css from "./input.module.scss";
import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  type?: string;
  name?: string;
  className?: string;
}

export default function Input({
  placeholder,
  label,
  type,
  className,
  ...props
}: InputProps) {
  return (
    <div className={className}>
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
