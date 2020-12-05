import { ENV, APP } from './Main.mjs';
export { TextAnalyzer };


class TextAnalyzer {

    static escape (unescapedText) {
        // Escape html special characters (<, >, ", ')
        return unescapedText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    static countWords(text) {
        // Returns the number of words in the text
        let result = text.split(/\s+/).filter(w => w !== '').length;
        return result + " word" + APP.plural(result);
    }


    static countSentences(text) {
        // Returns the numbre of sequences in the text
        let result = text.split(/[.!?]+\s+/).filter(Boolean).length;
        return result + " sentence" + APP.plural(result);
    }


    static countVowels(text) {
        // Returns the number of vowels in the text
        // TODO
        return "toto";
    }


    static longestWord(text) {
        // Returns the longest word of the text
        let words = text.split(/\s+/).filter(w => w !== '');
        let longestWord = "";
        for(let i = 0; i < words.length; i++) {
            if (words[i].length > longestWord.length)
                longestWord = words[i];
        }
        return longestWord;
    }


    static recurringWords(text) {
        // Returns the 10 more recurring words (or less if the text contains less than 10 words)
        // TODO (nb: what is following is just an example you can use (or not) to complete the function)
        let result = ""

        for (let i = 0; i < 10; i++)
            result += "<li>" + 'Result ' + (i + 1) + '</li>';

        return result
    }


    static searchOccurrences(needle) {
        // Searches a needle in a haystack (searches and highlights the occurrences of an specified expression in the text)

        let countOccurences = 0;
        let htmlResult = "";

        needle = TextAnalyzer.escape(needle);

        let haystack = TextAnalyzer.escape(ENV.editor.innerText);
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

        ENV.editor.classList.remove("highlighting_disabled");

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

        ENV.editor.innerHTML = htmlResult;

        // Display of the occurrences counter and of the clear field erasing button
        if (needle.length > 0) {
            // clearSearchFieldButton.classList.remove("hidden");
            ENV.occurrencesCounter.innerText = countOccurences + " occurrence" + APP.plural(countOccurences) + " found";
        }
        else {
            // clearSearchFieldButton.classList.add("hidden");
            ENV.occurrencesCounter.innerText = "";
        }
    }

}