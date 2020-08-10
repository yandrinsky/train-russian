console.log('hey');

let vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
let word = 'неординарный';
let words = new Map();
words.set('арнольд', 3);
console.log(words);
let html = '';
let wordLettersIndex = [];



for(let i = 0; i < word.length; i++){
    if(vowels.indexOf(word[i]) !== -1){
        html += `<div class="vowel" id="lett-${i}"> <span class="letter">${word[i]}</span> </div>`; 
        wordLettersIndex.push(i);
    } else {
        html += `<div id="${i}">  ${word[i]} </div>`;
    }

}

document.querySelector('.word').insertAdjacentHTML('beforeend', html);


wordLettersIndex.forEach((cur) => {
    document.getElementById('lett-' + cur).addEventListener('click', () => {
        document.getElementById('lett-' + cur).classList.add('clicked');
    })
})





