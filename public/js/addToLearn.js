{
    let messageField = $('.message'); 
    document.querySelectorAll('.learnWord').forEach((el)=>{
    el.addEventListener('click', ()=>{
        addToLearn(currentWord.id, el);
        console.log('addToLearn', currentWord.id);
    })
    })

    async function addToLearn(id, el){
        let response = await fetch('data/addToLearn', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify([id])
        });
        let result = await response.json();
        if(result[0] === 'already'){
            showMessage(el, 'слово уже добавлено', 'addFalse')   
        } else if(result[0] === 'ok'){
            showMessage(el, 'слово добавлено', 'addDone')
        } else if(result[0] === 'auth'){
            showMessage(el, 'необходимо авторизоваться', 'addFalse')
        }
        console.log(result);
        return result;
    }

    function showMessage(el, text, clasS){
        el.classList.add(clasS);
        messageField.text(text).slideDown();
        setTimeout(()=>{
            messageField.slideUp();
        }, 3000)
    }
}