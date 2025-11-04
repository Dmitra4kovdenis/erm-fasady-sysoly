// app/global-error.tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <h1>500 - Критическая ошибка приложения</h1>
          <div
            style={{
              background: "#f5f5f5",
              padding: "15px",
              borderRadius: "5px",
              margin: "10px 0",
            }}
          >
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
                  fontSize: "12px",
                }}
              >
                {error.stack}
              </pre>
            </>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              background: "#007acc",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            На главную
          </button>
        </div>
      </body>
    </html>
  );
}
