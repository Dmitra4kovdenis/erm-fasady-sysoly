"use client";

import css from "./header.module.scss";
import IconButton from "@/components/icon-button/icon-button";
import { IconLogout } from "@/icons";
import Avatar from "@/components/avatar/avatar";

interface HeaderClientProps {
  name: string;
  role: string;
}

function HeaderClient({ name, role }: HeaderClientProps) {
  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login"; // перенаправляем на страницу логина
  }

  return (
    <div className={css.bg}>
      <div className={css.wrapper}>
        <div className={css.logo}>Фасады Сысолы</div>
        <div className={css.right}>
          <div className={css.user}>
            <Avatar title={name} />
            <div>
              <div className={css.email}>{name}</div>
              <div className={css.role}>{role}</div>
            </div>
          </div>
          <IconButton
            onClick={logout}
            icon={<IconLogout color="#fff" />}
            title="Выйти"
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderClient;
