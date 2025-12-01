// Hardcode for now – later you can replace with Django user context
// const isUserLoggedIn = "{{ user.is_authenticated|yesno:'true,false' }}" === "true";
const isUserLoggedIn = false;

// Helper to get modal elements safely
function getAuthElements() {
  return {
    modal: document.getElementById("authModal"),
    loginSection: document.getElementById("loginSection"),
    signupSection: document.getElementById("signupSection"),
  };
}

// Called from the Login button: onclick="openAuthModal('login')"
function openAuthModal(view = "login") {
  const { modal } = getAuthElements();
  if (!modal) return;
  modal.style.display = "block";
  switchView(view);
}

function closeAuthModal() {
  const { modal } = getAuthElements();
  if (!modal) return;
  modal.style.display = "none";
}

function switchView(viewName) {
  const { loginSection, signupSection } = getAuthElements();
  if (!loginSection || !signupSection) return;

  if (viewName === "login") {
    loginSection.style.display = "block";
    signupSection.style.display = "none";
  } else {
    loginSection.style.display = "none";
    signupSection.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const { modal } = getAuthElements();
  const protectedLinks = document.querySelectorAll(".auth-guard");

  // Intercept clicks on protected links & show login modal
  protectedLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (!isUserLoggedIn) {
        e.preventDefault();
        openAuthModal("login");
      }
    });
  });

  // Close when clicking outside the modal
  window.addEventListener("click", function (event) {
    if (modal && event.target === modal) {
      closeAuthModal();
    }
  });
});
