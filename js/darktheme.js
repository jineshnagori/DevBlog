var themeBtn = document.querySelector("#themeBtn");
var themeSheet = document.querySelector("#theme-sheet");

function theme() {
    console.log("background changed");
    if(themeSheet.getAttribute("href") == "css/style.css") {
        themeSheet.href = "css/darktheme.css";
    } else {
        themeSheet.href = "css/style.css";
    }
    document.cookie = themeSheet;
}
