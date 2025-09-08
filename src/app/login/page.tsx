import css from "./page.module.scss";
import Input from "@/app/login/components/input/input";
export default function Login() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Вход</h2>
      <div className={css.loginBox}>
        <Input placeholder="+73423423434" label="Login" type="number" />
        <Input placeholder="Введите пароль" label="Password" type="password" />
        <button className={css.button}>Войти</button>
      </div>
    </div>
  );
}
