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
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { getInitials } from "@/utils";
import { useUserData } from "@/prisma-helpers/user-data/user-data.provider";

function HeaderClient() {
  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/auth/login"; // перенаправляем на страницу логина
  }

  const { role, name, roleTitle } = useUserData();

  const [isOpen, setIsOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            component={Link}
            href={"/"}
            variant="h6"
            sx={{ lineHeight: 1 }}
          >
            Фасады Сысолы (v1.0.6)
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: 6,
              gap: 2,
            }}
          >
            {role === "admin" && (
              <Button
                component={Link}
                href="/add-order"
                sx={{ color: "white" }}
              >
                Добавить заказ
              </Button>
            )}
            <Button component={Link} href="/order-list" sx={{ color: "white" }}>
              Список заказов
            </Button>
            <Button component={Link} href="/kanban" sx={{ color: "white" }}>
              Доска
            </Button>
            {role === "admin" && (
              <Button component={Link} href="/reports" sx={{ color: "white" }}>
                Отчеты
              </Button>
            )}
            {role === "admin" && (
              <Button component={Link} href="/workers" sx={{ color: "white" }}>
                Команда
              </Button>
            )}
            {role === "admin" && (
              <Button
                component={Link}
                href="/customers"
                sx={{ color: "white" }}
              >
                Заказчики
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, ml: 0 }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {role === "admin" && (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href="/add-order"
                >
                  Добавить заказ
                </MenuItem>
              )}
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                href="/order-list"
              >
                Список заказов
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                href="/kanban"
              >
                Доска
              </MenuItem>
              {role === "admin" && (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href="/reports"
                >
                  Отчеты
                </MenuItem>
              )}
              {role === "admin" && (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href="/workers"
                >
                  Команда
                </MenuItem>
              )}
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                href="/customers"
              >
                Заказчики
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0, ml: "2" }}>
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
                  <Typography variant="caption">{roleTitle}</Typography>
                </Box>
                <Avatar src="/static/images/avatar/2.jpg">
                  {getInitials(name)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar-user"
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
              {role === "admin" && (
                <MenuItem component={Link} href="/admins">
                  Администраторы
                </MenuItem>
              )}
              <MenuItem onClick={() => logout()}>Выйти</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderClient;
