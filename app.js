const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=58a9204dc6fc10216e6289fe2a97e671&units=metric";
const search_input = document.querySelector("#city-input");
const search_btn = document.querySelector(".search-icon-container");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity-value");
const wind_speed = document.querySelector("#wind-value");
const invalid_msg = document.querySelector(".invalid-msg-div");
const weather_img = document.querySelector("#weather-img");
const weather_div = document.querySelector(".weather");
const city_name = document.querySelector("#city-name-head");


//Async function to fetch weather and show
async function GetWeather(city) {
    let response = await fetch(URL + city + API_KEY);

    if (response.status === 200) {  // If the valid city is entered & API response fetched
        let data = await response.json();  // Data changed to JS Object

        //Updating Temp , Humidity , Wind Speed & City Name
        city_name.innerText = city.toUpperCase();
        temperature.innerText = data.main.temp + " °C";
        humidity.innerText = data.main.humidity + "%";
        wind_speed.innerText = Math.floor(data.wind.speed * 3.6) + " km/h";
        
        //Image for weather
        if (data.weather[0].main === "Clouds") {
            weather_img.src = "Images/clouds.png"
        }
        else if (data.weather[0].main === "Clear") {
            weather_img.src = "Images/clear.png"
        }
        else if (data.weather[0].main === "Drizzle") {
            weather_img.src = "Images/drizzle.png"
        }
        else if (data.weather[0].main === "Humidity") {
            weather_img.src = "Images/humidity.png"
        }
        else if (data.weather[0].main === "Mist") {
            weather_img.src = "Images/mist.png"
        }
        else if (data.weather[0].main === "Rain") {
            weather_img.src = "Images/rain.png"
        }
        else if (data.weather[0].main === "Snow") {
            weather_img.src = "Images/snow.png"
        }
        else if (data.weather[0].main === "Wind") {
            weather_img.src = "Images/wind.png"
        }

        weather_div.style.display = "flex";
        invalid_msg.style.display = "none";
    }
    else if (search_input.value === "") {  // Check for empty search box
        invalid_msg.innerText = "Enter Any City!";
        weather_div.style.display = "none";
        invalid_msg.style.display = "flex";
    }
    else {  // For invalid city entered
        invalid_msg.innerText = "Invalid Entry!";
        weather_div.style.display = "none";
        invalid_msg.style.display = "flex";
    }
}

//Event listener for search button
search_btn.addEventListener("click", () => {
    GetWeather(search_input.value);
});