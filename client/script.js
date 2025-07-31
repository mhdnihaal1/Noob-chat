document.addEventListener("DOMContentLoaded", () => {
    const socket = io("https://noob-chat-1.onrender.com");

    const messageForm = document.getElementById("send-container");
    const messageInput = document.getElementById("message-input");
    const messageContainer = document.getElementById("message-container");

    // Wait until connected to the server
    socket.on("connect", () => {
        const name = prompt("What is your name?");
        appendMessage("You are joined");
        socket.emit("new-user", name);
    });

    socket.on("chat-message", data => {
        appendMessage(`${data.name}: ${data.message}`);
    });

    socket.on("user-connected", name => {
        appendMessage(`${name}: connected`);
    });

    socket.on("user-disconnected", name => {
        appendMessage(`${name}: disconnected`);
    });

    messageForm.addEventListener("submit", e => {
        e.preventDefault();
        const message = messageInput.value;
        appendMessage(`Your: ${message}`);
        socket.emit("send-chat-message", message);
        messageInput.value = '';
    });

    function appendMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.innerText = message;
        messageContainer.append(messageElement);
    }
});
