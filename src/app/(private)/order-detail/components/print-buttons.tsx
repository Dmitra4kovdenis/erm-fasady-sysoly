import { Grid, IconButton } from "@mui/material";
import { Print, ContentCut } from "@mui/icons-material";

export function PrintButtons() {
  return (
    <Grid container spacing={1} justifyContent="flex-end" mt={2}>
      <Grid>
        <IconButton
          color="primary"
          onClick={() => console.log("Печать")}
          sx={{
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          <Print />
        </IconButton>
      </Grid>
      <Grid>
        <IconButton
          onClick={() => console.log("Раскрой")}
          sx={{
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          <ContentCut />
        </IconButton>
      </Grid>
    </Grid>
  );
}
