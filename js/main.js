var editor = document.getElementById("editor"),
    searchField = document.getElementById("searchField"),
    searchButton = document.getElementById("searchButton"),
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


function searchOccurrences(needle, haystack) {
    // TO DO
    console.log("Search done");
}


// On input in the textarea, refresh the stats
editor.addEventListener("input", function() {
    let text = editor.innerHTML;
    wordsCounter.innerHTML = countWords(text);
    sentencesCounter.innerHTML = countSentences(text);
})


// On click on the "search" button, display the results
searchButton.addEventListener("click", function () {
    searchOccurrences()
});