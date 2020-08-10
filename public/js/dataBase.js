//Создаем алфавит глассных букв, возводим в верхний регистр, выводим в косоль, копируем, вставляем получаем нужный массив
  /*
  let letters = 'а, о, и, е, ё, э, ы, у, ю, я';
  letters = letters.split(', ');
  for(let i in letters){
        let upper = letters[i].toUpperCase();
        letters[i] = upper;
  }
    console.log(letters);
  */
{

/* ОПЦИОНАЛЬНЫЕ ПЕРЕМЕННЫЕ */
//-------------------------//
let url = 'data/send';
//-------------------------//


function getText(selector){
    let letters = [ "А", "О", "И", "Е", "Ё", "Э", "Ы", "У", "Ю", "Я" ];
    let littleLetters = makeLettersLittle(letters);
    let allCorrect = true;
    //массив с индексами ударных звуков в словах
    let bitLet = [];
    //массив индексов ячеек, которые нужно удалить (пустые)
    let needToDelete = [];
    let syllables = [];
    
    let errors = {
        isStringFake: function(string){
           let count = 0;
            for(let i = 0; i < string.length; i++){
                if(text[i] === '\n') count++;
            }
            if(count === string.length){
                return true;
            } else {
                return false;
            } 
        },

        isComma: function(arr){
            //обнаружение недопустимого знака: запятая
            arr.forEach( (cur, index) => {
                if(cur.indexOf(',') !== -1){
                    allCorrect = false;
                    alert(`Error: обнаружен недопустимый знак   '   ,   '   (запятая) \n\nДля удобного поиска используйте CTRL + F`)
                }
            })
        },

        isBitLet: function(wordsArr, bitsArr){
            bitsArr.forEach((cur, index) => {
                if(cur === 'error'){
                    allCorrect = false;
                    alert(`Error: В слове  ${wordsArr[index]}  не выделено ударение или выделено некорректно\n\nДля удобного поиска используйте CTRL + F`);
                }
            })  
        }
        

    }

    function clearWord(word){
        let clearWord = '';
        for (let lettr in word){
            if(word[lettr] !== ' '){
                clearWord += word[lettr];
            }
        }
        return clearWord;
    }
    //Получаем строку из тектого поля
    let text = document.querySelector(selector).value;

    if(!errors.isStringFake(text)){
        //делим строку по переносу (enter), создаем массив отлельных слов
        text = text.split('\n')

        text.forEach( (cur, index) => {
            //проверка на пустую ячейку
            if(cur === ''){
                needToDelete.push(index);
            } 
        })
        //удаление пустых ячеек
        if(needToDelete.length !== 0){
            let count = 0;
            needToDelete.forEach((cur, index) => {
                text.splice(cur - count, 1);
                count++;
            })
        }

        //Удаляем пробелы в словах
        text.forEach( (cur, index) => {
            text[index] = clearWord(cur);
        })

        //Проверяет наличие ударного глассного: если есть, заносить id. Если нет, то 'error'
        text.forEach( (cur, index) => {
            let haveBitLet = false;
            let bitCounts = [];
            let syllablesCount = 0;
            let mainWord = true;
            for(let i in cur){
                //Позволяет не учитывать контекстные слова в скобках
                if(cur[i] === '('){
                    mainWord = false;
                } else if(cur[i] === ')'){
                    mainWord = true;
                }
                if(mainWord){
                    if(littleLetters.indexOf(cur[i]) !== -1 || letters.indexOf(cur[i]) !== -1){
                        syllablesCount++;
                    }
                    if(letters.indexOf(cur[i]) !== -1){
                        bitCounts.push(i);
                        syllables.push(syllablesCount);
                        haveBitLet = true;
                    }
                }
                
            }
            if(!haveBitLet){
                bitLet.push('error');
            }
            if(bitCounts.length > 1){
                bitLet.push('error');
            } else {
            bitLet.push(bitCounts[0]); 
            }

            
        })

        errors.isComma(text);
        errors.isBitLet(text, bitLet);


        //преобразует все слова в нижний регистр, убирая выделенное ударение
        text.forEach( (cur, index) => {
            text[index] = cur.toLowerCase();
        })

        if(allCorrect){
           sendDataToServer(url, clearData(text, bitLet, syllables)); 
           document.querySelector(selector).value = '';
        }
        
    } else {
        alert('Error: данные не были введены');
    }
    
  }
function makeLettersLittle(bigArr){
    let arr = [];
    bigArr.forEach((el, index)=>{
        arr.push(el.toLowerCase());
    })
    console.log(arr);
    return arr;
}
async function clearDataFromServer(url, data){
    let response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify([data])
    })
    let result = await response.json();
    return result;
}
function clearDB(){
    sel('.confirmation').classList.remove('hidden');
    sel('.btn-confirmation').addEventListener('click',(async ()=>{
        let userPassword = sel('#password').value;
        sel('#password').value = '';
        let serverAnswer = await clearDataFromServer('data/dropBase', userPassword);
        console.log(serverAnswer);
        if(serverAnswer[0] === 1){
            sel('.message-file').innerHTML = '<div class="message good">Данные удалены</div>'
            //sel('.confirmation').classList.add('hidden');
            setTimeout(()=>{
                sel('.confirmation').classList.add('hidden');
                sel('.message-file').innerHTML = '';

            }, 2000)
        } else if(serverAnswer[0] === 0) {
            sel('.message-file').innerHTML = '<div class="message bad">Пароль неверный</div>'
        }
    })) 
    sel('.confirmation .close').addEventListener('click',(async ()=>{
        sel('.confirmation').classList.add('hidden');
        sel('.message-file').innerHTML = '';
    }))
}

function clearData(words, emphasis, syllables){
    let data = [];
    words.forEach((el, index)=>{
        data.push({
            word: el,
            emphasis: emphasis[index],
            syllable: syllables[index],
        })
    })
    return data
}

async function sendDataToServer(url, data){
    let words = data;
    console.log('Отправленные данные: ', words)
    let response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(words)
    })
    let result = await response.json();
    sel('.server-answer').innerHTML = result;
    setTimeout(()=>{
        sel('.server-answer').innerHTML = '';
    }, 3000)
}

function secret(){
    let tap = 0;
    fs.sel('.area').cl(()=>{
        tap++;
        if(tap === 3){
            sel('#clearDB').classList.remove('hidden');
        }
    })
}
secret();
}