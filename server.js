// server.js
require('dotenv').config(); // Load the .env file

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000; //pls work
const apiKey = process.env.OPENWEATHER_API_KEY;
const mapURL = 'https://api.openweathermap.org/data/2.5';

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const url = `${mapURL}/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const weather = response.data;

    res.json({
      city: weather.name,
      temperature: weather.main.temp,
      humidity: weather.main.humidity,
      condition: weather.weather[0].description,
    });
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

async function getCoordinates(city) {
  const geourl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const georesponse = await axios.get(geourl);

  if (georesponse.data.length === 0) {
    throw new Error("Can't fetch city");
  }
  const match = georesponse.data.find (
    loc => loc.name.toLowerCase() == city.toLowerCase()
  );
  const chosen = match || georesponse.data[0]
  const  { lat, lon, name, country } = chosen;
  return { lat, lon, name, country }; 
  
}

app.get('/forecast/:city', async (req,res)=> {
  const city = req.params.city;
  try {
    const {lat,lon, name} = await getCoordinates(city);
    const forecasturl = `${mapURL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(forecasturl);
    const forecastlist = response.data.list;

    const forecast = [];
    const today = new Date();
    for (let i=0; i<6;i++){
      const day = new Date(today);
      day.setDate(today.getDate()+i);
      const dayWord= day.toISOString().split('T')[0]; 
      const entries = forecastlist.filter(item => item.dt_txt.startsWith(dayWord))

      const temp = (entries.reduce((sum,item) => sum + item.main.temp,0)/entries.length).toFixed(1);
      const wind = (entries.reduce((sum,item) => sum + item.wind.speed,0)/entries.length).toFixed(1);
      const rain = entries.reduce((sum,item) => sum + (item.rain?.['3h'] || 0), 0).toFixed(1);

      forecast.push({
                day: dayWord,
                temperature: parseFloat(temp),
                wind: parseFloat(wind),
                rain: parseFloat(rain)
            });   

    }

    // packing??

    let packing ='';
    const avgTemperature = forecast.reduce((sum,d)=> sum+d.temperature,0)/forecast.length;
    if (avgTemperature < 8)
      packing = 'Cold';
    else if(avgTemperature >= 8 && avgTemperature <=24)
      packing= 'Mild';
    else
      packing = 'Hot';

    if(forecast.some(d => d.rain > 0)) packing += ', Bring an umbrella!';

    const airUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const airResponse = await axios.get(airUrl);
    const air = airResponse.data;
    const airData = air.list[0].main.aqi;
    const components = air.list[0].components;

    const aqidesc = {
      1: 'Good',
      2: 'Fair',
      3: 'Moderate',
      4: 'Poor',
      5: 'Very Poor'
    }[airData];

    res.json({
      city: city,
      packingAdvice: packing, forecast,
      airPollution: aqidesc
  });

  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
})

//FOR TESTING AIR POLLUTION
/**app.get('/air_pollution/:city', async(req,res)=> {
  const city = req.params.city;
  try {
    const {lat,lon,name} = await getCoordinates(city);
    const airUrl = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const airresponse = await axios.get(airUrl);
    const air = airresponse.data;
    
    const airData = air.list[0].main.aqi;
    const components = air.list[0].components;

    const aqidesc= {
      1: 'Good',
      2: 'Fair',
      3: 'Moderate',
      4: 'Poor',
      5: 'Very Poor'
    }[airData]

    res.json({
      city: name,
      aqi: airData,
      description: aqidesc,
      components: {
        co: components.co,
        no: components.no,
        no2: components.no2,
        o3: components.o3,
        so2: components.so2,
        pm2_5: components.pm2_5,
        pm10: components.pm10,
        nh3: components.nh3
      }

    });
  }
  catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch air pollution data' });
  }
})*/

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/weather/Dublin`);
  console.log(`Try: http://localhost:${PORT}/air_pollution/Dublin`);
  
});