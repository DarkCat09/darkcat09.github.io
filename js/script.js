function setupUi() {
	// Context Menu
	document.body.addEventListener('contextmenu', (e) => {
		var menu = document.querySelector('.context-menu');
		menu.style.top = e.pageY + 'px';
		menu.style.left = e.pageX + 'px';
		togglePopup(menu);
		e.preventDefault();
		return false;
	});
	// Hide Pop-ups
	document.body.addEventListener('click', () => {
		var popups = document.querySelectorAll('.popup');
		for (var i = 0; i < popups.length; i++) {
			togglePopup(popups[i], 0);
		}
	});
	// Initialize Hints
	var itemswh = document.querySelectorAll('.withhint');
	for (var j = 0; j < itemswh.length; j++) {
		itemswh[j].addEventListener('mouseover',  showHint);
		//itemswh[j].addEventListener('mousemove',  showHint);
		itemswh[j].addEventListener('mouseleave', hideHint);
	}
};

function initStars() {
	var colors = ['#aaa','#ddd','#eee','#fff'];
	var canvas = document.querySelector('canvas#stars');
	var w = canvas.width;
	var h = canvas.height;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, w, h);
	for (var star = 0; star < 200; star++) {
		ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
		ctx.fillRect(Math.round(Math.random()*w), Math.round(Math.random()*h), 1, 1);
	}
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
	}, 1500);
	e.stopPropagation();
};

function changePicture(e, num) {
	var img = document.querySelector('.space-obj > img');
	switch (num) {
		case 0:
			img.src = 'img/earth.gif';
			break;
		case 1:
			img.src = 'img/moon.gif';
			break;
		case 2:
			img.src = 'img/sun.gif';
			break;
	}
	togglePopup(document.querySelector('.context-menu'));
};

function spaceObjSpeed(spd) {
	document.querySelector('.space-obj>img').style.animationDuration = `${spd}s`;
};

function showHint(e) {
	var elid = e.target.id;
	var hintid = 'hint-' + (elid.startsWith('item-') ? elid.slice(5) : 'elem');
	var hintel = document.getElementById(hintid);
	if (hintel)
		hintel.style.opacity = '1';
};

function hideHint(e) {
	var elid = e.target.id;
	var hintid = 'hint-' + (elid.startsWith('item-') ? elid.slice(5) : 'elem');
	var hintel = document.getElementById(hintid);
	if (hintel)
		hintel.style.opacity = '0';
};
