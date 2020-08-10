const {Router} = require('express');
const router = Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');
const Word = require('../models/word');
const WordsIdCount = require('../models/wordsIdCount');
let dataArr = [];
const fs = require('../middleware/fastServer');

let login = null;


router.post('/send', async(req, resp)=>{
    if(req.session.isAdmin){
        let countId = await WordsIdCount.findOne();
        const startCountId = countId.idCount;
        countId = countId.idCount;
        let messages = [];
        const data = req.body;
        if(data) messages.push("Данные приняты");
        await data.forEach((el, index)=> {
            let res = addWord(el.word, el.emphasis, el.syllable, countId);
            //увеличивает счётчик только тогда, когда слово было добавлено
            if(res){
              countId++  
            }
            
        })

        WordsIdCount.updateOne({idCount: startCountId}, {idCount: countId}, (err)=>{
            if(err) {
            resp.send('Ошибка сервера: обновление ID'); 
            }
        });
        resp.send(['<p class="good">Данные приняты</p>'])
    } else {
        resp.send(['<p class="bad">Ошибка: недостаточно прав</p>'])
    }
    
})
router.post('/get', async(req, resp)=>{
    //Определяет логин и сохраняет его в переменную, которая используется в availableWords и далее
    if(req.session.isAuthentificated){
        login = req.session.login;
    }
    let clientRequest = req.body;
    console.log(clientRequest, 'request')
    let amount = clientRequest.amount;
    //let start = clientRequest.start;
    let type = clientRequest.type;
    let reqWords = await getData(amount, type);
    if(reqWords === null || reqWords[0] === null){
        resp.send([reqWords]); 
    } else {
        reqWords.forEach((el, index, arr) => {
            reqWords[index] = {word: el.word, emphasis: el.emphasis, id: el.id, syllable: el.syllable, info: el.info}
        }) 
        resp.send(reqWords);
    }
    
  
})

router.post('/addToLearn', async(req, resp)=>{
    if(req.session.isAuthentificated){
        let login = req.session.login;
        let toLearn = req.body;
        let userData = await User.findOne({login: login});
        userData = userData.learn;
        toLearn.forEach((el, index)=>{
            if(userData.indexOf(el) === -1){
              userData.push(el); 
              resp.send(['ok']); 
            }else{
                resp.send(['already'])
            }
        })
        await User.updateOne({login: login}, {learn: userData});
    } else {
        resp.send(['auth']);
    }
    
})

router.post('/dropBase', async(req, resp) =>{
    if(req.session.isAdmin){
        const password = '12323A+-';
        const clientPassword = req.body[0];
        if(password === clientPassword){
            dropAllData();
            resp.send([1]);
        } else {
            resp.send([0]);
        }
    } else {
        resp.send([0]);
    }
})

router.post('/deleteLearnWords', async(req, resp)=>{
    let login = req.session.login;
    let needToDelIds = req.body;
    deleteLearnWords(login, needToDelIds[0]);
    resp.send(['ok']);
})

router.post('/test', async (req, resp)=>{
    ('Req is', req.body);
    resp.send(JSON.stringify('Test is good'));
})

async function deleteLearnWords(login, id){
    let uData = await User.findOne({login: login})
    uData = uData.learn;
    uData.splice(uData.indexOf(id), 1);
    User.updateOne({login: login}, {learn: uData}, (err, result)=>{
        if(err) throw err
    });
}

async function addWord(word, emphasis, syllable, id){
    //проверка на наличие этого слова в базе. Если слово БЫЛО ДАВЛЕНО РАНЬШЕ, то повторно не добавится
    let isOriginal = await Word.findOne({word: word});
    if(!isOriginal){
        let asd = await Word.create({
            word: word,
            emphasis: emphasis,
            syllable: syllable,
            id: id,
        }, (err, res)=>{
            if(!err) {
                return res;
            }
        })
        return true
    } else {
        return false
    }

    
}

async function getData(amount, type = null){
    let changedAmount = false;
    let avWords = await availableWords(type);
    let reqWords = [];
    if(avWords){ 
        //проверка нужна для того, чтобы добавить функционал вывода слов в кабинете. (там вывод всех слов и по порядку)
        if(amount !== 'all'){
            if((avWords.ids.length < amount) && (avWords.ids.length !== 0)){
                amount = avWords.ids.length;
                changedAmount = true;
            } 
            let foundNumbersCount = 0;
            let foundNumbers = [];
            while(foundNumbersCount < amount){
                let random = fs.random(avWords.amount);

                if(foundNumbers.indexOf(random) === -1){
                    foundNumbers.push(random);
                    foundNumbersCount++;
                }
            }
            for(let i = 0; i < amount; i++){
                let uWord = await Word.findOne({id: avWords.ids[foundNumbers[i]]}, (err, data)=>{ 
                        if(err) throw err;         
                })
                reqWords.push(uWord);
            }
            
    
            if(changedAmount){
                console.log('setting has added')
                reqWords.push({word: 'settings', info: amount});
            }
        
            return reqWords;
        } else {
            for(let i = 0; i < avWords.ids.length; i++){
                let uWord = await Word.findOne({id: avWords.ids[i]}, (err, data)=>{ 
                        if(err) throw err;         
                })
                reqWords.push(uWord);
            }
            return reqWords;
        }
       
        
    } else {
        return avWords;
    }
    
}

async function availableWords(type = null){
    let serverAnswer;
    let ids = [];

    if(type === null){
        serverAnswer = await Word.find({__v: 0});
    } 
    else if(type === 'syll-1'){
        serverAnswer = await Word.find({syllable: 1})
    }
    else if(type === 'syll-2'){
        serverAnswer = await Word.find({syllable: 2})
    } 
    else if(type === 'syll-3'){
        serverAnswer = await Word.find({syllable: 3})
    } else if(type === 'learn'){
        let userWordsToLearn = [];
        serverAnswer = await User.find({login: login});
        let needToLearn = serverAnswer[0].learn;
        for(let i in needToLearn){
            let uWord = await Word.findOne({id: needToLearn[i]})
            //Проверка нужна для того, чтобы игнорировать слова, которые были удалены из базы, но отслись у пользователя в "Выучить"
            if(uWord === null){
                continue
            }
            userWordsToLearn.push(await Word.findOne({id: needToLearn[i]}));
        }   

        if(!needToLearn){
           serverAnswer = []; 
        } else {
            serverAnswer = userWordsToLearn;
        }
        
       
    }
    if(serverAnswer.length > 0){
        serverAnswer.forEach((el)=>{
            ids.push(el.id);
        })
        return {
            amount: serverAnswer.length - 1,
            ids: ids,
            type: type,
        }
    } else {
        return null;
    }
    
}

async function dropAllData(){
    let countId = await WordsIdCount.findOne();
    if(countId === null){
        WordsIdCount.create({
            idCount: 0,
        })
    }
    countId = countId.idCount;
    WordsIdCount.updateOne({idCount: countId}, {idCount: 0}, function(err, result){   
        if(err) return console.log(err);
    });
    Word.deleteMany({__v: 0},function(err, result){         
        if(err) return console.log(err);
    });
}



module.exports = router;