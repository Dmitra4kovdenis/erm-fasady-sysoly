"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { FormAddComment } from "@/app/(private)/comment/components/form-add-timeline";
import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { formatDate, formatDateTime } from "@/utils";
import { UserData } from "@/prisma-helpers/get-user-data";
import { CommentType } from "@/app/(private)/comment/comment";
import { useEffect, useRef } from "react";

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
  const chatRef = useRef<HTMLDivElement>(null);
  const onClose = () => push(pathname);
  useEffect(() => {
    setTimeout(() => {
      chatRef.current?.scrollTo(0, 2000000);
    }, 0);
  }, [comments]);
  return (
    <>
      <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Комментарии по заказу {order.orderNumber}</DialogTitle>
        <DialogContent>
          <TableContainer
            ref={chatRef}
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              height: "300px",
              overflowY: "auto",
              width: "100%",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(237, 108, 2, 0.08)" }}>
                  <TableCell sx={{ fontWeight: 600, color: "#ed6c02" }}>
                    Пользователь
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#ed6c02" }}>
                    Комментарий
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#ed6c02" }}
                    align="right"
                  >
                    Дата
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comments.map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{
                      transition: "background-color 0.2s",
                      "&:hover": { backgroundColor: "rgba(237, 108, 2, 0.08)" },
                    }}
                  >
                    <TableCell>
                      {item.user?.admin?.name ?? item.user?.worker?.name}
                    </TableCell>
                    <TableCell>{item.text}</TableCell>
                    <TableCell align="right">
                      {formatDateTime(item.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <FormAddComment orderId={order.id} userId={userData.id} />
        </DialogContent>
      </Dialog>
    </>
  );
}
