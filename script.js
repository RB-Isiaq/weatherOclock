const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search button");
const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const iconElement = document.querySelector(".icon");
const descriptionEle = document.querySelector(".description");
const humidityEle = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");
const loading = document.querySelector(".loading");
const dateTime = document.querySelector(".date");

let weather = {
  apiKey: "6a1c7685c0dfffec45ac3c2ea52d3b40",

  async fetchWeather(city) {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    );
    const data = await result.json();
    this.displayWeather(data);
  },
  displayWeather(data) {
    const { name } = data;
    const { country } = data.sys;
    const { main, icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { dt } = data;
    console.log(data);
    cityName.innerText = `${name}, ${country}`;
    iconElement.src = `http://openweathermap.org/img/wn/${icon}.png`;
    temperature.innerText = `${temp}°C`;
    descriptionEle.innerText = `${description}`;
    humidityEle.innerText = `Humidity: ${humidity}%`;
    windSpeed.innerText = `Wind Speed: ${speed} km/h`;
    loading.style.display = "none";
    document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short", // long or 2-digit
      year: "numeric", // 2-digit
      // weekday: 'short', // short or narrow
    };
    const date = new Intl.DateTimeFormat(navigator.locale, options).format(now);
    console.log(date);
    dateTime.innerText = date;
  },
  search() {
    this.fetchWeather(searchBar.value);
  },
};
weather.fetchWeather("lagos");
searchBtn.addEventListener("click", function () {
  weather.search();
  searchBar.value = "";
});
searchBar.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    weather.search();
    searchBar.value = "";
  }
});
