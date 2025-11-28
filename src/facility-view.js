// facility-view.js

document.addEventListener('DOMContentLoaded', function() {
    // 주의: 이 스크립트는 facility-view.html이 로드될 때 실행되어야 합니다.
    // fetch 방식으로 로드할 경우, 별도의 초기화 함수를 정의해야 합니다.
});


/**
 * 시설 및 프로그램 뷰가 로드된 후 실행될 초기화 함수
 * (script.js에서 호출되어야 합니다.)
 */
function initializeFacilityView() {
    console.log("Facility View Initialized!");

    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const filterButton = document.querySelector('.filter-button');
    
    // 1. 검색 기능 이벤트 리스너
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            alert(`시설 검색: ${searchInput.value}`);
            // 실제로는 여기에 AJAX 호출 및 목록 업데이트 로직이 들어갑니다.
        });
    }

    // 2. 필터 기능 이벤트 리스너
    if (filterButton) {
        filterButton.addEventListener('click', () => {
            alert("필터 메뉴를 표시합니다.");
            // 실제로는 드롭다운 메뉴를 토글하는 로직이 들어갑니다.
        });
    }
    
    // 3. 시설 카드 클릭 이벤트 리스너 (예시)
    document.querySelectorAll('.facility-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            alert(`${index + 1}번 시설 상세 정보를 봅니다.`);
        });
    });
}