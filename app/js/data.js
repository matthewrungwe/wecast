const data = {
    "london": {
        name: "London, UK",
        weather: "cloudy",
        temperature: 14,
        humidity: 85,
        knots: 2        
    },
    "new york": {
        name: "New York, USA",
        weather: "sunny",
        temperature: 25,
        humidity: 40,
        knots: 4
    },
    "paris": {
        name: "Paris, France",
        weather: "partly cloudy",
        temperature: 18,
        humidity: 60,
        knots: 3       
    }
}

const searchForCity = (rawData) => {

    if(rawData[searchedCity.value]) {
        return {
            name: rawData[searchedCity.value].name,
            temperature: rawData[searchedCity.value].temperature,
            weather: rawData[searchedCity.value].weather
        }
    } else {
        return {
            name: 'City not found. try again',
            temperature: 0,
            weather: ''
        }
    }
}