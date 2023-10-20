const words = ["Coming", " Soon", "..."]; 
const wordElement = document.querySelector('.word');
let wordIndex = 0;
let letterIndex = 0;

function typeWords() {
    if (wordIndex < words.length) {
        if (letterIndex < words[wordIndex].length) {
            wordElement.textContent += words[wordIndex][letterIndex];
            letterIndex++;
            setTimeout(typeWords, 150); 
        } else {
            wordIndex++;
            letterIndex = 0;
            setTimeout(typeWords, 750); 
        }
    }
}