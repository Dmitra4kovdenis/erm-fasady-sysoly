import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import css from "./button.module.scss";
import cn from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "neutral";
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  endIcon,
  startIcon,
  disabled,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(css.common, css[variant])}
      disabled={disabled}
    >
      {startIcon && <span className={css.icon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={css.icon}>{endIcon}</span>}
    </button>
  );
};

export default Button;
