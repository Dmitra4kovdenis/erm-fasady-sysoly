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
import { useEffect, useState } from "react";
import { FormAddTimeline } from "@/app/(private)/order-detail/timeline/form-add-timeline";
import {
  getOrderTimelines,
  getWorkers,
  OrderTimelinesType,
  Workers,
  OrderDetailType,
} from "@/app/(private)/order-detail/actions";
import { Loading } from "@/app/(private)/order-detail/loading";

interface TimelineProps {
  order: NonNullable<OrderDetailType>;
}
export function Timeline({ order }: TimelineProps) {
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  const [timelines, setTimelines] = useState<OrderTimelinesType>();
  const [workers, setWorkers] = useState<Workers>();

  const update = () => {
    getOrderTimelines(order.id).then(setTimelines);
  };

  useEffect(() => {
    Promise.all([
      getWorkers().then(setWorkers),
      getOrderTimelines(order.id).then(setTimelines),
    ]);
  }, [order]);

  if (!timelines || !workers) return <Loading />;

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
          update={update}
        />
      )}
    </Box>
  );
}
