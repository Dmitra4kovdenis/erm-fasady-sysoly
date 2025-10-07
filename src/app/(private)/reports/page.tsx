import { Button, Typography } from "@mui/material";
import { PageContainer } from "@/components/page-container/page-container";
import Link from "next/link";

function Page() {
  return (
    <PageContainer>
      <Typography variant="h1">Отчеты (в разработке)</Typography>
      <Button
        variant="contained"
        component={Link}
        color="secondary"
        href="/reports/work-by-period"
      >
        Кто сколько заработал
      </Button>
      <br />
      <br />
      <Button variant="contained" disabled>
        Сколько сделали за период
      </Button>
      <br />
      <br />
      <Button variant="contained" disabled>
        Сколько ушло материала
      </Button>
      <br />
      <br />
      <Button variant="contained" disabled>
        Дополнительные отчеты (процент брака, число неустоек, сорвавшиеся сроки)
      </Button>
    </PageContainer>
  );
}
export default Page;
