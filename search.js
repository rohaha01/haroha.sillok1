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
        input.value.trim().toLowerCase();

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

            const html =
                await response.text();


            const parser =
                new DOMParser();

            const document =
                parser.parseFromString(
                    html,
                    "text/html"
                );


            /*
             * 실제 본문만 검색하기 위해
             * script / style / header / nav 등을 제외
             */

            document
                .querySelectorAll(
                    "script, style, header, nav"
                )
                .forEach(element => {
                    element.remove();
                });


            const text =
                document.body.innerText
                    .toLowerCase();


            if (text.includes(keyword)) {

                matches.push({
                    ...item,
                    content: text
                });

            }

        } catch (error) {

            console.error(
                "검색 실패:",
                item.url,
                error
            );

        }

    }


    results.innerHTML = "";


    if (matches.length === 0) {

        results.innerHTML = `
            <p class="search-message">
                검색 결과가 없습니다.
            </p>
        `;

        return;
    }


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

const originalText =
    document.body.innerText;

const lowerText =
    originalText.toLowerCase();

const position =
    lowerText.indexOf(keyword);


if (position !== -1) {

    const previewLength = 100;

    const start =
        Math.max(
            0,
            position - previewLength
        );

    const end =
        Math.min(
            originalText.length,
            position + keyword.length + previewLength
        );

    let preview =
        originalText.substring(
            start,
            end
        );


    if (start > 0) {
        preview = "…" + preview;
    }

    if (end < originalText.length) {
        preview += "…";
    }


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


    preview =
        preview.replace(
            highlightRegex,
            match => `<mark>${match}</mark>`
        );


    matches.push({

        ...item,

        preview: preview

    });

}
