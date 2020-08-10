

var fs = {

    select: '',

    each: function(func){
        for(var i = 0; i < this.select.length; i++){
            this.select[i].func;
        }
    },
    
    sel: function(selector){
        var find = document.querySelectorAll(selector);
        if(find.length > 1){
            find;
            this.select = find;
            return this
        }
        document.querySelector(selector);
        this.select = document.querySelector(selector);
        return this 
    },

    id: function(selector){
        document.getElementById(selector);
        this.select = document.getElementById(selector);
        return this;
    },

    cl: function(func){
        this.select.addEventListener('click', func);
        return this;
    },
    
    text: function(content){
        this.select.textContent = content;
        return this;
    },

    html: function(content){
        this.select.innerHTML = content;
        return this;
    },

    random: function(to, from = 0){
        if(from > 1){
            return Math.floor(Math.random() * (to - (from -1))) + from; 
        } else if( from === 1) {
            return Math.floor(Math.random() * to) + from; 
        } else {
            return Math.floor(Math.random() * (to + 1)) + from; 
        }
       
        
    },

    addClass: function(classes){
        for(var i = 0; i < classes.length; i++){
            this.select.classList.add(classes[i]);
        }
        return this;
    },

    removeClass: function(classes){
        for(var i = 0; i < classes.length; i++){
            this.select.classList.remove(classes[i]);
        }
        return this;
    },

    removeEvent: function(event, func){
        if(event === 'cl'){
            this.select.removeEventListener('click', func);
        }
    },
    
    toggleClass: function(classes){
        for(var i = 0; i < classes.length; i++){
            this.select.classList.toggle(classes[i]);
        }
        return this;
    },

    hide: function(){
        this.select.style.display = 'none';
    },

    show: function(){
        this.select.style.display = '';
    },
}



function sel(selector){
    var find = document.querySelectorAll(selector);

    if(find.length > 1){
        return document.querySelectorAll(selector);
    }
    
    return document.querySelector(selector); 

}


function id(selector){
    return document.getElementById(selector);
}

function print(smth){
    return console.log(smth);
}

/*

document.querySelector('.btn-roll').addEventListener('click', function(){
    alert('Hello!');
});

fs.sel('.btn-roll').cl(function(){
    alert('Hello!');
});

*/





