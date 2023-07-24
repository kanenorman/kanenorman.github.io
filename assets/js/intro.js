var words = [
  "Machine Learning",
  "Mathematics",
  "Computer Science",
  "Statistics",

];
var currentWordIndex = 1;

function updateWord() {
  var dynamicWord = document.getElementById("dynamic-word");

  // Fade out the word
  dynamicWord.style.animation = "fadeOut 1.5s";

  setTimeout(function () {
    dynamicWord.innerText = words[currentWordIndex];

    // Remove animation after fading out
    dynamicWord.style.animation = "none";

    // Trigger reflow/repaint to reset the animation
    dynamicWord.offsetHeight;

    // Fade in the new word
    dynamicWord.style.animation = "fadeIn 1.5s ";

    currentWordIndex++;
    if (currentWordIndex >= words.length) {
      currentWordIndex = 0;
    }
  }, 1000);
}

setInterval(updateWord, 3000);
