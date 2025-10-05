import { useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";

export function FieldFacadeArea({ index }: { index: number }) {
  const { watch } = useFormContext();

  // слушаем указанные поля
  const height = watch(`items.${index}.height`) ?? 0;
  const width = watch(`items.${index}.width`) ?? 0;
  const count = watch(`items.${index}.count`) ?? 0;

  // площадь - произведение этих значений
  const value = height * width * count * 0.001 * 0.001;

  return (
    <Typography variant="body1" color="secondary">
      Площадь: {value} км.м
    </Typography>
  );
}
