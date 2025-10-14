import { useFormContext } from "react-hook-form";

// Кастомный хук для получения ошибок
export function useFormError(name: string) {
  const {
    formState: { errors },
  } = useFormContext();

  const getError = (errorObj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], errorObj);
  };

  return getError(errors, name);
}
