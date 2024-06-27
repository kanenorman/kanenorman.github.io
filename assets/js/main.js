document.addEventListener("DOMContentLoaded", function () {
  new fullpage("#fullpage-what-is-ml", {
    navigation: true,
    scrollingSpeed: 700,
    navigationPosition: "right",
    licenseKey: "gplv3-license",
    anchors: ["what-is-machine-learning", "types-of-machine-learning"],
    navigationTooltips: [
      "What is Machine Learning",
      "Types of Machine Learning",
    ],
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
