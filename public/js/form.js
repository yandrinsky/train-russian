{let html = `
<!--Начало всплывающей формы -->

    <!-- Отвечает за затемнение контента под всплывающей формой -->
    <div class="form-bg"></div>
    <!-- Отвечает за затемнение контента под всплывающей формой -->
    

    <!--Сама форма начало -->
    <div class="form-wrap">
       <div class="form-box">
            <div class="close-unavailable">
                <i class="large material-icons">close</i>
            </div>
            <div class="form__title">
                Функционал в разработке
            </div>
            <div class="form__text">
                Сайт находится в <span>beta</span> режиме, поэтому некоторые функции могут не работать.
            </div>
        </div> 
    </div>
    
     <!--Сама форма конец -->

<!--Конец всплывающей формы --> `
document.body.insertAdjacentHTML('beforebegin', html);
$(function(){
	$('.unavailable').each(function(){
		$(this).click(function(){
			let top = $(window).scrollTop();
			let displayHeight = $(window).height();
			let margin = (displayHeight - 300) / 2;
			$('.form-box').attr('style', `top: ${top +margin}px;`)
			$('.form-bg, .form-box').fadeIn(100);
		});
	})
	$('.close-unavailable').click(function(){
		$('.form-bg, .form-box').fadeOut(100);
	});
});

}
