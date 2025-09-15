"use client";

import css from "./header.module.scss";
import { IconEdit, IconList, IconLogout } from "@/icons";
import Avatar from "@/components/avatar/avatar";
import { useRef, useState } from "react";
import Button from "@/components/button/button";
import useClickOutside from "@/hooks/click-outside";
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
    <div className={css.bg}>
      <div className={css.wrapper}>
        <Link href="/" className={css.logo}>
          Фасады Сысолы
        </Link>
        <div className={css.center}>
          <Link className={css.link} href="/add-order/">
            <IconEdit />
            Новый заказ
          </Link>
          <Link className={css.link} href="/order-list/">
            <IconList />
            Список заказов
          </Link>
        </div>
        <div className={css.right}>
          <div className={css.user} onClick={() => setIsOpen(!isOpen)}>
            <div>
              <div className={css.email}>{name}</div>
              <div className={css.role}>{role}</div>
            </div>
            <Avatar title={name} />
          </div>
        </div>
        {isOpen && (
          <div className={css.modal} ref={ref}>
            <Button
              variant="outline"
              onClick={logout}
              startIcon={<IconLogout />}
            >
              Выйти
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderClient;
