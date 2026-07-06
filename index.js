import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send(`
    <h1>AI Business Autopilot 🚀</h1>
    <p>Type your business idea in /ask</p>
  `);
});

app.post("/ask", async (req, res) => {
  const userIdea = req.body.idea;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a business automation AI." },
      { role: "user", content: userIdea }
    ]
  });

  res.json({
    result: response.choices[0].message.content
  });
});

app.listen(3000, () => {
  console.log("AI Business Autopilot running on port 3000");
});
