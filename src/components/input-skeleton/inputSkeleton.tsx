import { Box, Skeleton } from "@mui/material";

export default function InputSkeleton() {
  return (
    <Box
      border="solid 1px"
      height="56px"
      display="flex"
      alignItems="center"
      width="100%"
      pl="14px"
      pr="14px"
      borderColor="rgb(229, 231, 235)"
      borderRadius="4px"
    >
      <Skeleton />
    </Box>
  );
}
