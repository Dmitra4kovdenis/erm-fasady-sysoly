import { useFormContext } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { OrderModelType } from "@/zod-models/order-model";
import { calcFieldsByEditable } from "@/app/(private)/add-order/utils";

export function TableResults() {
  const { watch } = useFormContext<OrderModelType>();

  const values = watch();

  const {
    remainder,
    millingArea,
    costOfStraightFacades,
    totalArea,
    totalPrice,
    summPrice,
    itemsCount,
  } = calcFieldsByEditable(values);

  const list = [
    ["Общая площадь", "м²", totalArea],
    ["Стоимость прямых фасадов", "₽", costOfStraightFacades],
    ["Площадь фрезировки, м.кв", "м²", millingArea],
    ["Итого", "₽", summPrice],
    ["Общая стоимость", "₽", totalPrice],
    ["Фасадов", "штук", itemsCount],
    ["Остаток", "₽", remainder],
  ];

  return (
    <TableContainer sx={{ mt: 10 }}>
      <Table sx={{ maxWidth: 600 }}>
        <TableBody>
          {list.map(([title, postfix, value]) => (
            <TableRow key={title}>
              <TableCell component="th" scope="row">
                {title}
              </TableCell>
              <TableCell align="right">
                {value} {postfix}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
