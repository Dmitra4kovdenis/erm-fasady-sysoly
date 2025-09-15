"use client";

import css from "./page.module.scss";
import Input from "@/components/input/input";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@mui/material";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const submit = async ({ email, password }: FormValues) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (data.success) router.push("/");
  };

  const form = useForm<FormValues>({
    defaultValues: {
      email: "admin@example.com",
      password: "123456",
    },
  });

  return (
    <FormProvider {...form}>
      <div className={css.container}>
        <h2 className={css.title}>Вход</h2>
        <div className={css.loginBox}>
          <div className={css.field}>
            <Input placeholder="+73423423434" label="Login" name="email" />
          </div>
          <div className={css.field}>
            <Input
              placeholder="Введите пароль"
              label="Password"
              type="password"
              name="password"
            />
          </div>
          <Button
            variant="contained"
            fullWidth
            onClick={form.handleSubmit(submit)}
          >
            Войти
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
