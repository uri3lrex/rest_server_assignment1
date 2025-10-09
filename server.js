// server.js
require('dotenv').config(); // Load the .env file

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    const weather = response.data;
    const output = {
      city: weather.name,
      temperature: weather.main.temp,
      humidity: weather.main.humidity,
      condition: weather.weather[0].description,
    };

    console.log(output); 
    res.json(output); 
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }

// Simple test route to check weather for a given city
//app.get('/weather/:city', async (req, res) => {
 // const city = req.params.city;

 app.get('/weather/:city', bringWeather)
 app.listen(PORT,()=>console.log('Prototype listening on port ${port}!'))

 function bringWeather(req,res){

 }


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/weather/Dublin`);
});
