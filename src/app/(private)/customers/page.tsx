import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const list = [
  ["Иван Петров", "Леруа Мерлен"],
  ["Сергей", "Икеа"],
  ["Андрей Иванов", "ООО Газпром"],
];

function Page() {
  return (
    <Container>
      <Typography variant="h1">Заказчики</Typography>
      <Table>
        <TableBody>
          {list.map(([name, role]) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{role}</TableCell>
              <TableCell align="right">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button variant="outlined">Статус</Button>
                  <Button variant="contained">Редактировать</Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
export default Page;
