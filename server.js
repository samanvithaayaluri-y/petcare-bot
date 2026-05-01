import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // fast + cheap + perfect for chatbot
        messages: [
          {
            role: "system",
            content: "You are a helpful pet care assistant. Only answer pet-related questions."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    console.log("OpenAI response:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't understand.";

    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    res.json({ reply: "Error connecting to AI service." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
