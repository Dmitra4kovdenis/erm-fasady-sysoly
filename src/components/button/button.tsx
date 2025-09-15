import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import css from "./button.module.scss";
import cn from "classnames";
import MuiButton from "@mui/material/Button";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "neutral" | "outline";
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
  className,
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      className={cn(css.common, css[variant], className)}
      disabled={disabled}
    >
      {startIcon && <span className={css.icon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={css.icon}>{endIcon}</span>}
    </MuiButton>
  );
};

export default Button;
