class TypingEffect {
  constructor(
    elementId,
    messages,
    typingSpeed,
    erasingSpeed,
    pauseBeforeFirstMessage = 1000,
  ) {
    this.element = document.getElementById(elementId);
    this.messages = messages;
    this.typingSpeed = typingSpeed;
    this.erasingSpeed = erasingSpeed;
    this.pauseBeforeFirstMessage = pauseBeforeFirstMessage;
  }

  typeAndEraseMessages(index = 0) {
    if (index < this.messages.length) {
      const currentMessage = this.messages[index];
      const isLastMessage = index === this.messages.length - 1;

      // Pause before typing the first message
      if (index === 0) {
        setTimeout(() => {
          this.typeMessage(currentMessage, 0, () => {
            if (isLastMessage) {
              setTimeout(() => {
                this.typeAndEraseMessages(index + 1);
              }, 1000); // Delay before repeating
            } else {
              this.eraseMessage(currentMessage.length, () => {
                this.typeAndEraseMessages(index + 1);
              });
            }
          });
        }, this.pauseBeforeFirstMessage);
      } else {
        // No pause for messages other than the first one
        this.typeMessage(currentMessage, 0, () => {
          if (isLastMessage) {
            setTimeout(() => {
              this.typeAndEraseMessages(index + 1);
            }, 1000); // Delay before repeating
          } else {
            this.eraseMessage(currentMessage.length, () => {
              this.typeAndEraseMessages(index + 1);
            });
          }
        });
      }
    }
  }

  typeMessage(message, index, callback) {
    if (index < message.length) {
      this.element.textContent += message.charAt(index);
      setTimeout(() => {
        this.typeMessage(message, index + 1, callback);
      }, this.typingSpeed);
    } else {
      setTimeout(callback, 1000); // Delay before erasing or typing the next message
    }
  }

  eraseMessage(length, callback) {
    if (length > 0) {
      this.element.textContent = this.element.textContent.slice(0, -1);
      setTimeout(() => {
        this.eraseMessage(length - 1, callback);
      }, this.erasingSpeed);
    } else {
      setTimeout(callback, 2000); // Delay before typing the next message
    }
  }
}

const messages = [
  "Hello, I'm Kane. Welcome to my website!",
  "I'm a machine learning specialist based in the United States.",
  "Feel free to look around and contact me if you have any questions!",
];

const typingEffect = new TypingEffect("typed-message", messages, 50, 30);
typingEffect.typeAndEraseMessages();
