import { useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";

export function FieldFacadeArea({ index }: { index: number }) {
  const { watch } = useFormContext();

  // слушаем указанные поля
  const height = +watch(`items.${index}.height`);
  const width = +watch(`items.${index}.width`);
  const count = +watch(`items.${index}.count`);

  // площадь - произведение этих значений
  const value = height * width * count * 0.001 * 0.001;

  return (
    <Typography variant="body1" color="secondary">
      Площадь: {value} км.м
    </Typography>
  );
}
