"use client";
import { Box, Skeleton, Typography } from "@mui/material";
import { PageContainer } from "@/components/page-container/page-container";
import Grid from "@mui/material/Grid";

const FieldSkeleton = () => (
  <Box
    height="56px"
    border="1px solid lightgray"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    padding="0 24px"
  >
    <Skeleton width="100px" />
  </Box>
);

export default function Loading() {
  return (
    <PageContainer size="m">
      <Typography variant="h1" component="h1">
        Добавление нового заказа
      </Typography>
      <Grid container spacing={2} sx={{ mt: "50px" }}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <FieldSkeleton />
        </Grid>
        <Grid size={{ xs: 12, lg: 9 }}>
          <FieldSkeleton />
        </Grid>

        <Grid size={{ lg: 3, xs: 12 }}>
          <FieldSkeleton />
        </Grid>

        <Grid size={{ lg: 3, xs: 12 }}>
          <FieldSkeleton />
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <FieldSkeleton />
        </Grid>

        <Grid size={{ lg: 12, xs: 12 }}>
          <FieldSkeleton />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
