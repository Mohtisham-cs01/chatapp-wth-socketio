document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    // Prompt for the user's name
    const userName = prompt("Please enter your name:");
    if (!userName) {
        alert("Please enter a name to join the chat.");
        window.location.reload();
    }

    socket.emit("new-user", userName);

    const chatWindow = document.getElementById("chat-window");
    const messageInput = document.getElementById("message");
    const sendForm = document.getElementById("sendForm");

    // sendButton.addEventListener("click", () => {
    //     const message = messageInput.value;
    //     if (message) {
    //         socket.emit("send-message", { userName, message });
    //         displayMessage(userName, message, true);
    //         messageInput.value = "";
    //     }
    // });

    sendForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const message = messageInput.value;
        if (message) {
            socket.emit("send-message", { userName, message });
            displayMessage(userName, message, true);
            messageInput.value = "";
        }
    });

    socket.on("receive-message", (data) => {
        const { userName, message } = data;
        displayMessage(userName, message, false);
    });

    function displayMessage(userName, message, isCurrentUser) {
        const messageElement = document.createElement("div");
        messageElement.className = isCurrentUser ? "message right" : "message left";
        messageElement.innerHTML = `<strong>${userName}:</strong> ${message}`;
        chatWindow.appendChild(messageElement);
    }
});
