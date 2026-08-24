const searchData = [
    {
        title: "記錄 第0001號",
        date: "2025.09.26",
        url: "records-0001.html"
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

    const input =
        document.getElementById("searchInput");

    const keyword =
        input.value.trim();


    const results =
        document.getElementById("searchResults");


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

            const response =
                await fetch(item.url);

            if (!response.ok) {
                continue;
            }


            const html =
                await response.text();


            const parser =
                new DOMParser();

            const doc =
                parser.parseFromString(
                    html,
                    "text/html"
                );


            /*
             * 검색할 필요가 없는 부분 제거
             */

            doc.querySelectorAll(
                "script, style, header, nav, footer"
            ).forEach(element => {
                element.remove();
            });


            const text =
                doc.body.innerText;


            /*
             * 문장 단위로 나누기
             *
             * 줄바꿈 또는 문장부호를 기준으로
             * 검색어가 포함된 문장을 찾음
             */

            const sentences =
                text.split(
                    /(?<=[.!?。！？])\s+|\n+/
                );


            /*
             * 검색어가 포함된 문장 찾기
             */

            const foundSentence =
                sentences.find(sentence =>
                    sentence
                        .toLowerCase()
                        .includes(
                            keyword.toLowerCase()
                        )
                );


            if (!foundSentence) {
                continue;
            }


            /*
             * 검색어 하이라이트
             */

            const escapedKeyword =
                keyword.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                );


            const highlightRegex =
                new RegExp(
                    escapedKeyword,
                    "gi"
                );


            const highlightedSentence =
                foundSentence.replace(
                    highlightRegex,
                    match =>
                        `<mark>${match}</mark>`
                );


            matches.push({

                ...item,

                preview:
                    highlightedSentence.trim()

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
     * 검색 결과 없음
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
     * 검색 결과 개수
     */

    const count =
        document.createElement("div");

    count.className =
        "search-count";

    count.textContent =
        `검색 결과 ${matches.length}건`;

    results.appendChild(count);


    /*
     * 검색 결과 표시
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
