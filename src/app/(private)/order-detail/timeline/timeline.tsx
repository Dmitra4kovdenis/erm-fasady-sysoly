import {
  Box,
  Button,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { formatDate } from "@/utils";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import {
  OrderDetailType,
  OrderTimelinesType,
  Workers,
} from "@/app/(private)/order-detail/server";
import { FormAddTimeline } from "@/app/(private)/order-detail/timeline/form-add-timeline";

interface TimelineProps {
  timelines: OrderTimelinesType;
  order: NonNullable<OrderDetailType>;
  workers: Workers;
}
export function Timeline({ timelines, order, workers }: TimelineProps) {
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  return (
    <Box>
      <DialogContent sx={{ height: "500px" }}>
        <Table>
          <TableBody>
            {timelines.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.worker.name}</TableCell>
                <TableCell>{item.comment}</TableCell>
                <TableCell>{formatDate(item.dateStart)}</TableCell>
                <TableCell>{formatDate(item.dateEnd)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditIndex(item.id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogContent>
        <Button
          onClick={() => setEditIndex(-1)}
          variant="contained"
          sx={{ marginTop: 2 }}
        >
          Добавить трудозатрату
        </Button>
      </DialogContent>
      {editIndex && (
        <FormAddTimeline
          onClose={() => setEditIndex(undefined)}
          orderId={order.id}
          statusId={order.statusId}
          editIndex={editIndex}
          timelines={timelines}
          workers={workers}
        />
      )}
    </Box>
  );
}
