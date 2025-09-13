import { ButtonHTMLAttributes, FC } from "react";
import css from "./avatar.module.scss";
import cn from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLDivElement> {
  title: string;
}

const Avatar: FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <div {...props} className={cn(css.common)}>
      {title.slice(0, 2)}
    </div>
  );
};

export default Avatar;
