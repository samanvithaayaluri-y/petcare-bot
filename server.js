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
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.1-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

    if (data.error) {
      console.error("Gemini API Error:", data.error.message);
      return res.status(500).json({ reply: "The pet assistant is currently resting. Please try again in a moment." });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't process that request.";

    res.json({ reply });

  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ reply: "Server error. Please check your connection." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
