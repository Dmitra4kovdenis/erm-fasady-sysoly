import { useFormContext } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { OrderModelType } from "@/zod-models/order-model";

export function TableResults() {
  const { watch } = useFormContext<OrderModelType>();

  const { items } = watch();

  const allArea = items.reduce((acc, item) => {
    const area: number = item.area ? +item.area : 0;
    return acc + area;
  }, 0);

  const list = [
    ["Общая площадь", allArea],
    ["Стоимость прямых фасадов, руб.", 0],
    ["Площадь фрезировки, м.кв", 0],
    ["Стоимость фрезировки, руб.", 0],
    ["Итого,руб.", 0],
    ["Общая стоимость, руб", 0],
    ["Фасадов, штук", items.length],
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
