var themeBtn = document.querySelector("#themeBtn");
var themeSheet = document.querySelector("#theme-sheet");
var sunIcon = document.getElementById("sun");
var moonIcon = document.getElementById("moon");

function theme() {
    if (themeSheet.getAttribute("href") === "assets/css/style.css") {
    themeSheet.href = "assets/css/darktheme.css";
    document.cookie = "theme=dark; path=/; max-age=31536000";
    sunIcon.style.display = "inline-block";
    moonIcon.style.display = "none";
} else {
    themeSheet.href = "assets/css/style.css";
    document.cookie = "theme=light; path=/; max-age=31536000";
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline-block";
}
}

// Apply theme from cookie on page load
window.addEventListener("DOMContentLoaded", () => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=").map(c => c.trim());
        acc[key] = value;
        return acc;
    }, {});

    if (cookies.theme === "dark") {
        themeSheet.href = "assets/css/darktheme.css";
        sunIcon.style.display = "inline-block";
        moonIcon.style.display = "none";
    } else {
        themeSheet.href = "assets/css/style.css";
        sunIcon.style.display = "none";
        moonIcon.style.display = "inline-block";
    }
});

