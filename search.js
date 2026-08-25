const searchData = [
    {
        title: "記錄 第0001號",
        date: "2025.09.26",
        url: "records-0001.html"
    },

    {
    title: "記錄 第0002號",
    date: "2025.09.27",
    url: "records-0002.html"
},

    {
    title: "記錄 第0003號",
    date: "2025.09.28",
    url: "records-0003.html"
},

    {
        title: "2026年 06月",
        date: "2026.06",
        url: "records-2026-06.html"
    },

    {
        title: "2026年 07月",
        date: "2026.07",
        url: "records-2026-07.html"
    },

    {
        title: "2026年 08月",
        date: "2026.08",
        url: "records-2026-08.html"
    }
];


async function searchRecords() {

    const input = document.getElementById("searchInput");
    const keyword = input.value.trim();

    const results = document.getElementById("searchResults");

    results.innerHTML = "";


    if (!keyword) {
        results.innerHTML = `
            <p class="search-message">
                검색어를 입력하십시오.
            </p>
        `;
        return;
    }


    results.innerHTML = `
        <p class="search-message">
            검색 중...
        </p>
    `;


    const matches = [];


    for (const item of searchData) {

        try {

            const response = await fetch(item.url);

            if (!response.ok) {
                continue;
            }


            const html = await response.text();

            const parser = new DOMParser();

            const doc = parser.parseFromString(
                html,
                "text/html"
            );


            /*
             * 메뉴나 코드 같은 부분은 검색하지 않음
             */

            doc.querySelectorAll(
                "script, style, header, nav, footer"
            ).forEach(element => {
                element.remove();
            });


            const text = doc.body.innerText;

            const lowerText = text.toLowerCase();
            const lowerKeyword = keyword.toLowerCase();


            /*
             * 검색어 위치 찾기
             */

            const position =
                lowerText.indexOf(lowerKeyword);


            if (position === -1) {
                continue;
            }


            /*
             * 검색어가 포함된 부분만 가져오기
             *
             * 앞뒤 40자
             */

            const context = 40;


            const start = Math.max(
                0,
                position - context
            );


            const end = Math.min(
                text.length,
                position + keyword.length + context
            );


            let preview = text.substring(
                start,
                end
            );


            /*
             * 앞뒤가 잘렸다는 표시
             */

            if (start > 0) {
                preview = "…" + preview;
            }


            if (end < text.length) {
                preview += "…";
            }


            /*
             * HTML 특수문자 처리
             */

            const escapedPreview =
                preview
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");


            /*
             * 검색어 강조
             */

            const escapedKeyword =
                keyword
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");


            const highlightRegex =
                new RegExp(
                    escapedKeyword.replace(
                        /[.*+?^${}()|[\]\\]/g,
                        "\\$&"
                    ),
                    "gi"
                );


            const highlightedPreview =
                escapedPreview.replace(
                    highlightRegex,
                    match => `<mark>${match}</mark>`
                );


            matches.push({

                ...item,

                preview:
                    highlightedPreview

            });

        } catch (error) {

            console.error(
                "검색 실패:",
                item.url,
                error
            );

        }

    }


    results.innerHTML = "";


    /*
     * 결과 없음
     */

    if (matches.length === 0) {

        results.innerHTML = `
            <p class="search-message">
                검색 결과가 없습니다.
            </p>
        `;

        return;
    }


    /*
     * 결과 개수
     */

    const count =
        document.createElement("div");

    count.className =
        "search-count";

    count.textContent =
        `검색 결과 ${matches.length}건`;

    results.appendChild(count);


    /*
     * 결과 표시
     */

    matches.forEach(item => {

        const result =
            document.createElement("a");


        result.className =
            "search-result";


        result.href =
            item.url;


        result.innerHTML = `

            <div class="search-result-date">
                ${item.date}
            </div>

            <div class="search-result-title">
                ${item.title}
            </div>

            <div class="search-result-preview">
                ${item.preview}
            </div>

        `;


        results.appendChild(result);

    });

}
