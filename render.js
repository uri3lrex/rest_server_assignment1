const TEST_MODE = true; // Set to false when backend is running

        new Vue({
            el:'#app',
            data:{
                city: '',
                weather: null,
                history:[],
                currentdate: ''
            },
            created() {
                const date = new Date();
                const parts = date.toString().split(" ");
                this.currentDate = `${parts[1]} ${parts[2]}, ${parts[3]}`;
            },
            mounted() {
                anime({
                    targets: '#title',
                    translateY: [-30, 0],
                    opacity: [0, 1],
                    easing: 'easeOutElastic(1, .8)',
                    duration: 1200
                });

    // Add hover animation to the button
            const btn = document.getElementById('forecast-btn');
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    scale: [1, 1.1],
                    duration: 200,
                    easing: 'easeOutSine'
                });
            });
            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    scale: [1.1, 1],
                    duration: 200,
                    easing: 'easeOutSine'
                });
            });
        },

        computed: {
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
                async getForecast(){
                    if (!this.city) return alert('Please enter a VALID city name!');
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
                            humidity: 82,
                            condition: 'clear sky'
                        }
                        this.weather = dummyweather;
                        this.ForecastData = dummyData;
                        this.history.unshift(dummyData);
                        this.animateUI();
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
                    } catch (err){
                        console.error("Error fetching weather:", err);
                        alert("Failed to fetch weather data.");
                    }
                },
            },
        });  