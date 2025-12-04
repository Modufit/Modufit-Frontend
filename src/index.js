document.addEventListener('DOMContentLoaded', function () {

    const menuItems = document.querySelectorAll('.menu-item');
    const chatItems = document.querySelectorAll('.chat-item');
    const mainArea = document.querySelector('#main-area');

    // ⭐ 공통: 외부 파일 로드 함수
    function loadPage(path) {
        fetch(path)
            .then(res => res.text())
            .then(html => {
                mainArea.innerHTML = html;
            })
            .catch(() => {
                mainArea.innerHTML = `<div class="error-view">파일 로드 실패: ${path}</div>`;
            });
    }

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

    // ⭐ 메뉴 클릭 시
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(i => i.classList.remove('active'));
            chatItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const id = item.dataset.id;

            switch (id) {
                case 'menu-facility':
                    loadPage('/src/pages/main.html');
                    break;

                case 'menu-reservation':
                    loadPage('/src/pages/reservation.html');
                    break;

                case 'menu-chat':
                    loadPage('/src/pages/chat-list.html');
                    break;

                case 'menu-info':
                    loadPage('/src/pages/info.html');
                    break;

                default:
                    mainArea.innerHTML = '<p>잘못된 메뉴입니다.</p>';
            }
        });
    });

    // ⭐ 채팅 클릭 시
    chatItems.forEach(item => {
        item.addEventListener('click', function () {
            chatItems.forEach(i => i.classList.remove('active'));
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const chatId = item.dataset.chat;

            // chat.html 로 로드 (필요하면 chatId를 querystring으로 전달)
            loadPage(`/src/pages/chat.html?chatId=${chatId}`);
        });
    });

    // ⭐ 초기 화면 로드 (시설 및 프로그램)
    loadPage('/src/pages/main.html');
    document.querySelector('.menu-item[data-id="menu-facility"]').classList.add('active');
});
