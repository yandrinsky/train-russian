$(document).ready(function(){
    $('.sidenav').sidenav();
  });

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 800, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

var instance = M.Tabs.init(document.querySelector('.tabs'));
document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.parallax');
	var instances = M.Parallax.init(elems);
});

$(document).ready(function(){
	$('.carousel').carousel();
})

$('.carousel.carousel-slider').carousel({
	fullWidth: true
});


let developers = {
	vlad: {
		name: 'Влад Яндринский',
		info: 'Разработчик, автор идеи проекта',
		vk: 'https://vk.com/rageandscream'
	}, 
	serega: {
		name: 'Сергей Поздеев',
		info: 'Автор видеоурока, монтажёр',
		vk: 'https://vk.com/juf99'
	},
	ilya: {
		name: 'Илья Климашевский',
		info: 'Автор видеоурока',
		vk: 'https://vk.com/klimashevsky.ilya'
	},
/*	pasha: {
		name: 'Павел Ефремов',
		info: 'PR-менеджер',
		vk: 'https://vk.com/id241679510'
	}*/
}

let aboutCarous = sel('.about-carous');



function ChangeText(){
	let isGetInfo = false;
 	setTimeout(()=>{
 		let interval = setInterval(function() {
		if(!aboutCarous.classList.contains('scrolling')){
			console.log(isGetInfo)
		 	isGetInfo = true;
		 	clearInterval(interval)
		 	getPictureData();
		}
		}, 50);
 	}, 100) 
}

sel('.about-carous').addEventListener('mousedown', async ()=>{
	ChangeText();
})

/*
$(function(){
	$('.about-carous').swipe({
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			console.log(direction);
		}
	});
	
	$('.about-carous').on( "swipe", async ()=>{
		console.log('swipe')
		let isGetInfo = false;
		setTimeout(()=>{
			let interval = setInterval(function() {
			if(!aboutCarous.classList.contains('scrolling')){
				console.log(isGetInfo)
				isGetInfo = true;
				clearInterval(interval)
				getPictureData();
			}
			}, 50);
	}, 100) 	
	});
 
});*/
$('.about-carous').swipe({
    swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection){
		console.log('swipe');
		ChangeText();
    },
	triggerOnTouchEnd:false,
	threshold:20 // сработает через 20 пикселей
 
});

function getPictureData(){
	print('get info')
	document.querySelectorAll('.carousel-item').forEach((el)=>{
		if(el.classList.contains('active')){
			let data = el.getAttribute('data-name');
			let name = developers[data].name;
			let info = developers[data].info;
			let vk = developers[data].vk;
			console.log(name, info);
			drawPictureData(name, info, vk); 
		}
	})
}

async function drawPictureData(name, work, vk){
	let nameField = sel('.picture-info__name');
	let wordField = sel('.picture-info__work');
	let actionName = `<a href="${vk}" target="blank">${name}</a>`
	nameField.innerHTML = actionName;
	wordField.textContent = work;
}



