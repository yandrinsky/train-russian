/* ОПЦИОНАЛЬНЫЕ ПЕРЕМЕННЫЕ */
//-------------------------//
let standartReqWords = 5;
//-------------------------//


let count = 0;
let totalCount = 0;
let vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
let words;
let newWords;
let isNewIteration = true;
let type = null;
let isMainWord; 
let currentWord;
let reqWords = standartReqWords;
//Определяет, открыт ли сайт с мобилки или нет
let isMobile = false;
if(document.documentElement.clientWidth < 500){
	isMobile = true;
} 

async function start(SelectedType = null){
	isNewIteration = true; count = 0; type = SelectedType; reqWords = standartReqWords;
	
	words = await getDataFromServer(reqWords, type);
	isSettingsInfo(words)
	//nextWord();
	if(words[0] !== null){
		newWord(words[count].word, words[count].emphasis)	
	} else {
		newWord(words[0])
	}
	
}

start();
//let words = [{"word":"аргентина","emphasis":6,"id":0},{"word":"ямайка","emphasis":2,"id":1},{"word":"лгала","emphasis":4,"id":2}]


function newWord(word, emphasis){
	currentWord = words[count];
	clearDisplay();
	isMainWord = true;
	let wordLettersIndex;
	if(isMobile){
		if(word.length > 13){
			sel('.word').classList.add('bigWord');
		}
	}
	if(word !== null){
		wordLettersIndex = drawWord(word);

		wordLettersIndex.forEach((cur) => {
			document.getElementById('lett-' + cur).addEventListener('click', ()=>{
				removeOtherClikedStyle();
				addClickedStyle(document.getElementById('lett-' + cur));
				if(cur === emphasis){
					correctAnswer()
				} else {
					uncorrectAnser()
				}
			})
		})
	} else {
		drawWord('(пусто)');
	}
}
	async function nextWord(){
		count++;
	
		if(count === Math.round(reqWords / 2)){
			reqWords = standartReqWords;
			newWords = await getDataFromServer(reqWords, type);
			isSettingsInfo(newWords);
		}

		if(count === reqWords && (reqWords > 1 || reqWords === 1)){
			count = 0;
			isNewIteration = true;
			words = newWords;
		} 

	
		//reqWords - количество слов, а счёт с 0;

		//totalCount++;
	
		//Проверка на наличие слов (если сервер ответил положительно)
		if(words[0] === null){
			newWord(null, null);
		} else {
			newWord(words[count].word, words[count].emphasis);
		}
		
	}
	function drawWord(word){
		let html = '';
		let wordLettersIndex = [];
		for(let i = 0; i < word.length; i++){
			if(vowels.indexOf(word[i]) !== -1 && isMainWord){
				//Создаем html, где каждая буква - отдельный div
				html += `<div class="vowel" id="lett-${i}"> <span class="letter">${word[i]}</span> </div>`; 
				wordLettersIndex.push(i);
			} else if (word[i] === '('){
				isMainWord = false;
				html += `<div>&nbsp</div>`
				html += `<div id="${i}">  ${word[i]} </div>`
				
			} else if (word[i] === ')'){
				isMainWord = true;
				html += `<div id="${i}">  ${word[i]} </div>`
				html += `<div>&nbsp</div>`
			
			} else if (word[i] === '_'){
				html += `<div>&nbsp</div>`
			}
			else {
				html += `<div id="${i}">  ${word[i]} </div>`;
			}
	
		}
		document.querySelector('.word').insertAdjacentHTML('beforeend', html);
		return wordLettersIndex;
	}

	function correctAnswer(){
		document.querySelector('.word').classList.add('correct');
		killClick();
		setTimeout(nextWord, 1500);
	}

	function uncorrectAnser(){
		document.querySelector('.word').classList.add('uncorrect');
		document.querySelector('.learnWord').classList.remove('hidden');
		showCorrectLet(words[count].emphasis);
		killClick(words[count].emphasis);
	}

	function killClick(rule = null){
		if(rule !== null){
			document.querySelectorAll('.word div').forEach((el)=>{
				if(el.id !== ('lett-' + rule)){
					el.id = ""
					el.classList.remove('vowel');
				} 		
			})
		} else {
			document.querySelectorAll('.word div').forEach((el)=>{
				el.id = ""
				el.classList.remove('vowel');
			})
		}
		
	}
	function clearDisplay(){
		document.querySelector('.learnWord').classList.add('hidden');
		document.querySelector('.word').innerHTML = '';
		document.querySelector('.word').classList.remove('correct', 'uncorrect');
		document.querySelector('.learnWord').classList.remove('addDone');
		document.querySelector('.learnWord').classList.remove('addFalse');
		sel('.word').classList.remove('bigWord');
	}
	

	function showCorrectLet(idCorrect){
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

	async function getDataFromServer(reqWords, type){
		let dataFromServ = {
			amount: reqWords, 
			type: type,
		}
		let response = await fetch('data/get', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(dataFromServ)
		});
		let result = await response.json();
		console.log(result)
		return result;
	} 
	function isSettingsInfo(el){
		if(el[0] !== null){
			if(el[el.length - 1].word === 'settings'){
				reqWords = el[el.length - 1].info;
				el.pop();
			} 
		}
		
	}