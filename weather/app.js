const API_KEY = "9505fd1df737e20152fbd78cdb289b6a";
const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" +
  API_KEY;

const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const errorMessage = document.getElementById("errorMessage");
const weatherResult = document.getElementById("weatherResult");
const loading = document.querySelector(".loading");
const cityName = document.querySelector(".city-name figcaption");
const countryFlag = document.querySelector(".city-name img");
const weatherIcon = document.querySelector(".temperature img");
const temperature = document.querySelector(".temperature span");
const description = document.querySelector(".description");
const clouds = document.getElementById("clouds");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    showError("Masukkan nama kota");
  }
});

async function getWeather(city) {
  showLoading(true);
  hideError();
  hideWeather();

  try {
    const response = await fetch(`${BASE_URL}&q=${city}`);
    const data = await response.json();

    if (data.cod === 200) {
      renderWeather(data);
      showWeather();
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError("Terjadi kesalahan saat mengambil data");
  } finally {
    showLoading(false);
  }
}

function renderWeather(data) {
  cityName.textContent = data.name;
  countryFlag.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  temperature.textContent = Math.round(data.main.temp);
  description.textContent = data.weather[0].description;
  clouds.textContent = data.clouds.all;
  humidity.textContent = data.main.humidity;
  pressure.textContent = data.main.pressure;
}

function showLoading(isLoading) {
  loading.classList.toggle("hidden", !isLoading);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function hideError() {
  errorMessage.classList.add("hidden");
}

function showWeather() {
  weatherResult.classList.remove("hidden");
}

function hideWeather() {
  weatherResult.classList.add("hidden");
}

// Init app with default city
const initApp = () => {
  cityInput.value = "Jakarta";
  getWeather("Jakarta");
};

initApp();
