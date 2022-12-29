// current day and time feature
let todayIs = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

let currentTime = document.querySelector("#current-date");
currentTime.innerHTML = `It is currently ${formatDate(todayIs)} for you`;

//Display weather

function currentCityTemp(response) {
  document.querySelector(".cityName").innerHTML = response.data.name;
  document.querySelector(
    "#temperature-value"
  ).innerHTML = `It is currently ${Math.round(response.data.main.temp)} °C`;
  document.querySelector(
    "#current-description"
  ).innerHTML = `${response.data.weather[0].main}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchForCity(city) {
  let apiKey = "3efd1e97a559110d8a41f701f85fefbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentCityTemp);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchForCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function showLocation(position) {
  let apiKey = "3efd1e97a559110d8a41f701f85fefbb";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(currentCityTemp);
}
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCurrentLocation);
