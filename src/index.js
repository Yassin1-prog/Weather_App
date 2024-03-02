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

const details = document.querySelector(".details");
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
  details.style.visibility = "visible";
  icon.src = result.current.condition.icon;
  icon.width = 100;
  icon.height = 100;

  desc.textContent = result.current.condition.text;
  console.log(result.current.condition.text);
  getGiph(result.current.condition.text);

  location.textContent = `${result.location.name}, ${result.location.country}`;
  time.textContent = `${result.location.localtime}`;
  weather.textContent = `${result.current.temp_c}\u00B0C`;

  feel.textContent = ` ${result.current.feelslike_c}\u00B0C`;
  humidity.textContent = ` ${result.current.humidity}`;
  wind.textContent = ` ${result.current.wind_kph}kph`;
  visibility.textContent = ` ${result.current.vis_km}km`;
  uv.textContent = ` ${result.current.uv}`;
  pressure.textContent = ` ${result.current.pressure_in}in`;
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
  details.style.visibility = "visible";
  icon.src = result.current.condition.icon;
  icon.width = 100;
  icon.height = 100;

  desc.textContent = result.current.condition.text;
  getGiph(result.current.condition.text);

  location.textContent = `${result.location.name}, ${result.location.country}`;
  time.textContent = `${result.location.localtime}`;
  weather.textContent = `${result.current.temp_f}\u00B0F`;
  feel.textContent = ` ${result.current.feelslike_f}\u00B0F`;
  humidity.textContent = ` ${result.current.humidity}`;
  wind.textContent = ` ${result.current.wind_mph}mph`;
  visibility.textContent = ` ${result.current.vis_miles}miles`;
  uv.textContent = ` ${result.current.uv}`;
  pressure.textContent = ` ${result.current.pressure_mb}mb`;
}

const fmButton = document.querySelector(".fm");
fmButton.addEventListener("click", () => {
  flag = 1;
  getWeather(locatio);
  getForcast(locatio);
});

const ckButton = document.querySelector(".ck");
ckButton.addEventListener("click", () => {
  flag = 0;
  getWeather(locatio);
  getForcast(locatio);
});

async function getForcast(place) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=b82d8915a02847cbad2102228240202&q=${place}&days=3`,
      { mode: "cors" }
    );
    if (!response.ok) {
      throw new Error("Weather API  forecast request failed");
    }
    const future = await response.json();
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
  for (let i = 0; i < 3; i++) {
    const div = document.createElement("div");
    div.classList.add("day");
    const container = document.createElement("span");
    const day = document.createElement("span");
    const deg = document.createElement("span");
    const img = document.createElement("img");
    img.classList.add("wet");

    day.textContent = getDayName(future.forecast.forecastday[i].date);

    img.src = future.forecast.forecastday[i].day.condition.icon;
    if (flag === 0) {
      deg.textContent = `${future.forecast.forecastday[i].day.avgtemp_c}\u00B0C`;
    } else {
      deg.textContent = `${future.forecast.forecastday[i].day.avgtemp_f}\u00B0F`;
    }
    container.appendChild(img);
    container.appendChild(deg);

    div.appendChild(day);
    div.appendChild(container);

    placeholder.appendChild(div);
  }
}
