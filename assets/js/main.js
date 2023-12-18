document.addEventListener("DOMContentLoaded", function () {
  new fullpage("#fullpage", {
    navigation: true,
    scrollingSpeed: 700,
    navigationPosition: "right",
    licenseKey: "gplv3-license",
    anchors: ["home", "about", "projects"],
    navigationTooltips: ["Home", "About", "Projects"],
  });

  const messages = [
    "Hello, welcome to my website!",
    "Feel free to look around and contact me if you have any questions!",
  ];
  const typingEffect = new TypingEffect("typed-message", messages, 50, 30);
  typingEffect.typeAndEraseMessages();
});
