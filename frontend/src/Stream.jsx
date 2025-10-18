import React, { useEffect, useState } from "react";

export default function Stream() {
  const [text, setText] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/stream");

    eventSource.onmessage = (e) => {
      setText((prev) => prev + e.data); // append chunks as they arrive
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return <div>{text}</div>;
}
