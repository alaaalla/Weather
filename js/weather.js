"use strict"
//---- N   A   V   B   A   R ----//
let collection = document.querySelector("#navbarSupportedContent");
let menu = document.querySelector(".menu");
menu.addEventListener("click", function () {
    if (collection.classList.contains("show")) {
        collection.classList.remove("show");
    }
    else {
        collection.classList.add("show");
    }
});
// ---- M A I N - C O N T E N T ----//
getData('Damanhour');
let search = document.querySelector("#search");
search.addEventListener("input", function () {
    getData(search.value);
})
async function getData(input) {
    let link = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d9a4788132eb4d988e442438241109&q=${input}&days=3`);
    let result = await link.json();
    displayData(result);
}
function displayData(data) {
    // T O D A Y    C A R D
    const date = new Date(`${data.location.localtime}`);
    const dayOfWeek = date.getDay();
    let today = date.toDateString();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let content = '';
    content += `<div class="header" id="today">
        <h5 class="day">${daysOfWeek[dayOfWeek]}</h5>
        <h6 class="date">${today}</h6>
        </div>
    <div class="content text-center" id="current">
    <h6 class="location">${data.location.name}</h6>
    <div class="degree">
        <h1 class="num">${data.current.temp_c}<sup>o</sup>C</h1>   
        <div class="forecast-icon w-25 ">
            <img class="w-100" src="${data.current.condition.icon}" alt="" width="90">
        </div>	
    
    </div>
    <div class="custom"><b>${data.current.condition.text}</b></div>
    <span><img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt="" width="21" height="21">${data.current.humidity}%</span>
                                <span><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="" width="23" height="21">${data.current.wind_kph}km/h</span>
                                <span><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt="" width="21" height="21">${data.current.wind_dir}</span>
    </div>`

    document.querySelector(".today").innerHTML = content;
    // T O M O R R O W   C A R D
    date.setDate(date.getDate() + 1);
    const day = date.getDay()
    let tomorrow = '';
    tomorrow += `<div class="header">
           <h5 class="day">${daysOfWeek[day]}</h5>
           </div>
       <div class="content text-center">
           <div class="forecast-icon">
               <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="" width="70">
           </div>
           <br>
           <h5 class="degree">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h5>
           <h6>${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></h6>
           <br>
           <p class="custom"><b>${data.forecast.forecastday[1].day.condition.text}</b></p>
       </div>`
    document.querySelector(".tomorrow").innerHTML = tomorrow;
    // T W O     D A Y S     L A T E R
    date.setDate(date.getDate() + 1);
    const anotherDay = date.getDay()
    let twoDaysLater = '';
    twoDaysLater += `<div class="header">
   <h5 class="day">${daysOfWeek[anotherDay]}</h5>
</div> 
<div class="content text-center">
   <div class="forecast-icon">
       <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="" width="70">
   </div>
   <br>
   <h5 class="degree">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h5>
   <h6>${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></h6>
   <br>
   <p class="custom"><b>${data.forecast.forecastday[2].day.condition.text}</b></p>
</div>`
    document.querySelector(".twoDaysLater").innerHTML = twoDaysLater;
}