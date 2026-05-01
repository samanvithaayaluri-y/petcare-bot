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
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

    const data = await response.json();

    console.log("Gemini response:", data);

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
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
