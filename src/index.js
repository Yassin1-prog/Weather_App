let flag = 0;
let locatio;

async function getWeather(place) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=b82d8915a02847cbad2102228240202&q=${place}`,
      { mode: "cors" }
    );
    if (!response.ok) {
      throw new Error("Weather API request failed");
    }
    const weather = await response.json();
    if (flag === 0) {
      display(weather);
    } else {
      displayFM(weather);
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

async function getGiph(photo) {
  try {
    const img = document.querySelector("#gph");

    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?key=T30kebQo5u4qSPUOCzOPvri24dKUnxhs&s=${photo} sky`,
      { mode: "cors" }
    );
    if (!response.ok) {
      throw new Error("Giphy API request failed");
    }
    const giph = await response.json();
    img.src = giph.data.images.original.url;
    img.width = 450;
    img.height = 350;
  } catch (error) {
    console.error("Error fetching Giphy:", error);
  }
}

const icon = document.querySelector("#icon");
const desc = document.querySelector(".desc");
const location = document.querySelector(".location");
const time = document.querySelector(".time");
const weather = document.querySelector(".weather");
const feel = document.querySelector(".feel");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const visibility = document.querySelector(".visibility");
const uv = document.querySelector(".uv");
const pressure = document.querySelector(".pressure");

function display(result) {
  icon.src = result.current.condition.icon;
  icon.width = 100;
  icon.height = 100;

  desc.textContent = result.current.condition.text;
  console.log(result.current.condition.text);
  getGiph(result.current.condition.text);

  location.textContent = `${result.location.name}, ${result.location.country}`;
  time.textContent = `${result.location.localtime}`;
  weather.textContent = `${result.current.temp_c}\u00B0C`;

  feel.textContent = `feels like    ${result.current.feelslike_c}\u00B0C`;
  humidity.textContent = `Humidity:   ${result.current.humidity}`;
  wind.textContent = `Wind:   ${result.current.wind_kph}kph`;
  visibility.textContent = `Visibility:   ${result.current.vis_km}km`;
  uv.textContent = `UV:   ${result.current.uv}`;
  pressure.textContent = `Pressure:   ${result.current.pressure_in}in`;
}

const place = document.querySelector("input");
const btn = document.querySelector("#btn");
btn.addEventListener("click", (e) => {
  getWeather(place.value);
  getForcast(place.value);
  locatio = place.value;
  place.value = "";
  e.preventDefault();
});

function displayFM(result) {
  icon.src = result.current.condition.icon;
  icon.width = 100;
  icon.height = 100;

  desc.textContent = result.current.condition.text;
  console.log(result.current.condition.text);
  getGiph(result.current.condition.text);

  location.textContent = `${result.location.name}, ${result.location.country}`;
  time.textContent = `${result.location.localtime}`;
  weather.textContent = `${result.current.temp_f}\u00B0F`;
  feel.textContent = `feels like    ${result.current.feelslike_f}\u00B0F`;
  humidity.textContent = `Humidity:   ${result.current.humidity}`;
  wind.textContent = `Wind:   ${result.current.wind_mph}mph`;
  visibility.textContent = `Visibility:   ${result.current.vis_miles}miles`;
  uv.textContent = `UV:   ${result.current.uv}`;
  pressure.textContent = `Pressure:   ${result.current.pressure_mb}mb`;
}

const fmButton = document.querySelector(".fm");
fmButton.addEventListener("click", () => {
  flag = 1;
  getWeather(locatio);
});

const ckButton = document.querySelector(".ck");
ckButton.addEventListener("click", () => {
  flag = 0;
  getWeather(locatio);
});

async function getForcast(place) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=b82d8915a02847cbad2102228240202&q=${place}&days=7`,
      { mode: "cors" }
    );
    if (!response.ok) {
      throw new Error("Weather API  forecast request failed");
    }
    const future = await response.json();
    console.log(future);
    console.log(future.forecast.forecastday[5].day.avgtemp_c);
    showForecast(future);
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}

function getDayName(dateString) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(dateString);

  const dayOfWeek = date.getDay();

  return daysOfWeek[dayOfWeek];
}

function showForecast(future) {
  const placeholder = document.querySelector(".forecast");
  placeholder.textContent = "";
  for (let i = 0; i < 7; i++) {
    const div = document.createElement("div");
    div.classList.add("day");
    const container = document.createElement("span");
    const day = document.createElement("span");
    const deg = document.createElement("span");
    const img = document.createElement("img");

    day.textContent = getDayName(future.forecast.forecastday[i].date);

    img.src = future.forecast.forecastday[i].day.condition.icon;
    deg.textContent = `${future.forecast.forecastday[i].day.avgtemp_c}\u00B0C`;
    container.appendChild(img);
    container.appendChild(deg);

    div.appendChild(day);
    div.appendChild(container);

    placeholder.appendChild(div);
  }
}
