// ========================================
// 기록 불러오기
// ========================================

const params = new URLSearchParams(
    window.location.search
);

const recordId = params.get("id");


// 기록을 표시할 영역
const recordContent =
    document.getElementById("recordContent");


// 기록 찾기
const record =
    records.find(item => item.id === recordId);


// ========================================
// 기록이 존재하지 않는 경우
// ========================================

if (!record) {

    recordContent.innerHTML = `

        <div class="record-not-found">

            <div class="record-detail-mark">
                HAROHA RECORD
            </div>

            <h1>
                기록을 찾을 수 없습니다.
            </h1>

            <p>
                요청한 기록이 존재하지 않거나
                잘못된 기록 번호입니다.
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

    // 현재 기록의 위치
    const currentIndex =
        records.findIndex(
            item => item.id === recordId
        );


    // 이전 기록
    const previousRecord =
        records[currentIndex - 1];


    // 다음 기록
    const nextRecord =
        records[currentIndex + 1];


    // 이전 기록 버튼
    let previousButton;


    if (previousRecord) {

        previousButton = `

            <a href="record.html?id=${previousRecord.id}">
                ← 이전 기록
            </a>

        `;

    }

    else {

        previousButton = `

            <span class="record-nav-disabled">
                ← 이전 기록
            </span>

        `;

    }


    // 다음 기록 버튼
    let nextButton;


    if (nextRecord) {

        nextButton = `

            <a href="record.html?id=${nextRecord.id}">
                다음 기록 →
            </a>

        `;

    }

    else {

        nextButton = `

            <span class="record-nav-disabled">
                다음 기록 →
            </span>

        `;

    }


    // ========================================
    // 화면에 기록 출력
    // ========================================

    recordContent.innerHTML = `

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

            ${previousButton}


            <a href="records.html">
                기록 목록
            </a>


            ${nextButton}

        </div>

    `;

}
