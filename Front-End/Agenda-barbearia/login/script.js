  const API_URL = "http://localhost:8080";

  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const login = document.getElementById("login-login").value;
        const password = document.getElementById("login-password").value;

        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password }),
          });

          if (!res.ok) throw new Error("Falha no login");

          const data = await res.json();
          localStorage.setItem("token", data.token);
          window.location.href = "../home/index.html";
        } catch (err) {
          alert("Erro ao logar: " + err.message);
        }
      });
    }

    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("register-name").value;
        const login = document.getElementById("register-login").value;
        const password = document.getElementById("register-password").value;
        const role = document.getElementById("role").value;

        try {
          const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({login, name, password, role }),
          });

          if (!res.ok) throw new Error("Falha no registro");

          alert("Registrado com sucesso! Faça login.");
          window.location.href = "index.html";
        } catch (err) {
          alert("Erro ao registrar: " + err.message);
        }
      });
    }

    const btnSignin = document.getElementById("signin");
    const btnSignup = document.getElementById("signup");
    const body = document.querySelector("body");

    if (btnSignin && btnSignup && body) {
      btnSignin.addEventListener("click", () => {
        body.className = "sign-in-js";
      });

      btnSignup.addEventListener("click", () => {
        body.className = "sign-up-js";
      });
    }
  });
