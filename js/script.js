function setupUi() {
	document.body.addEventListener('contextmenu', (e) => {
		var menu = document.querySelector('.context-menu');
		menu.style.top = e.pageY + 'px';
		menu.style.left = e.pageX + 'px';
		togglePopup(menu);
		e.preventDefault();
		return false;
	});
	document.body.addEventListener('click', () => {
		var popups = document.querySelectorAll('.popup');
		for (var i = 0; i < popups.length; i++) {
			togglePopup(popups[i], 0);
		}
	});
};

function togglePopup(el, mode=1) {
	var displaying = (el.accessKey.trim() != '' && el.accessKey != '0');

	if (mode != 1 && !displaying)
		return;

	if (!displaying) {
		el.style.animation = 'tdExpandInBounce 0.3s ease 0s forwards';
		el.style.pointerEvents = 'auto';
		el.accessKey = '1';
	}
	else {
		el.style.animation = 'tdShrinkOutBounce 0.3s ease 0s forwards';
		el.style.pointerEvents = 'none';
		el.accessKey = '0';
	}
};

function showDiscordSubmenu(e) {
	var submenu = document.querySelector('li#item-discord').querySelector('nav.submenu');
	togglePopup(submenu);
	e.stopPropagation();
};

function showAboutCard(e) {
	var about = document.querySelector('div.about-card-wrapper');
	togglePopup(about);
	e.stopPropagation();
};

function copyDiscordTag(e) {
	var dtag = e.target.innerText;
	var text = document.createElement('textarea');
	text.style.position = 'absolute';
	text.style.left = '-9999px';
	text.style.top = '0';
	text.innerHTML = dtag;
	text.classList.add('copyarea');
	e.target.append(text);
	text.select();
	
	document.execCommand('copy');
	setTimeout(() => {
		document.querySelector('textarea.copyarea').remove();
		togglePopup(document.querySelector('li#item-discord').querySelector('nav.submenu'));
	}, 100);

	togglePopup(document.querySelector('.msg-wrapper'));
	setTimeout(() => {
		togglePopup(document.querySelector('.msg-wrapper'), 0);
	}, 3000);
	e.stopPropagation();
};

function changePicture(e, num) {
	var img = document.querySelector('.space-obj > img');
	switch (num) {
		case 0:
			img.src = 'img/earth.png';
			break;
		case 1:
			img.src = 'img/moon.png';
			break;
		case 2:
			img.src = 'img/sun.png';
			break;
	}
	togglePopup(document.querySelector('.context-menu'));
};
