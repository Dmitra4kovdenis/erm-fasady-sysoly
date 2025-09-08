import css from "./input.module.scss";
interface InputProps {
  placeholder: string;
  label: string;
  type?: string;
}

export default function Input({ placeholder, label, type }: InputProps) {
  return (
    <div>
      <div className={css.label}>{label}</div>
      <input className={css.input} placeholder={placeholder} type={type} />
    </div>
  );
}
