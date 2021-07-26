let now = new Date();
let h3 = document.querySelector("h3");
let hours = now.getHours();
let minutes = now.getMinutes();

let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = weekdays[now.getDay()];

h3.innerHTML = `${day} ${hours}:${minutes}`;


h3.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
    let h1 = document.querySelector("h1");
    let temperature = Math.round(response.data.main.temp);
    h1.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;

    function searchCity(city) {
        let apiKey = "bf1a450160d22fdfe731b236aa5f1569";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
        axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
    }
    function search(event) {
        event.preventDefault();
        let searchInput = document.querySelector("#search-text-input");
        let h2 = document.querySelector("h2");
        if (searchInput.value) {
            h2.innerHTML = `Searching for the weather in ${searchInput.value} ..`;
            searchCity(searchInput.value);
        } else {
            h2.innerHTML = null;
            alert("please insert a city");
        }
    }
    let form = document.querySelector("#search-form");
    form.addEventListener("submit", search);

    function showTemperature(response) {
        console.log(response);
        let temperature = Math.round(response.data.main.temp);
        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = `${temperature}°C`;
        let description = document.querySelector("#weather-description");
        description.innerHTML = response.data.weather[0].description;
        let h1 = document.querySelector("#city");
        h1.innerHTML = response.data.name;
    }
    function searchPosition(position) {
        axios.get(`${apiUrl}&appid=${apiKey}`).then(showPosition);
    }
    function getCurrentPosition(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(searchPosition);
        let button = document.querySelector("button");
        button.addEventlistener("click", getCurrentPosition)