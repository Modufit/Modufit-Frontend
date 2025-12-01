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

// 로그인
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    showMessage("login-error", "");

    if (!email || !password) {
      showMessage("login-error", "이메일과 비밀번호를 입력해주세요.");
      return;
    }

    loginBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        showMessage("login-error", data.message || "로그인에 실패했습니다.");
        loginBtn.disabled = false;
        return;
      }

      localStorage.setItem("modufitUser", JSON.stringify(data.user));
      window.location.href = "main.html";
    } catch (err) {
      console.error(err);
      showMessage("login-error", "서버 오류가 발생했습니다.");
      loginBtn.disabled = false;
    }
  });
}

// 회원가입
const registerBtn = document.getElementById("register-btn");
if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    const email = document.getElementById("reg-email").value.trim();
    const name = document.getElementById("reg-name").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const password2 = document.getElementById("reg-password2").value.trim();

    showMessage("register-error", "");
    showMessage("register-success", "");

    if (!email || !name || !password || !password2) {
      showMessage("register-error", "모든 필드를 입력해주세요.");
      return;
    }

    if (password !== password2) {
      showMessage("register-error", "비밀번호가 일치하지 않습니다.");
      return;
    }

    registerBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!data.success) {
        showMessage("register-error", data.message || "회원가입에 실패했습니다.");
        registerBtn.disabled = false;
        return;
      }

      showMessage(
        "register-success",
        "회원가입이 완료되었습니다. 로그인 페이지로 이동해주세요."
      );
      registerBtn.disabled = false;
    } catch (err) {
      console.error(err);
      showMessage("register-error", "서버 오류가 발생했습니다.");
      registerBtn.disabled = false;
    }
  });
}

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
