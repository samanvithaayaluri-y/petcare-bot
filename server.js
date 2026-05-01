import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// 🔥 Gemini call function (robust version)
async function callGemini(userMessage) {
  const models = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
    "gemini-pro"
  ];

  for (let model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a pet care assistant. Answer ONLY pet-related questions (dogs, cats, animals, feeding, health, training). 
If the question is not about pets, reply: "I can only help with pet care questions."

User: ${userMessage}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();
      console.log("Trying model:", model);
      console.log("Response:", data);

      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
      }

    } catch (err) {
      console.log("Model failed:", model);
    }
  }

  return "Sorry, AI service is temporarily unavailable.";
}

// 🚀 Chat route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const reply = await callGemini(userMessage);
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
