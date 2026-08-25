const params = new URLSearchParams(
    window.location.search
);

const number = params.get("id");

const container =
    document.getElementById("recordContent");


const index =
    records.findIndex(
        record => record.number === number
    );


/*
 * 존재하지 않는 기록
 */

if (index === -1) {

    container.innerHTML = `

        <p class="search-message">
            기록을 찾을 수 없습니다.
        </p>

    `;

} else {

    const record =
        records[index];


    /*
     * 이전 기록
     */

    let previous = "";

    if (index > 0) {

        previous = `
            <a href="record.html?id=${records[index - 1].number}">
                ← 이전 기록
            </a>
        `;

    } else {

        previous = `
            <span class="record-nav-disabled">
                ← 이전 기록
            </span>
        `;

    }


    /*
     * 다음 기록
     */

    let next = "";

    if (index < records.length - 1) {

        next = `
            <a href="record.html?id=${records[index + 1].number}">
                다음 기록 →
            </a>
        `;

    } else {

        next = `
            <span class="record-nav-disabled">
                다음 기록 →
            </span>
        `;

    }


    /*
     * 화면 출력
     */

    container.innerHTML = `

        <div class="record-detail-mark">
            HAROHA RECORD
        </div>


        <p class="record-detail-number">
            記錄 第${record.number}號
        </p>


        <h1>
            ${record.title}
        </h1>


        <div class="record-detail-line"></div>


        <p class="record-detail-date">
            ${record.dateKorean}
        </p>


        <article class="record-document">


            <div class="document-heading">

                <span>
                    ${record.category}記錄
                </span>

                <span>
                    ${record.date}
                </span>

            </div>


            ${record.content}


        </article>


        <section class="record-information">


            <div>

                <span>
                    記錄番號
                </span>

                <strong>
                    ${record.number}
                </strong>

            </div>


            <div>

                <span>
                    年月日
                </span>

                <strong>
                    ${record.date}
                </strong>

            </div>


            <div>

                <span>
                    分類
                </span>

                <strong>
                    ${record.category}
                </strong>

            </div>


        </section>


        <div class="record-navigation">

            ${previous}


            <a href="records.html">
                기록 목록
            </a>


            ${next}

        </div>

    `;

}
