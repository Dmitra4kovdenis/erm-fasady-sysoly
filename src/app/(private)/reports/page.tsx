import { Button, Typography } from "@mui/material";
import { PageContainer } from "@/components/page-container/page-container";
import Link from "next/link";

function Page() {
  return (
    <PageContainer>
      <Typography variant="h1">Отчеты (в разработке)</Typography>
      <Link href="/reports/work-by-period">Кто сколько заработал</Link>
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
