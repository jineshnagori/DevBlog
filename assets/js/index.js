// All DOM-based logic in a single event listener
document.addEventListener('DOMContentLoaded', () => {
  // Dynamically setting year in footer
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Login/Signup form switch logic
  const loginText = document.querySelector(".title-text .login");
  const loginForm = document.querySelector("form.login");
  const loginBtn = document.querySelector("label.login");
  const signupBtn = document.querySelector("label.signup");
  const signupLink = document.querySelector("form .signup-link a");

  if (signupBtn && loginForm && loginText && loginBtn && signupLink) {
    signupBtn.onclick = () => {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    };
    loginBtn.onclick = () => {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    };
    signupLink.onclick = () => {
      signupBtn.click();
      return false;
    };
  }

  // Cursor follower logic (if circle exists)
  const follower = document.getElementById("circle");
  if (follower) {
    window.addEventListener("mousemove", (details) => {
      const { clientY: y, clientX: x } = details;
      setTimeout(() => {
        follower.style.top = `${y}px`;
        follower.style.left = `${x}px`;
      }, 50);
    });
  }

  // 🌟 Back to Top Button
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
