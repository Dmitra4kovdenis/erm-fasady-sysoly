import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import css from "./icon-button.module.scss";
import cn from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "neutral";
  disabled?: boolean;
  icon: ReactNode;
}

const IconButton: FC<ButtonProps> = ({
  icon,
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
      {icon}
    </button>
  );
};

export default IconButton;
