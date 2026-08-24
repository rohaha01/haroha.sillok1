const searchData = [
    {
        title: "記錄 第0001號",
        date: "2025.09.26",
        description: "하로하 관련 첫 번째 기록",
        url: "records-0001.html"
    },

    {
        title: "2025年 09月",
        date: "2025.09",
        description: "2025년 9월의 차사일지 기록",
        url: "records-2025-09.html"
    },

    {
        title: "2026年 06月",
        date: "2026.06",
        description: "2026년 6월의 차사일지 기록",
        url: "records-2026-06.html"
    },

    {
        title: "2026年 07月",
        date: "2026.07",
        description: "2026년 7월의 차사일지 기록",
        url: "records-2026-07.html"
    },

    {
        title: "2026年 08月",
        date: "2026.08",
        description: "2026년 8월의 차사일지 기록",
        url: "records-2026-08.html"
    }
];


function searchRecords() {

    const input = document.getElementById("searchInput");

    const keyword = input.value
        .trim()
        .toLowerCase();

    const results = document.getElementById("searchResults");

    results.innerHTML = "";


    if (keyword === "") {

        results.innerHTML = `
            <p class="search-message">
                검색어를 입력하십시오.
            </p>
        `;

        return;
    }


    const matched = searchData.filter(item => {

        return (
            item.title.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword) ||
            item.date.toLowerCase().includes(keyword)
        );

    });


    if (matched.length === 0) {

        results.innerHTML = `
            <p class="search-message">
                검색 결과가 없습니다.
            </p>
        `;

        return;
    }


    matched.forEach(item => {

        const result = document.createElement("a");

        result.className = "search-result";

        result.href = item.url;

        result.innerHTML = `
            <div class="search-result-date">
                ${item.date}
            </div>

            <div class="search-result-title">
                ${item.title}
            </div>

            <div class="search-result-description">
                ${item.description}
            </div>
        `;

        results.appendChild(result);

    });

}
