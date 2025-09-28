"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { OrderTimelinesType } from "@/app/(private)/order-timeline/order-timeline";
import { FormAddTimeline } from "@/app/(private)/order-timeline/components/form-add-timeline";
import { UserData } from "@/prisma-helpers/get-user-data";
import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import dayjs from "dayjs";
import { IconEdit } from "@/icons";
import { useState } from "react";

interface ClientOrderTimelineProps {
  timelines: OrderTimelinesType;
  userData: UserData;
  order: NonNullable<OrderDetailType>;
}

export function ClientOrderTimeline({
  timelines,
  userData,
  order,
}: ClientOrderTimelineProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  const onClose = () => push(pathname);

  return (
    <>
      <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <DialogTitle>Трудозатраты по заказу {order.orderNumber}</DialogTitle>
          <Table>
            <TableBody>
              {timelines.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.comment}</TableCell>
                  <TableCell>{item.worker.name}</TableCell>
                  <TableCell>{dayjs(item.dateStart).toString()}</TableCell>
                  <TableCell>{dayjs(item.dateEnd).toString()}</TableCell>
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
        </DialogContent>
      </Dialog>
      {editIndex && userData.workerId && (
        <FormAddTimeline
          onClose={() => setEditIndex(undefined)}
          workerId={userData.workerId}
          orderId={order.id}
          statusId={order.statusId}
          editIndex={editIndex}
          timelines={timelines}
        />
      )}
    </>
  );
}
