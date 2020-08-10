{
$('select').formSelect();
function getInst(select){
    var instance = M.FormSelect.getInstance($(select));
    return instance
}


const formBg = '.form-bg-settings';
const formBox = '.form-box-settings';

function asd(){
    let type;
    document.querySelectorAll('li span').forEach((el, index)=>{
        el.onclick = ()=>{
            if(index === 0){
                type = null
            } else if(index === 1){
                type = 'syll-1'
            }
            else if(index === 2){
                type = 'syll-2'
            }
            else if(index === 3){
                type = 'syll-3'
            }
            else if(index === 4){
                type = 'learn'
            }
            //Вызывает функцию из файла simulator.js
            start(type);
            console.log(type)
            setTimeout(()=>{
                $(formBox + ', ' + formBg).fadeOut(100);
            }, 150);

            //console.log(getInst('select').getSelectedValues())
        }
    }) 
}
/*
sel('.dropdown-content.select-dropdown li').forEach((el)=>{
    console.log(el)
    el.classList.add('s');
})
sel('.dropdown-content.select-dropdown li:first-of-type').classList.add('selected');*/
$(function(){
    
	$('.settings').each(function(){
		$(this).click(function(){
			let top = $(window).scrollTop();
			let displayHeight = $(window).height();
			let margin = (displayHeight - 300) / 2;
			$(formBox).attr('style', `top: ${top +margin}px;`)
            $(formBox + ', ' + formBg).fadeIn(100);
            asd();
		});
	})
	$('.close-unavailable').click(function(){
		$(formBox + ', ' + formBg).fadeOut(100);
    });
});
    
}
