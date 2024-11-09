document.getElementById("search-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = document.getElementById("search-input").value;
  const forecastContainer = document.getElementById("weekly-forecast");
  const highlightedForecast = document.getElementById("highlighted-forecast");

  try {
    
    const response = await fetch(`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=090ab9392f1o4b95tbf67d52b6723386`);
    const data = await response.json();
    console.log(data);  

    forecastContainer.innerHTML = ""; 
    highlightedForecast.innerHTML = "";  

    
    const today = new Date().getDay();

    
    data.daily.forEach((day, index) => {
      const date = new Date(day.time * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      if (index === today) {
        
        highlightedForecast.innerHTML = `
          <div class="highlighted-day">
            <h2>${dayName}</h2>
            <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${day.condition.icon}.png" alt="icon">
            <div>${Math.round(day.temperature.minimum)}°C / ${Math.round(day.temperature.maximum)}°C</div>
            <div>${day.condition.description}</div>
            <div>Humidity: ${day.humidity ? day.humidity + "%" : "N/A"}</div>
            <div>Wind: ${day.wind.speed ? Math.round(day.wind.speed) + " m/s" : "N/A"}</div>
          </div>
        `;
      } else {
      
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
          <div>${dayName}</div>
          <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${day.condition.icon}.png" alt="icon">
          <div>${Math.round(day.temperature.minimum)}°C / ${Math.round(day.temperature.maximum)}°C</div>
        `;
        forecastContainer.appendChild(forecastItem);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Sorry, we couldn't fetch the weather data. Please check your API URL or internet connection.");
  }
});
