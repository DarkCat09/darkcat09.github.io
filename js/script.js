// Computing My Age
// Вычисление моего возраста
var birthday = new Date(2009, 7, 13, 13);
try {
	// https://ru.stackoverflow.com/questions/576478/javascript-Вычисление-возраста-по-дате-рождения
	document.getElementById('age-js').innerHTML = Math.floor((Date.now() - birthday.getTime()) / (24 * 3600 * 365.25 * 1000));
}
catch (ex) {
	console.log('Произошла ошибка при попытке рендеринга моего возраста! Подробнее:\n' + ex.message);
}
