'use strict';

$(window).on('load', function() {
	// ПЕРЕМЕННЫЕ ДЛЯ ОТПРАВКИ ФОРМЫ
	window.progForForm = '';
	window.sizePeopleForForm = '';
	window.recForForm = [];

	// Переменные для цен
	var progPrice = undefined,
		addNumPrice = [],
		addStrPrice = [];
	
	var wrap = $('.wrapper'), // div.wrapper 
		fireWrap = $('.fire-wrapper'); // div.fire-wrapper

	var programs = $('.programs'), // section.programs
		forms = $('.forms'); // section.forms

	var firstForm = $('.first'), // div.first (первая форма)
		secondForm = $('.second'), // div.second (вторая форма)
		thirdForm = $('.fire-third'); // div.third (третья форма)

	// Переходим к блоку программ фаер шоу -----------------------------------
	$('#btn-fire').on('click', function(e){
		wrap.removeClass('display-flex-rev');
		wrap.toggleClass('display-none');
		setTimeout(function(){
			fireWrap.removeClass('display-none-rev');
			fireWrap.toggleClass('display-flex');
		}, 200); 
		setTimeout(function(){
			wrap.css('display', 'none'); // Скрываем "div.wrapper"
			fireWrap.css('display', 'flex'); // Открываем "div.fire-wrapper"
		}, 1000);
	});

	// Обрабатываем кнопку "назад" к выбору типа шоу
	$('[data-btn-id="fire-wrapper--wrapper"]').on('click', function(e){
		fireWrap.toggleClass('display-flex display-none-rev');
		setTimeout(function(){
			wrap.toggleClass('display-none display-flex-rev');
		}, 200);
		setTimeout(function(){
			fireWrap.css('display', 'none'); // Скрываем "div.fire-wrapper"
			wrap.css('display', 'flex'); // Скрываем "div.wrapper"
		}, 1000);
	});

	// Обрабатываем кнопку "выбрать" программу moon-light -----------------------------------
	$('#btn-moon-light').on('click', function(e){
		window.progForForm = 'MoonLight - FireShow'; // Записали в переменную, программу которую выбрали

		programs.removeClass('display-flex-rev');
		programs.toggleClass('display-none');
		setTimeout(function(){
			forms.removeClass('display-none-rev');
			forms.toggleClass('display-flex');
		}, 200);
		setTimeout(function(){
			programs.css('display', 'none'); // Скрываем "section.programs"
			forms.css('display', 'flex'); // Открываем "section.forms"
		}, 1000);
	});

	// Обрабатываем кнопку "выбрать" программу Obsidian -----------------------------------
	$('#btn-obsidian').on('click', function(e){
		window.progForForm = 'Obsidian - FireShow'; // Записали в переменную, программу которую выбрали

		programs.removeClass('display-flex-rev');
		programs.toggleClass('display-none');
		setTimeout(function(){
			forms.removeClass('display-none-rev');
			forms.toggleClass('display-flex');
		}, 200);
		setTimeout(function(){
			programs.css('display', 'none'); // Скрываем "section.programs"
			forms.css('display', 'flex'); // Открываем "section.forms"
		}, 1000);
	});

	// Обрабатываем кнопку "назад" к выбору программы фаер шоу
	$('[data-btn-id="fire-forms--fire-programs"]').on('click', function(e){
		window.progForForm = ''; // Удалили из переменной, программу которую выбрали

		forms.toggleClass('display-flex display-none-rev');
		setTimeout(function(){
			programs.toggleClass('display-none display-flex-rev');
		}, 200);
		setTimeout(function(){
			forms.css('display', 'none'); // Скрываем "section.forms"
			programs.css('display', 'flex'); // Открываем "section.programs"
		}, 1000);
	});

	// Обрабатываем выбор "количества артистов" -----------------------------------
	$('.first__list-people').on('click', function(e){ // Наложили обработчик на список ul
		var target = e.target, 
			firstFormDesc;

		while(target != this) {
			if(target.tagName == 'LI') {
				firstFormDesc = target.getAttribute('data-first-desc'); // Взяли значние атрибута
				progPrice = target.getAttribute('data-first-price'); // Взяли значние атрибута
				window.sizePeopleForForm = firstFormDesc; // Поместили данные в переменную для отправки формы
				firstForm.removeClass('forms-flex-rev');
				firstForm.toggleClass('forms-none');
				setTimeout(function(){
					secondForm.removeClass('forms-none-rev forms-flex');
					secondForm.toggleClass('forms-flex');
				}, 200);
				setTimeout(function(){
					firstForm.css('display', 'none'); // Скрываем "div.first"
					secondForm.css('display', 'flex'); // Открываем "div.second"
				}, 1000);
				break;
			}

			target = target.parentNode;	
		}
	});

	// Обрабатываем кнопку "назад" к выбору количества артистов
	$('[data-btn-id="fire-second--fire-first"]').on('click', function(e){
		window.sizePeopleForForm = ''; // Удалили данные из переменной для отправки формы

		secondForm.toggleClass('forms-flex forms-none-rev');
		setTimeout(function(){
			firstForm.toggleClass('forms-none forms-flex-rev');
		}, 200);
		setTimeout(function(){
			secondForm.css('display', 'none'); // Скрываем "div.second"
			firstForm.css('display', 'flex'); // Открываем "div.first"
		}, 1000);
	});

	// Обрабатываем выбор "дополниетльного реквизита" -----------------------------------
	$('.second__list').on('click', function(e){
		var target = e.target,
			secondFormDesc = target.getAttribute('data-second-desc'), // Взяли значние атрибута
			secondFormSelect = target.getAttribute('data-second-select'), // Взяли значние атрибута
			secondFormPrice = target.getAttribute('data-second-price'); // Взяли значние атрибута

		while(target != this) {
			if(target.tagName == 'BUTTON' && secondFormSelect == 'false') {
				window.recForForm.push(secondFormDesc); // Добавляем в массив данные для отправки формы
				
				if(isNumeric(+secondFormPrice)) {
					addNumPrice.push(secondFormPrice);
				} else {
					addStrPrice.push(secondFormPrice);
				}

				target.setAttribute('data-second-select', 'true'); // Включаем кнопку
				target.innerHTML = '<img class="selected" src="../img/selected.png" data-second-price="' + secondFormPrice + '">';
				target.classList.toggle('btn-select'); // Меняем стиль кнопки на включенный
				break;
			}

			if(target.tagName == 'BUTTON' || target.tagName == 'IMAGE' && secondFormSelect == 'true') {
				window.recForForm.forEach(function(item, i){ // Удаляем данные от выключеной кнопки
					if(item == secondFormDesc) {
						window.recForForm.splice(i, 1);
					}
				});
				addNumPrice.forEach(function(item, i){ // Удаляем данные от выключеной кнопки
					alert(item + ' : ' + secondFormPrice);
					if(item == secondFormPrice) {
						addNumPrice.splice(i, 1);
					}
				});
				addStrPrice.forEach(function(item, i){ // Удаляем данные от выключеной кнопки
					alert(item + ' : ' + secondFormPrice);
					if(item == secondFormPrice) {
						addStrPrice.splice(i, 1);
					}
				});
				target.setAttribute('data-second-select', 'false'); // Выключаем кнопку
				target.innerHTML = 'Выбрать';
				target.classList.toggle('btn-select'); // Меняем стиль кнопки на выключеный
				break;
			}
			target = target.parentNode;
		}
	});

	// Обрабатываем кнопку "далее" - после выбора доп. реквизита -----------------------------------
	$('.second-button').on('click', function(e){
		secondForm.removeClass('display-flex-rev forms-flex forms-none-rev');
		secondForm.toggleClass('display-none');
		setTimeout(function(){
			thirdForm.removeClass('display-none-rev');
			thirdForm.toggleClass('display-flex');
		}, 200);
		setTimeout(function(){
			secondForm.css('display', 'none'); // Скрываем "div.second"
			thirdForm.css('display', 'flex'); // Открываем "div.third"
		}, 1000);

		var textPrice = document.querySelector('.third_text-price');
		var resultPrice = +progPrice;

		addNumPrice.forEach(function(item) {
			if(isNumeric(item)) resultPrice += +item;
		});

		function strPrice() {
			var a = '';

			addStrPrice.forEach(function(item) {
				if(item) a += item;
			});

			return a;
		}

		// alert('resultPrice : ' + resultPrice + '\n' + 'addNumPrice : ' + addNumPrice + '\n' + 'addStrPrice : ' + addStrPrice + '\n' +'strPrice() : ' + strPrice())

		textPrice.innerHTML = 'Цена заказа в приделах Киева становит :' + '<p style="text-align: center">' + resultPrice + 'грн' + '</p><p style="text-align: center">' + strPrice() + '</p>';
	});

	// Обрабатываем кнопку "назад" к выбору доп. реквизита
	$('[data-btn-id="fire-third--fire-second"]').on('click', function(e){
		thirdForm.toggleClass('display-flex display-none-rev');
		setTimeout(function(){
			secondForm.toggleClass('display-none display-flex-rev');
		}, 200);
		setTimeout(function(){
			thirdForm.css('display', 'none'); // Скрываем "div.third"
			secondForm.css('display', 'flex'); // Открываем "div.second"
		}, 1000);
	});

// -----------------------------------------------------------------------------------------------------------------------------

	var lightWrap = $('.light-wrapper'); // div.light-wrapper

	var programs2 = $('.light-programs'), // section.programs
		forms2 = $('.light-forms'); // section.forms

	var firstForm2 = $('.light-first'), // div.first (первая форма)
		thirdForm2 = $('.light-third'); // div.third (третья форма)

	// Переходим к блоку программ световое шоу -----------------------------------
	$('#btn-light').on('click', function(e){
		wrap.removeClass('display-flex-rev');
		wrap.toggleClass('display-none');
		setTimeout(function(){
			lightWrap.removeClass('display-none-rev');
			lightWrap.toggleClass('display-flex');
		}, 200);
		setTimeout(function(){
			wrap.css('display', 'none'); // Скрываем "div.wrapper"
			lightWrap.css('display', 'flex'); // Открываем "div.light-wrapper"
		}, 1000);
	});

	// Обрабатываем кнопку "назад" к выбору типа шоу
	$('[data-btn-id="light-wrapper--wrapper"]').on('click', function(e){
		lightWrap.toggleClass('display-flex display-none-rev');
		setTimeout(function(){
			wrap.toggleClass('display-none display-flex-rev');
		}, 200);
		setTimeout(function(){
			lightWrap.css('display', 'none'); /// Скрываем "div.light-wrapper"
			wrap.css('display', 'flex'); // Скрываем "div.wrapper"
		}, 1000);
	});

	// Обрабатываем кнопку "выбрать" программу Ice-LED -----------------------------------
	$('#btn-moon-light-led').on('click', function(e){
		window.progForForm = 'Ice-LED - LightShow'; // Записали в переменную, программу которую выбрали

		programs2.removeClass('display-flex-rev');
		programs2.toggleClass('display-none');
		setTimeout(function(){
			forms2.removeClass('display-none-rev');
			forms2.toggleClass('display-flex');
		}, 200);
		setTimeout(function(){
			programs2.css('display', 'none'); // Скрываем "section.programs"
			forms2.css('display', 'flex'); // Открываем "section.forms"
		}, 1000);
	});

	// Обрабатываем кнопку "выбрать" программу obsidian-LED -----------------------------------
	$('#btn-obsidian-led').on('click', function(e){
		window.progForForm = 'Obsidian-LED - LightShow'; // Записали в переменную, программу которую выбрали

		programs2.removeClass('display-flex-rev');
		programs2.toggleClass('display-none');
		setTimeout(function(){
			forms2.removeClass('display-none-rev');
			forms2.toggleClass('display-flex');
		}, 200);
		setTimeout(function(){
			programs2.css('display', 'none'); // Скрываем "section.programs"
			forms2.css('display', 'flex'); // Открываем "section.forms"
		}, 1000);
	});

	// Обрабатываем кнопку "назад" к выбору программы фаер шоу
	$('[data-btn-id="light-forms--light-programs"]').on('click', function(e){
		window.progForForm = ''; // Удалили из переменной, программу которую выбрали

		forms2.toggleClass('display-flex display-none-rev');
		setTimeout(function(){
			programs2.toggleClass('display-none display-flex-rev');
		}, 200);
		setTimeout(function(){
			forms2.css('display', 'none'); // Скрываем "section.forms"
			programs2.css('display', 'flex'); // Открываем "section.programs"
		}, 1000);
	});

	// Обрабатываем выбор "количества артистов" -----------------------------------
	$('.first__list-people').on('click', function(e){ // Наложили обработчик на список ul
		var target = e.target, 
			firstFormDesc; 

		while(target != this) {
			if(target.tagName == 'LI' && target.getAttribute('data-light-first') == "true") {
				firstFormDesc = target.getAttribute('data-first-desc'); // Взяли значние атрибута
				progPrice = target.getAttribute('data-first-price'); // Взяли значние атрибута
				window.sizePeopleForForm = firstFormDesc; // Поместили данные в переменную для отправки формы

				firstForm2.removeClass('forms-flex-rev');
				firstForm2.toggleClass('forms-none');
				setTimeout(function(){
					thirdForm2.removeClass('forms-none-rev forms-flex');
					thirdForm2.toggleClass('forms-flex');
				}, 200);
				setTimeout(function(){
					firstForm2.css('display', 'none'); // Скрываем "div.first"
					thirdForm2.css('display', 'flex'); // Открываем "div.second"
				}, 1000);

				var textPrice = document.querySelectorAll('.third_text-price')[1];

				// alert('progPrice : ' + progPrice);

				textPrice.innerHTML = 'Цена заказа в приделах Киева становит :' + '<p style="text-align: center">' + progPrice + 'грн';

				break;
			}

			target = target.parentNode;	
		}
	});

	// Обрабатываем кнопку "назад" к выбору количества артистов
	$('[data-btn-id="light-third--light-first"]').on('click', function(e){
		window.sizePeopleForForm = ''; // Удалили данные из переменной для отправки формы

		thirdForm2.toggleClass('forms-flex forms-none-rev');
		setTimeout(function(){
			firstForm2.toggleClass('forms-none forms-flex-rev');
		}, 200);
		setTimeout(function(){
			thirdForm2.css('display', 'none'); // Скрываем "div.second"
			firstForm2.css('display', 'flex'); // Открываем "div.first"
		}, 1000);
	});

// -----------------------------------------------------------------------------------------------------------------------------

	var name = $('#name'),
		phone = $('#phone'),
		email = $('#email'),
		city = $('#city'),
		date = $('#date');

	var name2 = $('#name2'),
		phone2 = $('#phone2'),
		email2 = $('#email2'),
		city2 = $('#city2'),
		date2 = $('#date2');


	// Обрабатываем заполнение последней формы, и отправку данных на сервер
	$('#submit').on('click', function(e){
		var str = window.recForForm.join(', ');
		// alert(window.progForForm + ' : ' + window.sizePeopleForForm + ' : ' + str + ' : ' + name.val() + ' : ' + phone.val() + ' : ' + email.val() + ' : ' + city.val() + ' : ' + date.val());
		if(phone.val() == '' || phone.val() == ' ' || isNaN(phone.val())) {
			phone.addClass('formError');
		} else {
			phone.removeClass('formError');
			$.post(
				'../mail.php',
				{
					name: name.val(),
					phone: phone.val(),
					email: email.val(),
					city: city.val(),
					date: date.val(),
					program: window.progForForm,
					sizePeople: window.sizePeopleForForm,
					recvize: str
				},
				function(data){
					alert(data);
				}	
			);
		}
		
	});

	// Обрабатываем заполнение последней формы, и отправку данных на сервер
	$('#submit2').on('click', function(e){
		// alert(window.progForForm + ' : ' + window.sizePeopleForForm + ' : ' + str + ' : ' + name2.val() + ' : ' + phone2.val() + ' : ' + email2.val() + ' : ' + city2.val() + ' : ' + date2.val());
		if(phone2.val() == '' || phone2.val() == ' ' || isNaN(phone2.val())) {
			phone2.addClass('formError');
		} else {
			phone2.removeClass('formError');
			$.post(
				'../mail.php',
				{
					name: name2.val(),
					phone: phone2.val(),
					email: email2.val(),
					city: city2.val(),
					date: date2.val(),
					program: window.progForForm,
					sizePeople: window.sizePeopleForForm
				},
				function(data){
					alert(data);
				}	
			);
		}
	});



// -----------------------------------------------------------------------------------------------------------------------------
	
	// Реализация слайдера

	function pushArr(arr, dir, count) {
		for(var i = 1; i <= count; i++) {
			arr.push('img/programs/' + dir + '/slider-img' + i + '.jpg');
		}
	}

	// массивы картинок
	var arrMoonLight = [],
		arrObsidian = [],
		arrIceLed = [],
		arrObsidianLed = [];

	pushArr(arrMoonLight, 'moonlight', 9);
	pushArr(arrObsidian, 'obsidian', 7);
	pushArr(arrIceLed, 'ice-led', 5);
	pushArr(arrObsidianLed, 'obsidian-led', 9);

	var slider = document.querySelectorAll('.programs__slider');

	slider.forEach(function(item) {
		item.position = 0;
		item.width = 150;
		item.block = 3;

		item.onclick = function(e) {
			var target = e.target;

			
			if(target.tagName == 'IMG') {
				if(target.style.width === '100px') item.width = 100;

				var src = target.getAttribute('src');
				var getArr = target.getAttribute('data-img-prog');
				document.querySelector('.gallery').style.display = 'flex';

				if(getArr == 'moonlight') bigSlider(src, arrMoonLight);
				if(getArr == 'obsidian') bigSlider(src, arrObsidian);
				if(getArr == 'ice-led') bigSlider(src, arrIceLed);
				if(getArr == 'obsidian-led') bigSlider(src, arrObsidianLed);
			}


			while(target != this) {
				if(target.tagName == 'SPAN') {
					var img = target.parentNode.querySelectorAll('img');
					var ul = target.parentNode.querySelector('.programs__img-ul');
					var li = ul.querySelectorAll('.programs_img');

					var arrImg;

					img.forEach(function(item) {
						var getArr = item.getAttribute('data-img-prog');
						if(getArr === 'moonlight') arrImg = arrMoonLight;
						if(getArr === 'obsidian') arrImg = arrObsidian;
						if(getArr === 'ice-led') arrImg = arrIceLed;
						if(getArr === 'obsidian') arrImg = arrObsidianLed;
					});

					target.parentNode.querySelector('.prev').onclick = function() {
						item.position = Math.min(item.position + item.width * item.block, 0);
						ul.style.marginLeft = item.position + 'px';
					}


					target.parentNode.querySelector('.next').onclick = function() {
						item.position = Math.max(item.position - item.width * item.block, -item.width * (li.length - item.block));
						ul.style.marginLeft = item.position + 'px';
					}

					break;

				} else {
					target = target.parentNode;
				}
			}
			
		}
	});

	document.querySelector('.gallery_btn-close').onclick = function() {
		var div = document.querySelector('.gallery'),
			block = document.querySelector('.gallery-block'),
			img = document.querySelector('.gallery-img');

		div.style.display = 'none';
		block.removeChild(img);

	}





	function slider(countImg, arrImg, prev, next) {
		var ul = document.querySelectorAll('.programs__slider'),
			li = ul.querySelectorAll('.programs_img');

		var newImg = ul.querySelectorAll('.gallery-img');

		var position = 0;

		document.querySelector('.prev').onclick = function() {
			if(position > 0) {
				position--;
			} else {
				position = arrImg.length - 1;
			}

			newImg.setAttribute('src', arrImg[position]);
		}


		document.querySelector('.next').onclick = function() {
			if(position < arrImg.length - 1) {
				position++;
			} else {
				position = 0;
			}

			newImg.setAttribute('src', arrImg[position]);
		}

	}

	function bigSlider(countImg, arrImg) {
		var newImg = document.createElement('img');
		var btnPrev = document.querySelector('.gallery-prev');
		var btnNext = document.querySelector('.gallery-next');

		document.querySelector('.gallery-block').insertBefore(newImg, btnNext);
		
		newImg.setAttribute('src', countImg);
		newImg.classList.add('gallery-img');

		bigGallery(arrImg);
	}

	function bigGallery(arrImg) {
		var position = 0;
		var newImg = document.querySelector('.gallery-img');

		document.querySelector('.gallery-prev').onclick = function() {
			if(position > 0) {
				position--;
			} else {
				position = arrImg.length - 1;
			}

			newImg.setAttribute('src', arrImg[position]);
		}


		document.querySelector('.gallery-next').onclick = function() {
			if(position < arrImg.length - 1) {
				position++;
			} else {
				position = 0;
			}

			newImg.setAttribute('src', arrImg[position]);
		}
	}

// -----------------------------------------------------------------------------------------------------------------------------

	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

});



