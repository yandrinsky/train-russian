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


function getText(selector){
    let letters = [ "А", "О", "И", "Е", "Ё", "Э", "Ы", "У", "Ю", "Я" ];

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
                    alert(`Error: обнаружен недопустимый знак   '   ,   '   (запятая) \n\nДля удобного поиска используйте CTRL + F`)
                }
            })
        },

        isBitLet: function(wordsArr, bitsArr){
            bitsArr.forEach((cur, index) => {
                if(cur === 'error'){
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
        //массив с индексами ударных звуков в словах
        let bitLet = [];
        //массив индексов ячеек, которые нужно удалить (пустые)
        let needToDelete = [];

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
        //Добавить проверку на несколько удариний в слове!
        text.forEach( (cur, index) => {
            let haveBitLet = false;
            let bitCounts = [];
            for(let i in cur){
                if(letters.indexOf(cur[i]) !== -1){
                    bitCounts.push(i);
                    haveBitLet = true;
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
        console.log(text);
        console.log(bitLet);
    } else {
        alert('Error: данные не были введены');
    }
    
  }
