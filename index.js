document
  .getElementsByClassName("fa-bars")[0]
  .addEventListener("click", function () {
    document.querySelector(".nav-links").style.right = "0px";
  });

document
  .getElementsByClassName("fa-times")[0]
  .addEventListener("click", function () {
    document.querySelector(".nav-links").style.right = "-220px";
  });
