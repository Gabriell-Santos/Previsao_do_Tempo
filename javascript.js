// Seleção de Elementos
const unsplashApiKey = "f7qMhusoFyZTzgHYegf0KLPJvcrTcxWS7DggkON221g";
const Apikey = "62b7a6d0102fcb62feeda09e8b75a278";
const apicountryURL = "https://flagsapi.com/";

const cityInput = document.querySelector("#city-input");
const button = document.querySelector("#search");

const Cityelement = document.querySelector("#city");
const TempElement = document.querySelector("#Temperature");
const DescElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const CountryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const WindElement = document.querySelector("#wind span");
const weatherData = document.querySelector("#weather-data");
const backgroundElement = document.querySelector("body");

// Funções
const getWeatherData = async (City) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=${Apikey}&lang=pt_br`;
  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  return data;
};

// Função para buscar imagem de fundo no Unsplash
const getCityImage = async (City) => {
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${City}&client_id=${unsplashApiKey}&orientation=landscape`;
  const res = await fetch(unsplashUrl);
  const data = await res.json();

  // Verifica se a imagem existe e pega a primeira
  if (data.results.length > 0) {
    return data.results[0].urls.regular;
  } else {
    return null;
  }
};

const showWeatherData = async (City) => {
  const data = await getWeatherData(City);

  Cityelement.innerHTML = data.name;
  TempElement.innerHTML = parseInt(data.main.temp) + " °C";
  DescElement.innerHTML = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );

  CountryElement.setAttribute(
    "src",
    `${apicountryURL}${data.sys.country}/flat/64.png`
  );
  humidityElement.innerHTML = `${data.main.humidity} %`;
  WindElement.innerHTML = `${data.wind.speed} Km/h`;

  // Chama a função para buscar imagem

  const cityImageUrl = await getCityImage(City);
  if (cityImageUrl) {
    backgroundElement.style.backgroundImage = `url(${cityImageUrl})`;
    backgroundElement.style.backgroundSize = "cover";
    backgroundElement.style.backgroundPosition = "center";
  }

  weatherData.classList.remove("hide");
};

// Eventos
button.addEventListener("click", (e) => {
  e.preventDefault();
  const City = cityInput.value;
  showWeatherData(City);
});

cityInput.addEventListener("keypress", (e) => {
  console.log(e.key);
  if (e.key === "Enter") {
    const City = cityInput.value.trim();
    if (City) {
      showWeatherData(City);
    }
  }
});
