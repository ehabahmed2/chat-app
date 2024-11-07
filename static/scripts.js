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

// Handle message input
const chatInput = document.querySelector(".chat-input input");
const chatForm = document.querySelector(".chat-input form");

if (chatInput && chatForm) {
  // Debugging: Log target element
  console.log("Target element:", document.querySelector("#chat_messages"));

  // Prevent default form submission on Enter key
  chatInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      // Use HTMX to submit the form
      htmx.trigger(chatForm, "submit");
    }
  });

  // Error handling for HTMX
  chatForm.addEventListener("htmx:targetError", function (event) {
    console.error("HTMX Target Error:", event);
    alert("Could not find the target element to update.");
  });

  // Optional: Clear input after successful submission
  chatForm.addEventListener("htmx:afterRequest", function () {
    chatInput.value = ""; // Clear input after sending
  });
}

// Global HTMX error handling
document.body.addEventListener("htmx:error", function (event) {
  console.error("HTMX Error:", event);
  alert("An error occurred while processing your request.");
});

document.addEventListener("DOMContentLoaded", function () {
  // Function to scroll to the bottom of the chat messages
  function scrollToBottom() {
    const chatMessages = document.querySelector("#chat_messages");
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  // Scroll to bottom on page load
  scrollToBottom();

  // Listen for new messages and scroll to bottom
  document.body.addEventListener("htmx:afterRequest", function (event) {
    scrollToBottom();
  });
});
