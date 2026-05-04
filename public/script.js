function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim().toLowerCase();

  if (!text) return;

  addMessage("user", text);
  input.value = "";

  const reply = getBotResponse(text);
  addMessage("bot", reply);
}

function addMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");

  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(message) {

  if (message.includes("hi") || message.includes("hello")) {
    return "Hello! 🐾 I’m your pet care assistant. Ask me anything about pets!";
  }

  if (message.includes("feed") || message.includes("food")) {
    return "For puppies, feed high-quality dog food 3–4 times a day. Ensure fresh water is always available.";
  }

  if (message.includes("cat") && message.includes("not eating")) {
    return "If your cat is not eating, it could be stress or illness. Monitor for 24 hours and consult a vet if it continues.";
  }

  if (message.includes("dog") && message.includes("sick")) {
    return "If your dog is sick, look for symptoms like vomiting or lethargy and consult a veterinarian immediately.";
  }

  if (message.includes("vaccination")) {
    return "Puppies need vaccinations at 6, 9, and 12 weeks. Consult your vet for a proper schedule.";
  }

  if (message.includes("train") || message.includes("training")) {
    return "Start training early using positive reinforcement like treats and praise.";
  }

  return "I can help with pet care like feeding, training, and health. Try asking something like 'What should I feed my puppy?' 🐶";
} 
