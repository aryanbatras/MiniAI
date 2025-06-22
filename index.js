// app.js
import * as webllm from "./webllm"; // Adjust path as needed

let chat;
const loader = document.getElementById("loader");
const chatUI = document.getElementById("chatContainer");
const progressBar = document.getElementById("loadProgress");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

async function initAI() {
  const engine = new webllm.MLCChat();
  engine.setInitProgressCallback((percent) => {
    progressBar.value = percent * 100;
  });

  await engine.reload("Llama-3-8B-Instruct-q4f16_1"); // You can change the model
  chat = engine;
  loader.style.display = "none";
  chatUI.style.display = "flex";
}

sendBtn.onclick = async () => {
  const msg = userInput.value.trim();
  if (!msg) return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.textContent = "👤: " + msg;
  chatBox.appendChild(userMsg);
  userInput.value = "";

  // Get AI response
  const replyDiv = document.createElement("div");
  replyDiv.textContent = "🤖: ...thinking";
  chatBox.appendChild(replyDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  const response = await chat.chat(msg);
  replyDiv.textContent = "🤖: " + response;
  chatBox.scrollTop = chatBox.scrollHeight;
};

initAI();
