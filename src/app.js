String.prototype.firstLetterCaps = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
}
function displayForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = `<div class="row">`;
	let days = ["Tue", "Fri", "Sat", "Mon",];
	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
		forecastHTML = forecastHTML + `          
        <div class="card">
            <div class="card-title">${formatDay(forecastDay.dt)}</div>
            <img class="card-img" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/>
            <div class="card-tenperature">
                <span class="card-temperature-max"> ${Math.round(forecastDay.temp.max)}°C</span><br/>
                <span class="card-temperature-min">${Math.round(forecastDay.temp.min)}°C</span>
            </div>
        </div>`;
		}
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
	
}
function getForecast(coordinates){
	let apiKey = "9de11751bb0c887f6952489fac12bc96";
	let ApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(ApiUrl).then(displayForecast);
}
let celsiusTemperature = null;
	
function search(event){
	event.preventDefault();
	let searchInput = document.querySelector("#form-city");
	let h1 = document.querySelector("h1");
	h1.innerHTML = `${searchInput.value}`;
	h1.innerHTML = h1.innerHTML.firstLetterCaps();
	let apiKey = "9de11751bb0c887f6952489fac12bc96";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${h1.innerHTML}&appid=${apiKey}&units=metric`;
	function showTemperature(response) {
		// let now = new Date().toLocaleDateString();

		// let hours = now.getHours();
		// console.log(now)
		// console.log(hours)
		celsiusTemperature = response.data.main.temp;
		let temperature = Math.round(celsiusTemperature);
		let cityTemperature = document.querySelector("#temperature");
		cityTemperature.innerHTML = `${temperature}`;
		let wind = Math.round(response.data.wind.speed);
		let cityWind = document.querySelector("#wind-speed");
		cityWind.innerHTML = `${wind}`;
		let humidity = Math.round(response.data.main.humidity);
		let cityHumidity = document.querySelector("#humidity-percent");
		cityHumidity.innerHTML = `${humidity}`;
		let weatherIcon = document.querySelector("#icon");
		weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
		getForecast(response.data.coord);
		
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
	celsiusTemperature = response.data.main.temp;
	let temperature = Math.round(celsiusTemperature);
	let cityTemperature = document.querySelector("#temperature");
	cityTemperature.innerHTML = `${temperature}`;
	let wind = Math.round(response.data.wind.speed);
	let cityWind = document.querySelector("#wind-speed");
	cityWind.innerHTML = `${wind}`;
	let humidity = Math.round(response.data.main.humidity);
	let cityHumidity = document.querySelector("#humidity-percent");
	cityHumidity.innerHTML = `${humidity}`;
	let weatherIcon = document.querySelector("#icon");
	weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	getForecast(response.data.coord);
}
axios.get(apiUrl).then(showTemperatureBoryslav);


function showTemperatureMyLocation(response){
	let cityNames = response.data.name;
	let cityName = document.querySelector("#city");
	cityName.innerHTML = `${cityNames}`;
	celsiusTemperature = response.data.main.temp;	
	let temperature = Math.round(celsiusTemperature);
	let cityTemperature = document.querySelector("#temperature");
	cityTemperature.innerHTML = `${temperature}`;
	let wind = Math.round(response.data.wind.speed);
	let cityWind = document.querySelector("#wind-speed");
	cityWind.innerHTML = `${wind}`;
	let humidity = Math.round(response.data.main.humidity);
	let cityHumidity = document.querySelector("#humidity-percent");
	cityHumidity.innerHTML = `${humidity}`;
	let weatherIcon = document.querySelector("#icon");
	weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	getForecast(response.data.coord);
}

function changeMyLocation(position){
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiKey = "9de11751bb0c887f6952489fac12bc96";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
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
	axios.get(apiUrl).then(showTemperatureMyLocation);
}

function changeLocation(){
	navigator.geolocation.getCurrentPosition(changeMyLocation);
}
let currentInput = document.querySelector("#form-current");
currentInput.addEventListener("click", changeLocation);

function displayFahrenheitTemperature(event){
	event.preventDefault();
	let fahrenheitTemperature = Math.round((celsiusTemperature*9)/5+32);
	let cityTemperature = document.querySelector("#temperature");
	cityTemperature.innerHTML = fahrenheitTemperature;
	// remove and add the active class 
	celsius.classList.remove("active");
	fahrenheit.classList.add("active");
}

function displayCelsiusTemperature(event){
	event.preventDefault();
	let cityTemperature = document.querySelector("#temperature");
	cityTemperature.innerHTML = Math.round(celsiusTemperature);
	celsius.classList.add("active");
	fahrenheit.classList.remove("active");
}


let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", displayCelsiusTemperature);