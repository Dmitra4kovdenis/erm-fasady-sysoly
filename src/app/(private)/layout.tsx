import { ReactNode } from "react";
import Header from "@/components/header/header";
import css from "./layout.module.scss";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={css.container}>
      <Header />
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default Layout;
