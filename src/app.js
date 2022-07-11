String.prototype.firstLetterCaps = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
// let cityTemperature = document.querySelector("#temperature");
// console.log(cityTemperature);
// let temperatureCelsius = cityTemperature.innerHTML; // 15

// let fahrenheit = document.querySelector("#fahrenheit-link");
// console.log(fahrenheit);
// fahrenheit.addEventListener("click", changeTemperatureF);

// let celsius = document.querySelector("#celsius-link");
// console.log(celsius);
// celsius.addEventListener("click", changeTemperatureC);


// function changeTemperatureF(){
	
// 	let fahrenheitTemperature = Math.round((temperatureCelsius*1.8)+32);
// 	console.log(fahrenheitTemperature);
// 	cityTemperature.innerHTML = fahrenheitTemperature;	
// }

// function changeTemperatureC(){
// 	cityTemperature.innerHTML = temperatureCelsius;
// }

function search(event){
	event.preventDefault();
	let searchInput = document.querySelector("#form-city");
	let h1 = document.querySelector("h1");
	h1.innerHTML = `${searchInput.value}`;
	h1.innerHTML = h1.innerHTML.firstLetterCaps();
	let apiKey = "9de11751bb0c887f6952489fac12bc96";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${h1.innerHTML}&appid=${apiKey}&units=metric`;
	function showTemperature(response) {
		console.log(response);
		let temperature = Math.round(response.data.main.temp);
		let cityTemperature = document.querySelector("#temperature");
		cityTemperature.innerHTML = `${temperature}`;
		let wind = Math.round(response.data.wind.speed);
		let cityWind = document.querySelector("#wind-speed");
		cityWind.innerHTML = `${wind}`;
		let humidity = Math.round(response.data.main.humidity);
		let cityHumidity = document.querySelector("#precipitation-percent");
		cityHumidity.innerHTML = `${humidity}`;
	}
	axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#form-search");
form.addEventListener("submit", search);

let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10){
	hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10){
	minutes = `0${minutes}`;
}
let time = `${hours}:${minutes}`;
let weekDay = document.querySelector("h5.day");
weekDay.innerHTML = `${day}, ${time}`;



let apiKey = "9de11751bb0c887f6952489fac12bc96";
let cityBoryslav = document.querySelector("h1");
let Boryslavcity = cityBoryslav.innerHTML;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${Boryslavcity}&appid=${apiKey}&units=metric`;

function showTemperatureBoryslav(response) {
	let temperature = Math.round(response.data.main.temp);
	let cityTemperature = document.querySelector("#temperature");
	cityTemperature.innerHTML = `${temperature}`;
	let wind = Math.round(response.data.wind.speed);
	let cityWind = document.querySelector("#wind-speed");
	cityWind.innerHTML = `${wind}`;
	let humidity = Math.round(response.data.main.humidity);
	let cityHumidity = document.querySelector("#precipitation-percent");
	cityHumidity.innerHTML = `${humidity}`;
}
axios.get(apiUrl).then(showTemperatureBoryslav);

	function showTemperatureMyLocation(response){
		console.log(response);
		let cityNames = response.data.name;
		console.log(cityNames);
		let cityName = document.querySelector("#city");
		cityName.innerHTML = `${cityNames}`;
		
		let temperature = Math.round(response.data.main.temp);
		let cityTemperature = document.querySelector("#temperature");
		cityTemperature.innerHTML = `${temperature}`;
		let wind = Math.round(response.data.wind.speed);
		let cityWind = document.querySelector("#wind-speed");
		cityWind.innerHTML = `${wind}`;
		let humidity = Math.round(response.data.main.humidity);
		let cityHumidity = document.querySelector("#precipitation-percent");
		cityHumidity.innerHTML = `${humidity}`;
	}

	function changeMyLocation(position){
		let latitude = position.coords.latitude;
		console.log(latitude);
		let longitude = position.coords.longitude;
		console.log(longitude);
		let apiKey = "9de11751bb0c887f6952489fac12bc96";
		let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
		axios.get(apiUrl).then(showTemperatureMyLocation)
	}

function changeLocation(){
	navigator.geolocation.getCurrentPosition(changeMyLocation);
}
let currentInput = document.querySelector("#form-current");
currentInput.addEventListener("click", changeLocation);

