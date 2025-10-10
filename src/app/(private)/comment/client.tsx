"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { FormAddComment } from "@/app/(private)/comment/components/form-add-timeline";
import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { formatDateTime } from "@/utils";
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
      chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }, 0);
  }, [comments]);

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Комментарии по заказу {order.orderNumber}</DialogTitle>
      <DialogContent>
        <Paper
          ref={chatRef}
          elevation={0}
          sx={{
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            height: 300,
            overflowY: "auto",
            width: "100%",
            p: 1,
          }}
        >
          <List disablePadding>
            {comments.map((item, index) => {
              const userName =
                item.user?.admin?.name ??
                item.user?.worker?.name ??
                "Неизвестно";
              return (
                <div key={item.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: "rgba(237, 108, 2, 0.4)",
                          color: "primary.main",
                        }}
                      >
                        {userName[0]?.toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography fontWeight={600}>{userName}</Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{ whiteSpace: "pre-wrap" }}
                          >
                            {item.text}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.disabled"
                            display="block"
                            sx={{ mt: 0.5 }}
                          >
                            {formatDateTime(item.createdAt)}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < comments.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </div>
              );
            })}
          </List>
        </Paper>

        <FormAddComment orderId={order.id} userId={userData.id} />
      </DialogContent>
    </Dialog>
  );
}
