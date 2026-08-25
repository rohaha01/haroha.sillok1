const params =
    new URLSearchParams(
        window.location.search
    );


const id =
    params.get("id");


const record =
    records.find(
        item => item.id === id
    );


/*
 * 존재하지 않는 기록
 */

if (!record) {

    document.title =
        "記錄 없음 | 差使日誌";

    document.getElementById(
        "recordTitle"
    ).textContent =
        "기록을 찾을 수 없습니다.";

} else {


    /*
     * 제목
     */

    document.title =
        `記錄 第${record.id}號 | 差使日誌`;


    document.getElementById(
        "recordNumber"
    ).textContent =
        `記錄 第${record.id}號`;


    document.getElementById(
        "recordTitle"
    ).textContent =
        record.title;


    document.getElementById(
        "recordDateKorean"
    ).textContent =
        record.dateKorean;


    document.getElementById(
        "recordCategory"
    ).textContent =
        record.category;


    document.getElementById(
        "recordDate"
    ).textContent =
        record.date;


    document.getElementById(
        "recordContent"
    ).innerHTML =
        record.content;


    document.getElementById(
        "recordInfoNumber"
    ).textContent =
        record.id;


    document.getElementById(
        "recordInfoDate"
    ).textContent =
        record.date;


    document.getElementById(
        "recordInfoCategory"
    ).textContent =
        record.category;



    /*
     * 이전 / 다음 기록
     */

    const index =
        records.indexOf(record);


    const previous =
        records[index - 1];


    const next =
        records[index + 1];


    const previousLink =
        document.getElementById(
            "previousRecord"
        );


    const nextLink =
        document.getElementById(
            "nextRecord"
        );



    if (previous) {

        previousLink.href =
            `record.html?id=${previous.id}`;

    } else {

        previousLink.classList.add(
            "record-nav-disabled"
        );

        previousLink.removeAttribute(
            "href"
        );

    }



    if (next) {

        nextLink.href =
            `record.html?id=${next.id}`;

    } else {

        nextLink.classList.add(
            "record-nav-disabled"
        );

        nextLink.removeAttribute(
            "href"
        );

    }

}
