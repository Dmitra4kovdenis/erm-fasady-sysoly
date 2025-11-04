"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>500 - Ошибка сервера</h1>
      <div
        style={{
          background: "#f5f5f5",
          padding: "15px",
          borderRadius: "5px",
          margin: "10px 0",
          fontSize: "14px",
        }}
      >
        <h3>Информация об ошибке:</h3>
        <p>
          <strong>Сообщение:</strong> {error.message}
        </p>
        <p>
          <strong>Digest:</strong> {error.digest || "N/A"}
        </p>
        <>
          <p>
            <strong>Stack:</strong>
          </p>
          <pre
            style={{
              background: "#fff",
              padding: "10px",
              borderRadius: "3px",
              overflow: "auto",
            }}
          >
            {error.stack}
          </pre>
        </>
      </div>
      <button
        onClick={reset}
        style={{
          background: "#007acc",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Попробовать снова
      </button>
    </div>
  );
}
