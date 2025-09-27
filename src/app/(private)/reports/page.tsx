import { Button, Container, Typography } from "@mui/material";

function Page() {
  return (
    <Container>
      <Typography variant="h1">Отчеты (в разработке)</Typography>
      <Button>Кто сколько заработал</Button>
      <br />
      <Button>Сколько сделали за период</Button>
      <br />
      <Button>Сколько ушло материала</Button>
      <br />
      <Button>
        Дополнительные отчеты (процент брака, число неустоек, сорвавшиеся сроки)
      </Button>
    </Container>
  );
}
export default Page;
