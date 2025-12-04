function initializeFacilityView() {
    console.log("Facility View Initialized!");

    const API_BASE = "http://localhost:8080/api"; // 백엔드 포트에 맞게

    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const facilityList = document.querySelector('.facility-list');

    // 시설 카드 렌더링
    function renderFacilities(facilities) {
        if (!facilityList) return;

        facilityList.innerHTML = "";

        if (!facilities || facilities.length === 0) {
            facilityList.innerHTML = "<div>검색 결과가 없습니다.</div>";
            return;
        }

        facilities.forEach(f => {
            const card = document.createElement("div");
            card.className = "facility-card";

            const name = f.facilityName ?? "시설명 없음";
            const type = f.facilityType ?? "-";
            const sport = f.sportType ?? "-";
            const region = f.region ?? "-";
            const address = f.address ?? "-";

            card.innerHTML = `
                <div class="facility-name">${name}</div>
                <div class="facility-type">유형: ${type}</div>
                <div class="facility-location">지역: ${region}</div>
                <div class="facility-address">주소: ${address}</div>
                <div class="facility-sport">종목: ${sport}</div>
            `;
            facilityList.appendChild(card);
        });
    }

    // 검색 실행 함수
    async function doSearch() {
        const keyword = searchInput ? searchInput.value.trim() : "";

        try {
            const res = await fetch(
                `${API_BASE}/facilities/search?q=` + encodeURIComponent(keyword)
            );
            const data = await res.json();
            renderFacilities(data);
        } catch (err) {
            console.error(err);
            alert("시설 검색 중 오류가 발생했습니다.");
        }
    }

    // 버튼 클릭 & 엔터키 검색
    if (searchButton && searchInput) {
        searchButton.addEventListener("click", doSearch);
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                doSearch();
            }
        });
    }

    // 페이지 처음 로드 시 기본 목록 한 번 가져오기
    doSearch();
}
