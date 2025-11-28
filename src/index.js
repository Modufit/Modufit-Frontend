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
