const apiKey = "c986548fa961422e8b70fc026a0945a6";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weatherIcon = document.querySelector(".weather-image i");

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

const container = document.querySelector(".container");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  }
  const data = await response.json();
  console.log(data, "data");

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clear") {
    weatherIcon.className = "fa-solid fa-sun";
    container.style.background = "linear-gradient(#ee8041, #f9e1a5 , #29B5D5)";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.className = "fa-solid fa-cloud-rain";
    container.style.background = "linear-gradient(#dfe6e2, #9198e5)";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.className = "fa-solid fa-cloud-mist";
    container.style.background = "linear-gradient(#e5e7e1, #cac6d2)";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.className = "fa-solid fa-cloud-hail";
    container.style.background = "linear-gradient(#9fbfc6, #7292A4)";
  } else {
    weatherIcon.className = "fa-solid fa-cloud";
    container.style.background = "linear-gradient(#1144DC ,#1CFABF)";
  }

  weather.style.display = "block";
  error.style.display = "none";
}

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});
