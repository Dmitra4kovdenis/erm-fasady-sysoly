"use client";

import css from "./page.module.scss";
import Input from "@/app/auth/login/components/input/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("123456");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) router.push("/");
    else setError(data.error);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Вход</h2>
      <div className={css.loginBox}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="+73423423434"
          label="Login"
        />
        <Input
          name="password"
          placeholder="Введите пароль"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={css.button} onClick={handleSubmit}>
          Войти
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
