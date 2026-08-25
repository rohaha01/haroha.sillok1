// ========================================
// 기록 불러오기
// ========================================

const params = new URLSearchParams(
    window.location.search
);

const id = params.get("id");

const record =
    records.find(
        item => item.id === id
    );


// 기록을 표시할 영역
const container =
    document.getElementById("recordContent");


// ========================================
// 기록을 찾지 못한 경우
// ========================================

if (!record) {

    document.title =
        "記錄 없음 | 差使日誌";

    container.innerHTML = `

        <div class="record-not-found">

            <div class="record-detail-mark">
                HAROHA RECORD
            </div>

            <h1>
                기록을 찾을 수 없습니다.
            </h1>

            <p>
                요청한 기록이 존재하지 않습니다.
            </p>

            <a href="records.html">
                기록 목록으로 돌아가기
            </a>

        </div>

    `;

}


// ========================================
// 기록 표시
// ========================================

else {

    // 브라우저 제목
    document.title =
        `記錄 第${record.id}號 | 差使日誌`;


    // 현재 기록 위치
    const index =
        records.indexOf(record);


    // ====================================
    // 이전 기록
    // ====================================

    let previous = "";


    if (index > 0) {

        previous = `

            <a href="record.html?id=${records[index - 1].id}">
                ← 이전 기록
            </a>

        `;

    }

    else {

        previous = `

            <span class="record-nav-disabled">
                ← 이전 기록
            </span>

        `;

    }


    // ====================================
    // 다음 기록
    // ====================================

    let next = "";


    if (index < records.length - 1) {

        next = `

            <a href="record.html?id=${records[index + 1].id}">
                다음 기록 →
            </a>

        `;

    }

    else {

        next = `

            <span class="record-nav-disabled">
                다음 기록 →
            </span>

        `;

    }


    // ====================================
    // 기록 출력
    // ====================================

    container.innerHTML = `

        <div class="record-detail-mark">
            HAROHA RECORD
        </div>


        <p class="record-detail-number">
            記錄 第${record.id}號
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
                    ${record.id}
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
