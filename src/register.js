// frontend/styles/register.js

document.addEventListener("DOMContentLoaded", () => {
  const API_BASE = "http://localhost:8080/api"; // 백엔드 포트에 맞게 수정

  const emailInput = document.getElementById("reg-email");
  const nameInput = document.getElementById("reg-name");
  const pwInput = document.getElementById("reg-password");
  const pw2Input = document.getElementById("reg-password2");

  const errorBox = document.getElementById("register-error");
  const successBox = document.getElementById("register-success");
  const messageBox = document.getElementById("register-message");
  const registerBtn = document.getElementById("register-btn");

  function showError(msg) {
    if (errorBox) {
      errorBox.style.display = "block";
      errorBox.textContent = msg;
    }
    if (successBox) {
      successBox.style.display = "none";
      successBox.textContent = "";
    }
    if (messageBox) {
      messageBox.style.display = "none";
      messageBox.textContent = "";
    }
  }

  function showSuccess(msg) {
    if (successBox) {
      successBox.style.display = "block";
      successBox.textContent = msg;
    }
    if (errorBox) {
      errorBox.style.display = "none";
      errorBox.textContent = "";
    }
    if (messageBox) {
      messageBox.style.display = "none";
      messageBox.textContent = "";
    }
  }

  function showInfo(msg) {
    if (messageBox) {
      messageBox.style.display = "block";
      messageBox.textContent = msg;
    }
  }

  if (!registerBtn) return;

  registerBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    const password = pwInput.value.trim();
    const password2 = pw2Input.value.trim();

    // 기본 검증
    if (!email || !name || !password || !password2) {
      showError("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== password2) {
      showError("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    if (password.length < 4) {
      showError("비밀번호는 최소 4자 이상이어야 합니다.");
      return;
    }

    // 서버로 회원가입 요청
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // HTTP 코드가 400/500 일 때
        const msg = data && data.message ? data.message : "회원가입에 실패했습니다.";
        showError(msg);
        return;
      }

      if (data && data.success) {
        showSuccess(data.message || "회원가입이 완료되었습니다.");
        showInfo("잠시 후 로그인 페이지로 이동합니다...");

        // 필요하다면 여기서 data.user 를 localStorage에 저장해도 됨
        // localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      } else {
        const msg = data && data.message ? data.message : "회원가입에 실패했습니다.";
        showError(msg);
      }
    } catch (err) {
      console.error(err);
      showError("서버에 연결할 수 없습니다. 백엔드가 실행 중인지 확인해주세요.");
    }
  });
});
