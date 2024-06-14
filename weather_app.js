const apiKey = "710e105ff069d401d319b833c155511f";

const searchButton = document.getElementById('searchButton');
let weather = document.getElementById('temp');
let city = document.getElementById('city');

searchButton.addEventListener('click', function() {
    let cityName = document.getElementById('cityName').value;
    
    // Use the fetch API, which is more modern and returns a Promise
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(api)
        .then(response => {
            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            // Parse the JSON in the response
            return response.json();
        })
        .then(data => {
            let humidity = document.getElementById("humidity");
            humidity.style.marginRight = "15px";
            let wind = document.getElementById("wind");
            wind.style.fontSize = '22px';

            weather_img = document.querySelector('.weather_icon');

            // Do something with the data
            let temp = Math.round(data.main.temp - 273.15) + '°c';
            let humid = data.main.humidity + "%";
            let win = Math.round(data.wind.speed) + " km/h";
            let anser = () => {
                let ans = data.name;
                return ans.split(" ").reduce((s, c) => s + " " + (c.charAt(0).toUpperCase() + c.slice(1)));
            }

            if (data.weather[0].main == 'Clouds')
            {
                weather_img.src = 'images/clouds.png';
            }
            else if (data.weather[0].main == 'Clear')
            {   
                weather_img.src = 'images/clear.png';
            }
            else if (data.weather[0].main == 'Rain')
            {   
                weather_img.src = 'images/rain.png';
            }
            else if (data.weather[0].main == 'Drizzle')
            {   
                weather_img.src = 'images/drizzle.png';
            }
            else if (data.weather[0].main == 'Mist')
            {   
                weather_img.src = 'images/mist.png';
            }

            
            city.innerHTML = anser();
            weather.innerHTML = temp;
            humidity.innerHTML = humid;
            wind.innerHTML = win;
            console.log(temp);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
});

