


async function getlatlon(){
    try{
        var city=document.getElementById('cityInput')
        const cityname=city.value;
        const apikey='d1a3966500f831fcfe7a43d855bd7636';
        const limit=5;
        const url=`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=${limit}&appid=${apikey}`;
        console.log(url);
        const response = await fetch(url);
        if (!response){
            throw new Error('Network response was not ok');
        }
        const data =await response.json();
        console.log(data);
        if(data.length===0){
            throw new Error('City not found');
        }
        const lat=data[0].lat;
        const lon=data[0].lon;
        console.log(lat,lon);
        return [lat,lon];
    }catch(error){
        console.log("Error in fetching lat lon:",error);
        document.getElementById("result").innerHTML=`<h3 style='color:red'>${error.message}</h3>`;
    }
}



async function getweather(){
    try{
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
        document.getElementById("result").innerHTML=`<h3 class="main">${weather}</h3>
                                                    <h2 class="temp">${temp}°C</h2>`;
    }catch(error){
        console.log("Error in fetching weather:",error);
        document.getElementById("result").innerHTML=`<h3 style='color:red'>${error.message}</h3>`;
        
    }
}

document.getElementById("getWeatherBtn").addEventListener("click",getweather);