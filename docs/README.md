# Node.js based REST server with a Vue Front-end using local computing environment

### Internet Applications: Assignment 1
- Currently in week 6.

## The FINAL project architecture:

```
weather-app/
│
├── backend/                         ← Node.js REST API (your Express server)
│   ├── server.js                    ← main server file (handles routes & logic)
|   ├── render.js                    ← Vue Frontend Logic
│   ├── .env                         ← contains my OPENWEATHER_API_KEY
│   ├── package.json
│   ├── package-lock.json
│
├── frontend/                        ← Vue.js front-end
│   └── client.html                  ← HTML structure and rendering
│   └── style.css                    ← CSS designing
│
├── docs/                            ← Documentation for your report
│   ├── README.md                        ← short project overview & setup map for now.. other docs to be added possibly
|
├── node_modules/
├── prototype/
├── .gitignore                       ← hides .env and node_modules
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
- [x] Work on extra features - 4/6
- [x] Style the appp: through Canva for now to have a vision
- [x] Update the sketch architecture in final

## Week 5 To-Do List
- [x] Style the appp: setting up the website through the html/css/js wombocombo
- [x] Try to handle errors and edge cases
- [x] add icons. design icons maybe
- [x] test latency?? validate JSON output structure
- [x] Optional stuff
- [x] Run a manual test flow


## Week 6 To-Do List
- [x] Sort out the structure
- [x] add more comments
- [x] Clean the code
- [ ] Sort out doubts
- [ ] Start working on documentation
- [ ] Merge to main branch.

## Deliverables
- [x] Shows current day weather
- [x] To be done by week 4: Shows forecast of the next 3 day ~~(updated to 5 days)~~ (keeping it today + next 3 days)
- [x] To be done by Week 4: Packing which shows that you should get an umbrella if its gonna rain in the forecast.
- [x] To be done by Week 4: A temperature systems which shows whether that the user should pack for Cold (temperatures below 8C), Mild (temperatures from 8C to 24C inclusive) or Hot (temperatures above 24C)
- [x] Give a summary table for the next 3 days showing: Temperature, Wind Speed and Rainfall level.
- [x] When you request the weather data for a city, it will return you the Longitude and Latitude of the city. You can then use these in the AIR Pollution API to get detailed information on a number of different air pollutants. If any of these pollutants exceed the categorised as "Good" in the API documentation a warning message should be generated detailing which pollutant has been measured at elevated levels, in indication of how elevated the levels are together with the potential health risks associated with those levels.

## Branches:
- **Main**: The main branch that shows the final product. To be engaged with at the end of week 5.
- **New features**: The working branch where all the backend changes were made.
- **Rendering**: the working branch where the frontend is utilized and the test cases are used the most.
- **Test**: The risk zone where I experiment with funny little features which could otherwise break my code.
- **Prototype**: Will possibly hold the most functional copy of my final product and a test_2 grounds.

## Problems:
- [x] ~~Ask whether returning "Mountjoy" when you type "Dublin" is okay or like- do we have to be super precise cause then I might not pass the geo coordindates in that and use that only for air pollution API.
- Google API is too costly.~~
- [ ] ~~Can't seem to run the Nominatim API. probs split the branch and figure it out in week 5~~
- [x] Not able to print daily stats from the weather endpoint
- [x] Prevent the immediate repeat of city searches. basically checking the entry before and making sure the one before or the one being currently displayed doesn't allow for repeat of the city (JUST BEFORE).
- [x] Fix history section
- [x] Latency issues while loading cities from history.
- [x] Issues with time that don't update accordingly- leaving "TODAY" readings slightly wonky. Check tmmr morning. NOT SURE WHETHER TO WORK ON THIS OR NOT.
- [ ] Check whether or not do they ask the forecast for 3 days or can we show the forecast for 6 days and if so, do we do the flagging of umbrella only at the 3 day mark or the 6 day one.

## Possible innovations:
- [ ] ~~INNOVATIVE: Probs use local storage to retain the results of the search.~~
- [x] CREATIVE (week 4 weekend): Add a fun UI with picture changes along with background changes depending on JSON element.
- [ ] ~~INNOVATIVE: Auto-suggest cities~~
- [x] INNOVATIVE : Add insights of clothing!!! and maybe trips!!
- [x] INNOVATIVE: Adding a date!
- [x] INNOVATIVE: Clickable history data.

## Documentation: 

- [How to use/test the weather map API](https://openweathermap.org/current)
- [Article outlining the use of Node.js to host a weather app](https://medium.com/@lokavarapusuryanandini/node-js-weather-app-real-time-weather-updates-from-openweather-api-5c232d0fd645)
- [Video reference](https://youtu.be/D32qawkUxF8?si=4thgwuseMRPn-rPS)
- [Axios Docs](https://axios-http.com/docs/intro)
- [NPM Axios install](https://www.npmjs.com/package/axios)
- [Vue documentation](https://vuejs.org/guide/introduction.html)
- [Vue.js directives](https://vueschool.io/articles/vuejs-tutorials/vue-js-directives-a-beginners-guide/)
- ~~[Auto-suggesting places using Google API](https://youtu.be/Z4mSBypzQsI)~~
- [Nominatim API for auto suggest](https://nominatim.org/release-docs/latest/api/Overview/)
- [For animation](https://animejs.com/documentation/getting-started/module-imports)
- [Fonts used](https://fonts.google.com/selection/embed)
- [Font awesome](https://fontawesome.com/v4/)
