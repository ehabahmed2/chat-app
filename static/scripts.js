/** @format */
document
  .querySelector(".toggle-chat-list")
  .addEventListener("click", function () {
    document.querySelector(".sidebar").classList.add("hidden");
    document.querySelector(".show-chat-list").style.display = "block";
  });

document
  .querySelector(".show-chat-list")
  .addEventListener("click", function () {
    document.querySelector(".sidebar").classList.remove("hidden");
    document.querySelector(".show-chat-list").style.display = "none";
  });

// Add event listeners for sending messages, joining/leaving chats, and other functionality
document
  .querySelector(".chat-input input")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

document
  .querySelector(".chat-input button")
  .addEventListener("click", sendMessage);

function sendMessage() {
  const messageInput = document.querySelector(".chat-input input");
  const message = messageInput.value.trim();
  if (message) {
    // Add the message to the chat
    addChatMessage(message);
    messageInput.value = "";
    // Send the message to the server
    // ...
  }
}

function addChatMessage(message) {
  const chatMessages = document.querySelector(".chat-messages");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", "sent");
  messageElement.innerHTML = `
      <div class="message-content">
        <p>${message}</p>
        <span class="timestamp">${new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}</span>
      </div>
    `;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add functionality for searching and joining/leaving chats
// ...
