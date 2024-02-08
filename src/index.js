async function getWeather(place) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=b82d8915a02847cbad2102228240202&q=${place}`,
    { mode: "cors" }
  );
  const weather = await response.json();
  console.log(weather);
  display(weather);
}

function display(result) {
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

  icon.src = result.current.condition.icon;
  icon.width = 100;
  icon.height = 100;

  desc.textContent = result.current.condition.text;
  location.textContent = `${result.location.name}, ${result.location.country}`;
  time.textContent = `${result.location.localtime}`;
  weather.textContent = `${result.current.temp_c}\u00B0C`;

  feel.textContent = `feels like ${result.current.feelslike_c}\u00B0C`;
  humidity.textContent = `Humidity: ${result.current.humidity}`;
  wind.textContent = `Wind: ${result.current.wind_kph}kph`;
  visibility.textContent = `Visibility: ${result.current.vis_km}km`;
  uv.textContent = `UV: ${result.current.uv}`;
  pressure.textContent = `Pressure: ${result.current.pressure_in}in`;
}

const btn = document.querySelector("#btn");
btn.addEventListener("click", (e) => {
  const place = document.querySelector("input");
  getWeather(place.value);
  place.value = "";
  e.preventDefault();
});
