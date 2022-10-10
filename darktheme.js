var themeBtn = document.querySelector("#themeBtn");
var themeSheet = document.querySelector("#theme-sheet");
var icon = document.getElementById("#sun");

function theme() {
    console.log("backgrpund changed");
    if(themeSheet.getAttribute("href") == "css/style.css") {
        themeSheet.href = "css/darktheme.css";
    } else {
        themeSheet.href = "css/style.css";
    }
    document.cookie = themeSheet;
}