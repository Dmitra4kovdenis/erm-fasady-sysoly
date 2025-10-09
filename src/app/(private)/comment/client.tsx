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
import { FormAddComment } from "@/app/(private)/comment/components/form-add-timeline";
import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { useState } from "react";
import { formatDate } from "@/utils";
import { UserData } from "@/prisma-helpers/get-user-data";
import { CommentType } from "@/app/(private)/comment/comment";

interface ClientCommentProps {
  comments: CommentType;
  order: NonNullable<OrderDetailType>;
  userData: UserData;
}

export function ClientComment({
  comments,
  order,
  userData,
}: ClientCommentProps) {
  const { push } = useRouter();
  const pathname = usePathname();

  const onClose = () => push(pathname);

  return (
    <>
      <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Трудозатраты по заказу {order.orderNumber}</DialogTitle>
        <DialogContent>
          <Table>
            <TableBody>
              {comments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.user?.worker?.name}</TableCell>
                  <TableCell>{item.text}</TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <FormAddComment orderId={order.id} userId={userData.id} />
        </DialogContent>
      </Dialog>
    </>
  );
}
