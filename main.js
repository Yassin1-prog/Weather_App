/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("async function getWeather(place) {\n  const response = await fetch(\n    `https://api.weatherapi.com/v1/current.json?key=b82d8915a02847cbad2102228240202&q=${place}`,\n    { mode: \"cors\" }\n  );\n  const weather = await response.json();\n  console.log(weather);\n  display(weather);\n}\n\nfunction display(result) {\n  const icon = document.querySelector(\"#icon\");\n  const desc = document.querySelector(\".desc\");\n  const location = document.querySelector(\".location\");\n  const time = document.querySelector(\".time\");\n  const weather = document.querySelector(\".weather\");\n  const feel = document.querySelector(\".feel\");\n  const humidity = document.querySelector(\".humidity\");\n  const wind = document.querySelector(\".wind\");\n  const visibility = document.querySelector(\".visibility\");\n  const uv = document.querySelector(\".uv\");\n  const pressure = document.querySelector(\".pressure\");\n\n  icon.src = result.current.condition.icon;\n  icon.width = 100;\n  icon.height = 100;\n\n  desc.textContent = result.current.condition.text;\n  location.textContent = `${result.location.name}, ${result.location.country}`;\n  time.textContent = `${result.location.localtime}`;\n  weather.textContent = `${result.current.temp_c}\\u00B0C`;\n\n  feel.textContent = `feels like ${result.current.feelslike_c}\\u00B0C`;\n  humidity.textContent = `Humidity: ${result.current.humidity}`;\n  wind.textContent = `Wind: ${result.current.wind_kph}kph`;\n  visibility.textContent = `Visibility: ${result.current.vis_km}km`;\n  uv.textContent = `UV: ${result.current.uv}`;\n  pressure.textContent = `Pressure: ${result.current.pressure_in}in`;\n}\n\nconst btn = document.querySelector(\"#btn\");\nbtn.addEventListener(\"click\", (e) => {\n  const place = document.querySelector(\"input\");\n  getWeather(place.value);\n  place.value = \"\";\n  e.preventDefault();\n});\n\n\n//# sourceURL=webpack://html_css_js_template/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;