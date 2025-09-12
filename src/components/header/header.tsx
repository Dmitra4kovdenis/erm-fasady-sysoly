"use client";

import Button from "@/components/button/button";

function Header() {
  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login"; // перенаправляем на страницу логина
  }

  return (
    <div>
      <Button onClick={logout}>Разлогин</Button>
    </div>
  );
}

export default Header;
