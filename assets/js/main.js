document.addEventListener("DOMContentLoaded", function () {
  new fullpage("#fullpage-what-is-ml", {
    navigation: true,
    scrollingSpeed: 700,
    navigationPosition: "right",
    licenseKey: "gplv3-license",

    onLeave: (origin, destination, direction) => {
      if (destination.index === 3) {
        HeightWeightScatter.plot();
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
