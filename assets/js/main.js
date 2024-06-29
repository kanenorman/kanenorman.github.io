document.addEventListener("DOMContentLoaded", function () {
  new fullpage("#fullpage-what-is-ml", {
    navigation: true,
    scrollingSpeed: 700,
    navigationPosition: "right",
    licenseKey: "gplv3-license",
    credits: {
      enabled: false,
    },
    navigationTooltips: [
      "What is ML? 🤷🏽‍♀️",
      "Types of ML 🔍",
      "An Example 👽",
      "Visualizing Data 📈",
      "Optimizing 🧭",
      "Training 🤖",
      "Predicting 🔮",
      "The Math 🧮",
      "Summary 🤓",
      "Credits 🏅 & References 📚",
    ],

    onLeave: (origin, destination, direction) => {
      if (destination.index === 3) {
        HeightWeightScatter.plot();
      }
      if (destination.index === 4) {
        HeightWeightScatterMultipleFits.plot();
      }
      if (destination.index === 5) {
        LinearRegressionPlot.plot();
      }
      if (destination.index === 6) {
        PredictionPlot.plot();
      }
    },
  });
});

window.addEventListener("scroll", function () {
  var header = document.getElementById("header");
  if (window.scrollY > 0) {
    header.classList.add("shadow");
  } else {
    header.classList.remove("shadow");
  }
});
