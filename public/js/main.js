const editor = document.getElementById("editor"),
      searchField = document.getElementById("searchField"),
      searchButton = document.getElementById("searchButton"),
      clearSearchFieldButton = document.getElementById("clearSearchFieldButton"),
      occurrencesCounter = document.getElementById("occurrencesCounter"),
      wordsCounter = document.getElementById("wordsCounter"),
      sentencesCounter = document.getElementById("sentencesCounter");

let is_search_active = false;

function countWords(text) {
    // TO DO
    //console.log("X words in the text");
    return 0;
}


function countSentences(text) {
    // TO DO
    //console.log("X sentences in the text");
    return 0;
}


function searchOccurrences(needle) {

    // Function to escape html special characters (<, >, ", ')
    const escape = (unescapedText) => {
        return unescapedText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    let countOccurences = 0;
    let htmlResult = "";

    needle = escape(needle);

    let haystack = escape(editor.innerText);
    let haystackLength = haystack.length;
    let temp = 0;

    // Function to insert data in htmlResult
    const insert = (reset_temp, insert_needle_slice, insert_current_character, currentCharacter = "") => {
        // If specified, insert the needle part that has not yet been added
        if (insert_needle_slice)
            htmlResult += needle.slice(0, temp);

        // If specified, insert the current character
        if (insert_current_character)
            htmlResult += currentCharacter;

        // If specified, set temp to 0
        if (reset_temp)
            temp = 0;
    };

    editor.classList.remove("highlighting_disabled");

    for (let charIndex = 0; charIndex < haystackLength; charIndex++) {
        // Current character
        let char = haystack[charIndex];

        // If there is a breakline
        if (char === "\n") {
            // If a part of the needle has already been found, we insert it in htmlResult
            if (temp > 0)
                insert(true, true, false);

            // We insert a <br> tag in htmlResult (instead of the \n current character)
            htmlResult += "<br>";
        }
        else {
            // If the character belongs to the needle and if it is not the last character of the haystack
            if (char === needle.charAt(temp)) {
                // If the whole needle is found, highlight the needle and insert it
                if (temp === needle.length - 1) {
                    htmlResult += "<mark>" + needle + "</mark>";
                    temp = 0;
                    countOccurences++;
                }
                // If this is the last character of the haystack (thus we can conclude that the needle is not whole), insert the needle part which has been found
                else if (charIndex === haystackLength - 1)
                    insert(true, true, true, char);
                // If the current character can be a part of the needle (their is other characters on the same line or in the haystack)
                else
                    temp++;
            }
            else if (temp > 0)
                insert(true, true, true, char);
            else
                insert(false, false, true, char);

        }
    }

    editor.innerHTML = htmlResult;

    // Display of the occurrences counter and of the clear field erasing button
    if (needle.length > 0) {
        clearSearchFieldButton.classList.remove("hidden");
        occurrencesCounter.innerText = countOccurences + " occurrence" + (countOccurences !== 1 ? "s" : "") + " found";
    }
    else {
        clearSearchFieldButton.classList.add("hidden");
        occurrencesCounter.innerText = "";
    }

}


function eraseSearch(clearSearchField = true) {
    // By default, erase the search field content
    if (clearSearchField)
        searchField.value = "";

    // Truncate the occurrences counter and hide the search erasing button
    occurrencesCounter.innerText = "";
    clearSearchFieldButton.classList.add("hidden");

    // Disable the search results highlighting
    editor.classList.add('highlighting_disabled')

    // Set inactive the search tool
    is_search_active = false;
}


/*EVENTS MANAGING*/

// On paste onto the editor, paste as brut text
editor.addEventListener('paste', function (event) {
    event.preventDefault();
    document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
});

// On input in the textarea, refresh the stats and erase the search
editor.addEventListener("input", function() {
    let text = editor.innerHTML;
    wordsCounter.innerHTML = countWords(text).toString();
    sentencesCounter.innerHTML = countSentences(text).toString();
    if (!is_search_active)
        eraseSearch(false);
})

// On click on the "search" button, launch a search
searchButton.addEventListener("click", function () {
    searchOccurrences(searchField.value);
})

// On press enter in the search field, launch a search
searchField.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        searchOccurrences(searchField.value);
    }
})

// On input in the search field, launch a search
searchField.addEventListener("input", function () {
    searchOccurrences(searchField.value);
});

// On click on the search erase button, erase the search
clearSearchFieldButton.addEventListener("click", eraseSearch)
