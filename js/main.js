var editor = document.getElementById("editor"),
    searchField = document.getElementById("searchField"),
    searchButton = document.getElementById("searchButton");
    eraseSearchFieldButton = document.getElementById("eraseSearchFieldButton"),
    occurrencesCounter = document.getElementById("occurrencesCounter"),
    wordsCounter = document.getElementById("wordsCounter"),
    sentencesCounter = document.getElementById("sentencesCounter");


function countWords(text) {
    // TO DO
    console.log("X words in the text");
    return 0;
}


function countSentences(text) {
    // TO DO
    console.log("X sentences in the text");
    return 0;
}


function searchOccurrences(needle) {

    let countOccurences = 0;
    let htmlResult = "";

    let temp = 0;

    for (let char of editor.innerText) {
        if (char == needle[temp]) {
            // If the whole needle is found
            if (temp == needle.length - 1) {
                countOccurences++;
                htmlResult += "<mark>" + needle + "</mark>";
                temp = 0;
            }
            else
                temp++;
        }
        else {
            if (temp > 0) {
                for (let i = 0; i < temp; i++) {
                    htmlResult += needle.charAt(i);
                }
                temp = 0;
            }
            htmlResult += char;
        }
    }

    if (temp > 0) {
        for (let i = 0; i < temp; i++) {
            htmlResult += needle.charAt(i);
        }
        temp = 0;
    }

    editor.innerHTML = htmlResult;

    if (needle.length > 0) {
        eraseSearchFieldButton.classList.remove("hidden");
        occurrencesCounter.innerText = countOccurences + " occurrence" + (countOccurences != 1 ? "s" : "") + " found";
    }
    else {
        occurrencesCounter.innerText = "";
    }

}


function eraseSearch() {
    searchField.value = "";
    occurrencesCounter.innerText = "";
    eraseSearchFieldButton.classList.add("hidden");
    searchOccurrences(searchField.value);
}

// On input in the textarea, refresh the stats
editor.addEventListener("input", function() {
    let text = editor.innerHTML;
    wordsCounter.innerHTML = countWords(text);
    sentencesCounter.innerHTML = countSentences(text);
})


// On click on the "search" button, launch a search
searchButton.addEventListener("click", function () {
    searchOccurrences(searchField.value);
})


// On input in the search field, launch a search
searchField.addEventListener("input", function () {
    searchOccurrences(searchField.value);
});


// On click on the search erase button, errase the search
eraseSearchFieldButton.addEventListener("click", eraseSearch)