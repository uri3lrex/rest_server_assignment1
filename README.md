# Node.js based REST server with a Vue Front-end using local computing environment

### Internet Applications: Assignment 1
- Currently in week 4.

## The rough project architecture:

```
weather-app/
│
├── backend/                         ← Node.js REST API (your Express server)
│   ├── server.js                    ← main server file (handles routes & logic)
|   ├── test.js                      ← my testing js file when I want to get experimental in the TEST branch
│   ├── routes/                      ← possible routes??
│   │   └── weatherRoutes.js         ← not sure
│   ├── .env                         ← contains my OPENWEATHER_API_KEY
│   ├── .gitignore                   ← hides .env and node_modules
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
│
├── frontend/                        ← Vue.js front-end
│   ├── src/
│   │   ├── App.vue                  ← main app wrapper
│   │   ├── main.js                  ← Vue entry file
│   │   ├── components/
│   │   │   ├── WeatherCard.vue      ← shows weather info (city, temp, etc.)
│   │   │   └── SearchBar.vue        ← input for city name
│   │   └── services/
│   │       └── api.js               ← calls my REST API (axios) ??? help???
│   ├── public/
│   │   └── client.html
│   ├── package.json
│   ├── vite.config.js (or vue.config.js)
│   └── node_modules/
│
├── docs/                            ← Documentation for your report
│   ├── README.md                        ← short project overview & setup map for now.. other docs to be added possibly
```

## Week 4 To-Do List
- [x] get weather API key (2 calls so far??): free for 60 calls per day. worth it.
- [x] Set up a dummy front-end and back-end in the test branch
- [x] Vue technology setup: as per the assignment's requirement
- [x] Connect front and back (Possibly through axious??): convenient http client. Paired with this I just simply connected it by running it on the same port.
- [x] Display results : render data for the current day
- [x] Display results : with a deliberate forecast so need to add another route to what was added earlier.
- [x] Packing
- [x] Temperature
- [x] Summary table
- [ ] Update the sketch architecture in final
- [ ] Style the appp: setting up the website through the html/css/js wombocombo

## Week 5 To-Do List
- [ ] Try to handle errors and edge cases
- [ ] add icons. design icons maybe
- [ ] test latency?? validate JSON output structure
- [ ] Optional stuff
- [ ] add more comments
- [ ] Run a manual test flow

## Deliverables
- [x] Shows current day weather
- [] To be done by week 4: Shows forecast of the next 3 day
- [x] To be done by Week 4: Packing which shows that you should get an umbrella if its gonna rain in the forecast.
- [x] To be done by Week 4: A temperature systems which shows whether that the user should pack for Cold (temperatures below 8C), Mild (temperatures from 8C to 24C inclusive) or Hot (temperatures above 24C)
- [x] Give a summary table for the next 3 days showing: Temperature, Wind Speed and Rainfall level.
- [ ] When you request the weather data for a city, it will return you the Longitude and Latitude of the city. You can then use these in the AIR Pollution API to get detailed information on a number of different air pollutants. If any of these pollutants exceed the categorised as "Good" in the API documentation a warning message should be generated detailing which pollutant has been measured at elevated levels, in indication of how elevated the levels are together with the potential health risks associated with those levels.

## Possible innovations:
- [ ] INNOVATIVE: Probs use local storage to retain the results of the search.
- [ ] CREATIVE (week 4 weekend): Add a fun UI with picture changes
- [ ] INNOVATIVE: Auto-suggest cities

## Documentation: 

- [How to use/test the weather map API](https://openweathermap.org/current)
- [Article outlining the use of Node.js to host a weather app](https://medium.com/@lokavarapusuryanandini/node-js-weather-app-real-time-weather-updates-from-openweather-api-5c232d0fd645)
- [Video reference](https://youtu.be/D32qawkUxF8?si=4thgwuseMRPn-rPS)
- [Axios Docs](https://axios-http.com/docs/intro)
- [NPM Axios install](https://www.npmjs.com/package/axios)
- [Vue documentation](https://vuejs.org/guide/introduction.html)
- [Vue.js directives](https://vueschool.io/articles/vuejs-tutorials/vue-js-directives-a-beginners-guide/)
