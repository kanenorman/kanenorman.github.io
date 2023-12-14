const messageElement = document.getElementById("typed-message");
const messages = [
  "Hello, this is message 1.",
  "This is message 2.",
  "And here's message 3.",
];
const typingSpeed = 50; // Adjust typing speed (characters per second)
const erasingSpeed = 30; // Adjust erasing speed (characters per second)

function typeAndEraseMessages(index) {
  if (index < messages.length) {
    const currentMessage = messages[index];
    if (index === messages.length - 1) {
      // For the last message, just type it without erasing
      typeMessage(currentMessage, 0, () => {
        setTimeout(() => {
          typeAndEraseMessages(index + 1);
        }, 1000); // Delay before typing the next message
      });
    } else {
      typeMessage(currentMessage, 0, () => {
        eraseMessage(currentMessage.length, () => {
          typeAndEraseMessages(index + 1);
        });
      });
    }
  }
}

function typeMessage(message, index, callback) {
  if (index < message.length) {
    messageElement.textContent += message.charAt(index);
    setTimeout(function () {
      typeMessage(message, index + 1, callback);
    }, typingSpeed);
  } else {
    setTimeout(callback, 1000); // Delay before erasing or typing the next message
  }
}

function eraseMessage(length, callback) {
  if (length > 0) {
    const currentMessage = messageElement.textContent;
    messageElement.textContent = currentMessage.slice(0, -1);
    setTimeout(function () {
      eraseMessage(length - 1, callback);
    }, erasingSpeed);
  } else {
    setTimeout(callback, 1000); // Delay before typing the next message
  }
}


typeAndEraseMessages(0);
