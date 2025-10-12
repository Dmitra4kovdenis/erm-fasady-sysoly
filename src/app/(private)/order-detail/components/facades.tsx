import {
  Box,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
} from "@mui/material";
import { OrderDetailType } from "@/app/(private)/order-detail/server";

interface InfoProps {
  order: NonNullable<OrderDetailType>;
}

export function Facades({ order }: InfoProps) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Фасады
      </Typography>
      <Box marginBottom={10} sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фасад</TableCell>
              <TableCell>Высота, мм</TableCell>
              <TableCell>Ширина, мм</TableCell>
              <TableCell>Толщина</TableCell>
              <TableCell>Ручка</TableCell>
              <TableCell>Радиус</TableCell>
              <TableCell>Фрезеровка</TableCell>
              <TableCell>Цвет</TableCell>
              <TableCell>Кол-во</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell>Фасад {index + 1}</TableCell>
                <TableCell>{item.height}</TableCell>
                <TableCell>{item.width}</TableCell>
                <TableCell>{item.thickness}</TableCell>
                <TableCell>{item.handle?.title || "-"}</TableCell>
                <TableCell>{item.radius}</TableCell>
                <TableCell>{item.milling?.title || "-"}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
