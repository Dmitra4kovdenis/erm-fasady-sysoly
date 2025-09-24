import { useFormContext } from "react-hook-form";
import Input from "@/components/input/input";
import { useEffect } from "react";

export function FieldFacadeArea({ index }: { index: number }) {
  const { watch, setValue } = useFormContext();

  // слушаем указанные поля
  const height = +watch(`items.${index}.height`);
  const width = +watch(`items.${index}.width`);
  const count = +watch(`items.${index}.count`);

  // площадь - произведение этих значений
  const value = height * width * count;

  // при изменении площади записываем её в поле
  useEffect(() => {
    setValue(`items.${index}.area`, value);
  }, [index, setValue, value]);

  return <Input label="Площадь" name={`items.${index}.area`} readOnly />;
}
