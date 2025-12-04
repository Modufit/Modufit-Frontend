const API_BASE = "http://localhost:4000/api";

function showMessage(elementId, text) {
  const el = document.getElementById(elementId);
  if (!el) return;
  if (!text) {
    el.style.display = "none";
    el.textContent = "";
  } else {
    el.style.display = "block";
    el.textContent = text;
  }
}

document.addEventListener("DOMContentLoaded", () => {

const API_BASE = "http://localhost:8080/api"; // 🔥 포트 수정 필요 시 여기에

const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message ?? "응답 받음");

        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "../pages/main.html";  
        } else {
            showMessage("login-message", data.message);
        }
    })
    .catch(err => {
        console.error(err);
        showMessage("login-message", "서버 연결 실패");
    });
});

});


// 메인 페이지 공통
const isMainPage = window.location.pathname.endsWith("main.html");
const userJson = localStorage.getItem("modufitUser");

if (isMainPage) {
  if (!userJson) {
    window.location.href = "index.html";
  } else {
    const user = JSON.parse(userJson);
    const nameLabel = document.getElementById("user-name-label");
    const sidebarName = document.getElementById("sidebar-user-name");
    if (nameLabel) nameLabel.textContent = `${user.name} 님`;
    if (sidebarName) sidebarName.textContent = user.name;
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("modufitUser");
      window.location.href = "index.html";
    });
  }

  const chatInput = document.getElementById("chat-input");
  const chatSendBtn = document.getElementById("chat-send-btn");
  const chatMessages = document.getElementById("chat-messages");

  function appendUserMessage(text) {
    const div = document.createElement("div");
    div.className = "chat-bubble user";
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  if (chatSendBtn && chatInput && chatMessages) {
    chatSendBtn.addEventListener("click", () => {
      const text = chatInput.value.trim();
      if (!text) return;
      appendUserMessage(text);
      chatInput.value = "";
    });

    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        chatSendBtn.click();
      }
    });
  }
}
