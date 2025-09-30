import { Button, Typography } from "@mui/material";
import { PageContainer } from "@/components/page-container/page-container";

function Page() {
  return (
    <PageContainer>
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
    </PageContainer>
  );
}
export default Page;
