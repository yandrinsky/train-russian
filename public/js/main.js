/*

1) Добавить функцию подтягивания слов с сервера, когда решено 5 из 10 полученных слов.

*/

async function getDataFromServer(amount, start){
    let reqWordsFromServer = {
        amount: amount,
        start: start,
    }
    let xml = new XMLHttpRequest();
    xml.open('POST', 'data/get')
    xml.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    //xml.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xml.send(JSON.stringify(reqWordsFromServer));
    xml.onload = () => {
    	let data = xml.response;
    	console.log(data);
    	return data
    }
}

let count = 0;
let totalCount = 0;
let vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
//let words = getDataFromServer(10, count);
let words = [{"word":"аргентина","emphasis":6,"id":0},{"word":"ямайка","emphasis":2,"id":1},{"word":"соня","emphasis":1,"id":2}]
let newWords;



function newWord(word, emphasis){
	let html = '';
	let wordLettersIndex = [];
	for(let i = 0; i < word.length; i++){
	    if(vowels.indexOf(word[i]) !== -1){
	    	//Создаем html, где каждая буква - отдельный dib
	        html += `<div class="vowel" id="lett-${i}"> <span class="letter">${word[i]}</span> </div>`; 
	        wordLettersIndex.push(i);
	    } else {
	        html += `<div id="${i}">  ${word[i]} </div>`;
	    }

	}

	document.querySelector('.word').insertAdjacentHTML('beforeend', html);

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
}


newWord(words[count].word, words[count].emphasis);




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

	function killClick(rule = ""){
		if(rule){
			document.querySelectorAll('.word div').forEach((el, index)=>{
				if(el.id !== ('lett-' + rule)){
					el.id = ""
					el.classList.remove('vowel');
				} 		
			})
		} else {
			document.querySelectorAll('.word div').forEach((el, index)=>{
				el.id = ""
				el.classList.remove('vowel');
			})
		}
		
	}

	function nextWord(){
		/*
		if(count === 5){
			newWords = getDataFromServer(10, totalCount + 5)
		}
		if(count === 10){
			count = 0;
			words = newWords;
		}
		if(count !== 0){
			count++;
		}*/
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