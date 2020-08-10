/*

1) Добавить функцию подтягивания слов с сервера, когда решено 5 из 10 полученных слов.

*/

let count = 0;
let totalCount = 0;
let vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
let words = [{"word":"прибыла","emphasis":6,"id":0},{"word":"ямайка","emphasis":2,"id":1},{"word":"соня","emphasis":1,"id":2}]
let newWords;
let word = words[count].word;
let emphasis = words[count].emphasis;



let html = '';
let wordLettersIndex = [];
for(let i = 0; i < word.length; i++){
    if(vowels.indexOf(word[i]) !== -1){
    	//Создаем html, где каждая буква - отдельный dib
        html += `<div class="vowel lett-${i}"> <span class="letter">${word[i]}</span> </div>`; 
        wordLettersIndex.push(i);
    } else {
        html += `<div id="${i}">  ${word[i]} </div>`;
    }

}

document.querySelectorAll('.word').forEach((el)=>{
	el.insertAdjacentHTML('beforeend', html);
});

sel('.simulator__step_2 .word .lett-' + emphasis).classList.add('clicked');
document.querySelectorAll('.simulator__step_3 .word .lett-' + 2 + ', .simulator__step_4 .word .lett-' + 2).forEach((el)=>{
	el.classList.add('clicked');
})
document.querySelectorAll('.simulator__step_3 .word .lett-' + emphasis + ', .simulator__step_4 .word .lett-' + emphasis).forEach((el)=>{
	el.classList.add('rightLet');
})
document.querySelectorAll('.simulator__step_2 .word div, .simulator__step_3 .word div, .simulator__step_4 .word div').forEach((el, index)=>{
	el.classList.remove('vowel');
})
sel('.simulator__step_2 .word').classList.add('correct');
document.querySelectorAll('.simulator__step_3 .word, .simulator__step_4 .word').forEach((el)=>{
	el.classList.add('uncorrect');
})

function newWord(word, emphasis, parent){
	wordLettersIndex.forEach((cur) => {
	    document.querySelector(parent + ' .lett-' + cur).addEventListener('click', ()=>{
	    	removeOtherClikedStyle();
	    	addClickedStyle(document.getElementById('lett-' + cur));
	        if(cur === emphasis){
	        	correctAnswer()
	        } else {
	        	uncorrectAnser()
	        }
	    })
	})
}


function correctAnswer(){
	document.querySelector('.word').classList.add('correct');
	killClick();
}

function uncorrectAnser(){
	document.querySelector('.word').classList.add('uncorrect');
	showCorrectLet(words[count].emphasis);
	killClick(words[count].emphasis);
}

function killClick(rule = ""){
	if(rule){
		document.querySelectorAll('.word div').forEach((el, index)=>{
			if(el.id !== ('lett-' + rule)){
				el.classList.remove('vowel');
			} 		
		})
	} else {
		document.querySelectorAll('.word div').forEach((el, index)=>{
			el.classList.remove('vowel');
		})
	}
	
}

function nextWord(){

	count++;
	totalCount++;
	document.querySelector('.learnWord').classList.add('hidden');
	document.querySelector('.word').innerHTML = '';
	document.querySelector('.word').classList.remove('correct', 'uncorrect');
	newWord(words[count].word, words[count].emphasis);

}

function showCorrectLet(idCorrect){
	console.log(idCorrect);
	document.getElementById('lett-' + idCorrect).classList.add('rightLet');
}

function addClickedStyle(el){
	el.classList.add('clicked');
}
function removeOtherClikedStyle(){
	document.querySelectorAll('.word div').forEach((el, index)=>{
		el.classList.remove('clicked');
	})
}