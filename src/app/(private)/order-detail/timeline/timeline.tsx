import {
  OrderTimelinesType,
  Workers,
} from "@/app/(private)/order-timeline/order-timeline";
import { UserData } from "@/prisma-helpers/get-user-data";
import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { formatDate } from "@/utils";
import { IconEdit } from "@/icons";
import { FormAddTimeline } from "@/app/(private)/order-timeline/components/form-add-timeline";
import { useState } from "react";

interface TimelineProps {
  timelines: OrderTimelinesType;
  userData: UserData;
  order: NonNullable<OrderDetailType>;
  workers: Workers;
}
export function Timeline({
  timelines,
  userData,
  order,
  workers,
}: TimelineProps) {
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  return (
    <>
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
                  <IconEdit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={() => setEditIndex(-1)}
        variant="contained"
        sx={{ marginTop: 2 }}
      >
        Добавить трудозатрату
      </Button>
      {editIndex && (
        <FormAddTimeline
          onClose={() => setEditIndex(undefined)}
          workerId={userData?.workerId ?? undefined}
          orderId={order.id}
          statusId={order.statusId}
          editIndex={editIndex}
          timelines={timelines}
          workers={workers}
        />
      )}
    </>
  );
}
