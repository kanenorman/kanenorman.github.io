document.addEventListener("DOMContentLoaded", function () {
  new fullpage("#fullpage-what-is-ml", {
    navigation: true,
    scrollingSpeed: 700,
    navigationPosition: "right",
    licenseKey: "gplv3-license",
    paddingTop: "50px",
    anchors: ["what-is-machine-learning", "types-of-machine-learning"],
    navigationTooltips: [
      "What is Machine Learning",
      "Types of Machine Learning",
    ],
  });
});
