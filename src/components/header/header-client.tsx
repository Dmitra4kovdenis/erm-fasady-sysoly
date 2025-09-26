"use client";

import { useRef, useState } from "react";
import useClickOutside from "@/hooks/click-outside";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import Link from "next/link";

interface HeaderClientProps {
  name: string;
  role: string;
}

function HeaderClient({ name, role }: HeaderClientProps) {
  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/auth/login"; // перенаправляем на страницу логина
  }

  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ lineHeight: 1 }}>
            Фасады Сысолы
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", ml: 6, gap: 2 }}>
            <Button component={Link} href="/add-order" sx={{ color: "white" }}>
              Добавить заказ
            </Button>
            <Button component={Link} href="/order-list" sx={{ color: "white" }}>
              Список заказов
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, ml: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={() => setIsOpen(true)} sx={{ p: 0 }}>
                <Box
                  sx={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    mr: 2,
                  }}
                >
                  <Typography variant="body2">{name}</Typography>
                  <Typography variant="caption">{role}</Typography>
                </Box>
                <Avatar alt={name} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={ref.current}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <MenuItem onClick={() => undefined}>Профиль</MenuItem>
              <MenuItem onClick={() => logout()}>Выйти</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderClient;
