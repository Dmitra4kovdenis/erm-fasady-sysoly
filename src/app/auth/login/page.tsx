"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { Grid, Typography, Button, Paper, Box, Badge } from "@mui/material";
import Input from "@/components/input/input";

interface FormValues {
  login: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      login: "ivandmitrachkov",
      password: "123456",
    },
  });
  const submit = async ({ login, password }: FormValues) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const data = await res.json();
    if (data.success) {
      router.push("/");
    } else {
      if (res.status === 401) {
        form.setError("root", {
          type: "manual",
          message: "Не верный логин или пароль",
        });
      } else {
        form.setError("root", {
          type: "manual",
          message: "Неожиданная ошибка сервера",
        });
      }
    }
  };

  return (
    <FormProvider {...form}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            width: "100%",
            maxWidth: 700,
            mx: "auto",
          }}
        >
          <Typography variant="h3" align="center" fontWeight="bold" mb={4}>
            ERM v1.0.5
          </Typography>

          <Box component="form" onSubmit={form.handleSubmit(submit)}>
            <Grid container spacing={3} direction="column">
              <Grid>
                <Input label="Login" name="login" placeholder="+73423423434" />
              </Grid>

              <Grid>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Введите пароль"
                />
              </Grid>

              {form.formState.errors.root && (
                <Badge>{form.formState.errors.root.message}</Badge>
              )}

              <Grid>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Войти
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </FormProvider>
  );
}
