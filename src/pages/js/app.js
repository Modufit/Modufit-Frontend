import { apiFetch } from "./api.js";
import { saveToken, clearToken, isLoggedIn } from "./auth.js";
import { API_BASE_URL } from "./config.js";

const path = window.location.pathname.toLowerCase();

async function handleLoginPage() {
  const form = document.getElementById("loginForm");
  const result = document.getElementById("result");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    result.textContent = "Logging in...";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Login failed: HTTP ${res.status} - ${text}`);
      }

      const data = await res.json();
      // { tokenType: "Bearer", accessToken: "..." }
      saveToken(data.accessToken);

      result.textContent = "Login success. Redirecting to index.html ...";
      window.location.href = "./main.html";
    } catch (err) {
      result.textContent = String(err);
    }
  });
}

async function handleIndexPage() {
  const out = document.getElementById("output");
  const callBtn = document.getElementById("callApiBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!out || !callBtn || !logoutBtn) return;

  if (!isLoggedIn()) {
    out.textContent = "토큰이 없습니다. login.html로 이동합니다.";
    window.location.href = "./login.html";
    return;
  }

  callBtn.addEventListener("click", async () => {
    out.textContent = "Calling /api/hello ...";
    try {
      const data = await apiFetch("/api/hello", { method: "GET" });
      out.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      out.textContent = String(err);
    }
  });

  logoutBtn.addEventListener("click", () => {
    clearToken();
    out.textContent = "Logged out. Redirecting to login.html ...";
    window.location.href = "./login.html";
  });
}

if (path.endsWith("/login.html") || path.endsWith("login.html")) {
  handleLoginPage();
} else {
  // index.html 또는 기타 페이지로 가정
  handleIndexPage();
}
