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
    ["Общая площадь, м2", totalArea],
    ["Стоимость прямых фасадов, руб.", costOfStraightFacades],
    ["Площадь фрезировки, м.кв", millingArea],
    ["Итого,руб.", summPrice],
    ["Общая стоимость, руб", totalPrice],
    ["Фасадов, штук", itemsCount],
    ["Остаток", remainder],
  ];

  return (
    <TableContainer sx={{ mt: 10 }}>
      <Table sx={{ maxWidth: 600 }}>
        <TableBody>
          {list.map(([title, value]) => (
            <TableRow key={title}>
              <TableCell component="th" scope="row">
                {title}
              </TableCell>
              <TableCell align="right">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
