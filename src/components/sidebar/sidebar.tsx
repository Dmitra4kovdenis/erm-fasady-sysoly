import css from "./sidebar.module.scss";
import Link from "next/link";
import { IconEdit, IconList } from "@/icons";

function Sidebar() {
  return (
    <div className={css.wrapper}>
      <Link className={css.link} href="/add-order/">
        <IconEdit />
        Новый заказ
      </Link>
      <Link className={css.link} href="/order-list/">
        <IconList />
        Список заказов
      </Link>
    </div>
  );
}

export default Sidebar;
