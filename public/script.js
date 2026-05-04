function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";

  const reply = getBotResponse(text.toLowerCase());
  setTimeout(() => addMessage("bot", reply), 300); // small delay = natural feel
}

function addMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");

  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 🔍 Utility: keyword matcher
function hasAny(msg, keywords) {
  return keywords.some(k => msg.includes(k));
}

// 🎯 Main logic
function getBotResponse(msg) {

  // 👋 greetings
  if (hasAny(msg, ["hi", "hello", "hey"])) {
    return "Hey there! 🐾 I'm your Bhairav Pet Care Assistant. Ask me about feeding, health, training, or grooming!";
  }

  // 🐶 puppy age detection
  if (hasAny(msg, ["month", "months", "year"])) {
    if (hasAny(msg, ["3", "three"])) {
      return "At 3 months, puppies should eat 3–4 small meals a day with high-quality puppy food 🐶.";
    }
    if (hasAny(msg, ["6", "six"])) {
      return "At 6 months, feed your puppy 2–3 times daily with balanced nutrition.";
    }
    if (hasAny(msg, ["8", "nine", "9"])) {
      return "At 8–9 months, your dog can move toward 2 meals a day with proper protein and nutrients.";
    }
  }

  // 🍖 feeding
  if (hasAny(msg, ["feed", "food", "eat", "diet"])) {
    return "Feed your pet high-quality food suited to their age. Puppies need more frequent meals, while adult dogs eat 2 times a day. Always provide fresh water 💧.";
  }

  // 🏥 health / sick
  if (hasAny(msg, ["sick", "vomit", "not eating", "ill", "weak"])) {
    return "If your pet is sick, monitor symptoms like vomiting, lethargy, or loss of appetite. If it continues, consult a vet immediately 🏥.";
  }

  // 💉 vaccination
  if (hasAny(msg, ["vaccine", "vaccination"])) {
    return "Vaccinations are crucial! Puppies need shots at 6, 9, and 12 weeks. Ask your vet for a proper schedule 💉.";
  }

  // 🧼 grooming
  if (hasAny(msg, ["groom", "bath", "clean"])) {
    return "Bathe your pet once every 3–4 weeks and brush regularly to keep their coat healthy ✨.";
  }

  // 🎓 training
  if (hasAny(msg, ["train", "training", "obedience"])) {
    return "Use positive reinforcement like treats and praise while training. Start early and be consistent 🎓.";
  }

  // 🐱 cat specific
  if (hasAny(msg, ["cat"])) {
    return "Cats need a balanced diet, clean litter box, and regular vet checkups. If your cat stops eating, consult a vet 🐱.";
  }

  // 🚨 emergency
  if (hasAny(msg, ["emergency", "bleeding", "injury"])) {
    return "In emergencies, keep your pet calm and go to the nearest vet immediately 🚑.";
  }

  // ❓ fallback (smart suggestions)
  return "I can help with:\n🐶 Feeding\n🏥 Health\n💉 Vaccination\n🎓 Training\n🧼 Grooming\n\nTry asking: 'What should I feed my puppy?'";
}
