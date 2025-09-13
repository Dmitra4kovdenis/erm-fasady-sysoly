import { ReactNode } from "react";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import css from "./layout.module.scss";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={css.container}>
      <Header />
      <div className={css.wrapper}>
        <Sidebar />
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
