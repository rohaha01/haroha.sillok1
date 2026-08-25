const BOOKMARK_KEY = "harohaBookmarks";


function getBookmarks() {

    const saved =
        localStorage.getItem(BOOKMARK_KEY);

    if (!saved) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error(
            "북마크를 불러오지 못했습니다.",
            error
        );
        return [];
    }

}



function toggleBookmark(
    id,
    title,
    date,
    url
) {

    const bookmarks = getBookmarks();


    const index =
        bookmarks.findIndex(
            item => item.id === id
        );


    if (index !== -1) {

        // 이미 저장되어 있으면 삭제
        bookmarks.splice(index, 1);

    } else {

        // 저장되어 있지 않으면 추가
        bookmarks.push({

            id: id,

            title: title,

            date: date,

            url: url

        });

    }


    localStorage.setItem(
        BOOKMARK_KEY,
        JSON.stringify(bookmarks)
    );


    updateBookmarkButton(id);

}



function updateBookmarkButton(id) {

    const button =
        document.querySelector(
            ".bookmark-button"
        );


    if (!button) {
        return;
    }


    const bookmarks =
        getBookmarks();


    const saved =
        bookmarks.some(
            item => item.id === id
        );


    const icon =
        button.querySelector(
            ".bookmark-icon"
        );


    const text =
        button.querySelector(
            ".bookmark-text"
        );


    if (saved) {

        icon.textContent = "★";

        text.textContent = "보관됨";

        button.classList.add(
            "bookmarked"
        );

    } else {

        icon.textContent = "☆";

        text.textContent = "이 기록 보관";

        button.classList.remove(
            "bookmarked"
        );

    }

}



document.addEventListener(
    "DOMContentLoaded",
    function () {

        const button =
            document.querySelector(
                ".bookmark-button"
            );


        if (!button) {
            return;
        }


        const onclick =
            button.getAttribute(
                "onclick"
            );


        const match =
            onclick.match(
                /toggleBookmark\(\s*['"]([^'"]+)['"]/
            );


        if (match) {

            updateBookmarkButton(
                match[1]
            );

        }

    }
);
