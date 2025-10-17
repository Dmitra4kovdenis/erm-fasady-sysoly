import {
  Avatar,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { formatDateTime, getInitials } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { FormAddComment } from "@/containers/order-detail/chat/form-add-comment";
import {
  CommentType,
  getComments,
  OrderDetailType,
} from "@/containers/order-detail/actions";
import { Loading } from "@/containers/order-detail/loading";

interface ChatProps {
  order: NonNullable<OrderDetailType>;
}

export function Chat({ order }: ChatProps) {
  const chatRef = useRef<HTMLDivElement>(null);

  const [comments, setComments] = useState<CommentType>();

  useEffect(() => {
    getComments(order.id).then(setComments);
  }, [order]);

  const update = () => getComments(order.id).then(setComments);

  useEffect(() => {
    setTimeout(() => {
      chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }, 0);
  }, [comments]);

  if (!comments) {
    return <Loading />;
  }

  return (
    <>
      <DialogContent>
        <Paper
          ref={chatRef}
          elevation={0}
          sx={{
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            height: "500px",
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
                        {getInitials(userName)}
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
      </DialogContent>
      <DialogContent>
        <FormAddComment orderId={order.id} update={update} />
      </DialogContent>
    </>
  );
}
