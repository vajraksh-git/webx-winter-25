


async   function getlatlon(){
    var city=document.getElementById('cityInput')
    const cityname=city.value;
    const apikey='d1a3966500f831fcfe7a43d855bd7636';
    const limit=5;
    const url=`http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=${limit}&appid=${apikey}`;
    const response = await fetch(url);
    const data =await response.json();
    console.log(data);
    const lat=data[0].lat;
    const lon=data[0].lon;
    console.log(lat,lon);
    return [lat,lon];
}



async function getweather(){
    var city=document.getElementById('cityInput')
    const cityname=city.value;
    const apikey='d1a3966500f831fcfe7a43d855bd7636';
    const [lat , lon] = await getlatlon(cityname);
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
    const response = await fetch(url);
    const result = await response.json();
    const weather = result.weather[0].main;
    const temp = result.main.temp;
    console.log(`Weather in ${cityname}: ${weather}, Temperature: ${temp}°C`);
    document.getElementById("weatherResult").innerText=`Weather in ${cityname}: ${weather}, Temperature: ${temp}°C`;
}

document.getElementById("getWeatherBtn").addEventListener("click",getweather);