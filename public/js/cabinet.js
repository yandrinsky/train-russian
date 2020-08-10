{
var instance = M.Tabs.init(document.querySelector('.tabs'));
let vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
let isMainWord; 
let needToDeleteClass = [];
//Создаем глобальную переменную-счётчик, которая хранит количество доступных для удаления слов
let amount = 0;

async function getDataFromServer(reqWords, type = null){
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
    return result;
} 

async function delLearnWordsServer(id){
    let data = [id];
    let response = await fetch('data/deleteLearnWords', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    let result = await response.json();
    return result;
}

async function addToLearn(id){
    let response = await fetch('data/addToLearn', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify([id])
    });
    let result = await response.json();
    /*if(result[0] === 'already'){
        showMessage(el, 'слово уже добавлено', 'addFalse')   
    } else if(result[0] === 'ok'){
        showMessage(el, 'слово добавлено', 'addDone')
    }*/
    console.log(result);
    return result;
}

function drawWord(word){
    let html = '';
    let wordLettersIndex = [];
    for(let i = 0; i < word.length; i++){
        if(vowels.indexOf(word[i]) !== -1 && isMainWord){
            //Создаем html, где каждая буква - отдельный dib
            html += `<div class="vowel" class="lett-${i}"> <span class="letter">${word[i]}</span> </div>`; 
            wordLettersIndex.push(i);
        } else if (word[i] === '('){
            isMainWord = false;
            html += `<div>&nbsp</div>`
            html += `<div class="${i}">  ${word[i]} </div>`
            //continue
        } else if (word[i] === ')'){
            isMainWord = true;
            html += `<div class="${i}">  ${word[i]} </div>`
            html += `<div>&nbsp</div>`
            //continue
        } else if (word[i] === '_'){
            html += `<div>&nbsp</div>`
        }
        else {
            html += `<div class="${i}">  ${word[i]} </div>`;
        }

    }
    //document.querySelector('.word').insertAdjacentHTML('beforeend', html);
    return [html, wordLettersIndex] ;
}

function drawWordBlock(word, count, id, selWhereEnter, style){
    let drawWordInfo = drawWord(word);
    let drawnWord = drawWordInfo[0];
    let html
    if(style == 'myWords'){
        html = `
        <div class="uword" id="uword-${id}">
            <div class="uword__wrap">
                <div class="uword__count">
                    ${count + 1}
                </div>	
                <div class="uword__word">
                    ${drawnWord}
                </div>	
                <div class="uword__delete">	
                    <div class="uword__delete__wrap">
                        <i class="material-icons">delete</i> 
                    </div>   	                  
                </div>	
            </div>
        </div>
        ` 
    } else if(style === 'allWords'){
        html = `
        <div class="uword uword-${id}" info="uword-${id}">
            <div class="uword__wrap">
                <div class="uword__count">
                    ${count + 1}
                </div>	
                <div class="uword__word">
                    ${drawnWord}
                </div>	
                <div class="allword__add">	
                    <div class="allword__add__wrap">
                        <i class="material-icons">add</i> 
                    </div>   	                  
                </div>	
            </div>
        </div>
        ` 
    }
   
    sel(selWhereEnter).insertAdjacentHTML('beforeend', html);
}

function removeWordsListener(){
    sel('#mywords').addEventListener('click', async (e)=>{   
        console.log(amount)
        let id = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if(id.indexOf('uword') === 0){
            let idSliced = parseInt(id.slice(id.indexOf('-') + 1, id.length));
            let res = await delLearnWordsServer(idSliced);
            if(res[0] === 'ok'){
                console.log(id);
                document.getElementById(id).classList.add('hidden');
                needToDeleteClass.push('.'+id);
            } 
            amount--;
            if(amount <= 0){
                sel('.first-section__empty').classList.remove('hidden');
                sel('.wordsPlace').classList.add('wordsPlace_empty');
            }       
        }              
    })
}

function addWordsListener(){
    sel('#allwords').addEventListener('click', async (e)=>{   
        let info = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('info');
        if(info){
            let infoSliced = parseInt(info.slice(info.indexOf('-') + 1, info.length));
            let res = await addToLearn(infoSliced);
            sel('.wordsPlace').classList.remove('wordsPlace_empty');
            console.log('res', res);
            if(res[0] === 'ok'){
                console.log('id', info)
                sel('.' + info).classList.add('wordAdded')
            } else if(res[0] === 'already'){
                sel('.' + info).classList.add('wordAlreadyAdded')
            }   
        }              
    })
}

async function showMyWords(){
    let firstTime = true;
    async function body(){
        sel('#mywords .wordsPlace').innerHTML = '';
        firstTime = false;
        let words = await getDataFromServer('all', 'learn');
        //let amount = 0;
        if(words.length > 0){
            sel('.first-section__empty').classList.add('hidden');
        }
        if(words[0] !== null){
            for(let i = 0; i < words.length; i++){
                let word = Array.from(words[i].word);
                word[words[i].emphasis] = word[words[i].emphasis].toUpperCase();    
                drawWordBlock(word.join(''), i, words[i].id, '#mywords .wordsPlace', 'myWords');
                amount++;
            }  
        } else {
            $('.first-section__empty').removeClass('hidden');
            sel('.wordsPlace').classList.add('wordsPlace_empty');
        }
        //добавляем eventListeners 
    }
    if(firstTime){
        body();
        removeWordsListener();
        
    }
    sel('#myWordsBTN').addEventListener('click', body);
    
}

async function showAllWords(){
    let firstTime = true;
    sel('#allWordsBTN').addEventListener('click', async ()=>{
        if(firstTime){
            let words = await getDataFromServer('all');
            for(let i = 0; i < words.length; i++){
                let word = Array.from(words[i].word);
                word[words[i].emphasis] = word[words[i].emphasis].toUpperCase();    
                drawWordBlock(word.join(''), i, words[i].id, '#allwords', 'allWords');
            }  
            firstTime = false;
        }
        needToDeleteClass.forEach((el, index)=>{
            console.log('el', el)
            sel(el).classList.remove('wordAdded');
            sel(el).classList.remove('wordAlreadyAdded');
        })
        needToDeleteClass = [];
    })
    addWordsListener()
    
}
async function start(){
    showMyWords()
    showAllWords()
    
}
    window.onload = start();
}