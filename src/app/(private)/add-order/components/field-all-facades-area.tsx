import { useFormContext } from "react-hook-form";
import Input from "@/components/input/input";
import { OrderModelType } from "@/zod-models/order-model";
import { useLayoutEffect } from "react";

export function FieldAllFacadesArea() {
  const { watch, setValue } = useFormContext<OrderModelType>();

  // слушаем указанные поля
  const items = watch("items");

  const value = items.reduce((acc, item) => {
    const area: number = item.area ? +item.area : 0;
    return acc + area;
  }, 0);

  // при изменении площади записываем её в поле
  useLayoutEffect(() => {
    setValue("allFacadesArea", value.toString(), {
      shouldTouch: true,
    });
  }, [setValue, value]);

  return <Input label="Общая площадь" name={"allFacadesArea"} readOnly />;
}
