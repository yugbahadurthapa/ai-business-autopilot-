"use client";
import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generatePlan() {
    setLoading(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>AI Business Autopilot 🚀</h1>

      <textarea
        placeholder="Enter your business idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        style={{ width: "100%", height: 120 }}
      />

      <br /><br />

      <button onClick={generatePlan} disabled={loading}>
        {loading ? "Thinking..." : "Generate Business Plan"}
      </button>

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </main>
  );
}
