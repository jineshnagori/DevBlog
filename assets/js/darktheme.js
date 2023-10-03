var themeBtn = document.querySelector("#themeBtn");
var themeSheet = document.querySelector("#theme-sheet");

function theme() {
    console.log("background changed");
    if (themeSheet.getAttribute("href") == "assets/css/style.css") {
        themeSheet.href = "assets/css/darktheme.css";
    } else {
        themeSheet.href = "assets/css/style.css";
    }
    document.cookie = themeSheet;
}
