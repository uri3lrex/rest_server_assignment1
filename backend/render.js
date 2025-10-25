const TEST_MODE = false; // Set to false when backend is running

        new Vue({
            el:'#app',
            //data properties
            data:{
                city: '',
                weather: null,
                history:[],
                currentdate: '',
                activeInfoTab: 'humidity',
                searchCooldown: false
            },
            //date handling
            created() {
                const date = new Date();
                const parts = date.toString().split(" ");
                this.currentDate = `${parts[1]} ${parts[2]}, ${parts[3]}`;
            },

        computed: {
            // handling weather icons and background classes
            wIcon() {
                if (!this.weather) return 'fa-solid fa-cloud';
                const condition = this.weather.condition.toLowerCase();
                if (condition.includes('rain')) return 'fa-solid fa-cloud-showers-heavy';
                if (condition.includes('cloud')) return 'fa-solid fa-cloud';
                if (condition.includes('sun') || condition.includes('clear')) return 'fa-solid fa-sun';
                if (condition.includes('storm')) return 'fa-solid fa-bolt';
                return 'fa-solid fa-cloud-sun';
            },
            backgroundClass() {
                if (!this.weather) return 'clear';
                const condition = this.weather.condition.toLowerCase();
                if (condition.includes('rain')) return 'rainy';
                if (condition.includes('cloud')) return 'cloudy';
                if (condition.includes('clear') || condition.includes('sun')) return 'sunny';
                if (condition.includes('storm')) return 'stormy';
                return 'clear';
            }
        },
            methods: {
                // Fetch forecast data from backend
                async getForecast(){
                     if (this.searchCooldown) {
                        alert("Please wait a few seconds before searching again!");
                        return;
                    }
                    if (!this.city) return alert('Please enter a VALID city name!');

                    // set cooldown to prevent rapid searches

                    this.searchCooldown = true;
                    setTimeout(() => {
                        this.searchCooldown = false;
                    }, 2000);
                    
                    // Use dummy data in test mode
                     if (TEST_MODE) {
                        console.log("-> Using dummy data (backend not running).");
                        const dummyData = {
                            city: this.city,
                            packingAdvice: "Mild, Bring an umbrella!",
                            clothing: "Light jacket or long sleeves should do. Mild breeze, so light layers work fine. Bring an umbrella or waterproof jacket.",
                            trip: "Great day for outdoor activities — maybe parks, sightseeing, or hiking!",
                            airPollution: "Fair",
                            forecast: [
                                { day: "2025-10-11", temperature: 15.5, wind: 4.2, rain: 1.2 },
                                { day: "2025-10-12", temperature: 17.3, wind: 3.9, rain: 0.0 },
                                { day: "2025-10-13", temperature: 14.8, wind: 5.1, rain: 0.4 },
                                { day: "2025-10-14", temperature: 16.0, wind: 4.8, rain: 0.0 }
                            ]
                        };
                        const dummyweather = {
                            city: this.city,
                            temperature: 15.5,
                            feels_like: 14.0,
                            humidity: 82,
                            current_wind: 6.8,
                            current_rain: 0.3,
                            condition: 'Broken clouds'
                        }
                        this.weather = dummyweather;
                        this.ForecastData = dummyData;
                        this.history.unshift(dummyData);
                        if (this.history.length >6){
                            this.history.pop();
                        }
                        return;
                    }

                    try {
                        const response = await fetch (`http://localhost:3000/forecast/${this.city}`);
                        const data = await response.json();
                        const todayresponse = await fetch (`http://localhost:3000/weather/${this.city}`);
                        const todaydata = await todayresponse.json();
                        this.weather=todaydata;
                        this.ForecastData=data;
                        this.history.unshift(data);
                        if (this.history.length >6){
                            this.history.pop();
                        }
                    } catch (err){
                        console.error("Error fetching weather:", err);
                        alert("Failed to fetch weather data.");
                    }
                },
                loadFromHistory(city) {
    // set the search box to the clicked city and fetch its forecast
    this.city = city;
    // call existing method that fetches forecast (getForecast)
    if (typeof this.getForecast === 'function') {
      this.getForecast();
    } else {
      console.warn('getForecast() not found on Vue instance');
    }
  }
 

            },
        });  