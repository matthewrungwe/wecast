let searchedCity = document.querySelector('#city');
let searchBtn = document.querySelector('.search-btn');

let displayBlock = document.querySelector('#display');
let displayName = document.querySelector('.name');
let displayLatLon = document.querySelector('.lat-lon');
let displayTemperature = document.querySelector('.temperature');
let displayWeather = document.querySelector('.weather');
let displayWeatherIcon = document.querySelector('.weather-icon');
let displayMaxTemp = document.querySelector('.max-temp');
let displayMinTemp = document.querySelector('.min-temp');
let displayHumidity = document.querySelector('.humidity');
let displayWind = document.querySelector('.wind');

const kelvinToCelcius = (tempInKelvin) => {
    return Math.ceil(tempInKelvin - 273.15);
};

const convertToKmPerHr = (metersPerSecond) => {
    return Math.ceil((metersPerSecond * 3600) / 1000);
};

const errorMsg = (err) => {
    console.log(err);
};

const responseToJSON = (response) => {
    if(response.ok) {
        return response.json();
    } else {
        return 'Something went wrong';
    }    
};

const getWeatherIcon = (iconName) => {
    const iconURL = `https://openweathermap.org/img/wn/${iconName}@2x.png`;

    fetch(iconURL)
        .then((response) => {
            if(response.ok) {
                return response.blob();
            }
        })
        .then((responseBlob) =>  {
            let blobURL = URL.createObjectURL(responseBlob);

            displayWeatherIcon.src = blobURL;
            displayWeatherIcon.alt = "Icon for the weather";
            displayWeatherIcon.style.display = "block";
        })
        .catch(errorMsg);
};

const isolateData = (response) => {
    console.log('In isolateData function.', response);

    return {
        name: response.name,
        country: response.sys.country,
        temp: response.main.temp,
        minTemp: response.main.temp_min,
        maxTemp: response.main.temp_max,
        weather: response.weather[0].description,
        weatherIcon: response.weather[0].icon,
        windSpeed: response.wind.speed,
        humidity: response.main.humidity,
        lat: response.coord.lat,
        lon: response.coord.lon
    }
};

const displayData = (data) => {
    console.log('In displayData function.', data);

    displayName.innerHTML = data.name;
    displayLatLon.innerHTML = `${data.lat}, ${data.lon}`;
    displayTemperature.innerHTML = `${kelvinToCelcius(data.temp)}°C`;
    displayWeather.innerHTML = data.weather;
    displayMaxTemp.innerHTML = `${kelvinToCelcius(data.maxTemp)}°C`;
    displayMinTemp.innerHTML = `${kelvinToCelcius(data.minTemp)}°C`;
    displayHumidity.innerHTML = `${data.humidity}%`
    displayWind.innerHTML = `${convertToKmPerHr(data.windSpeed)}km/hr`;

    getWeatherIcon(data.weatherIcon);
};

const search = () => {
    const apiKey = 'f2f2829064e0603eca60536a2a902b48';

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value ? searchedCity.value : 'Africa'}&appid=${apiKey}`;

    fetch(url)
        .then(responseToJSON)
        .then(isolateData)
        .then(displayData)
        .catch(errorMsg);
}

searchBtn.addEventListener('click', () => {
    search();
});

window.onload = (event) => {
    search();
};