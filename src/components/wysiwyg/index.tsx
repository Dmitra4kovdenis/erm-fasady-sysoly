import { ReactNode } from "react";
import "./styles.scss";

export function Wysiwyg({ children }: { children: ReactNode }) {
  return <div className="wysiwyg">{children}</div>;
}
