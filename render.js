const TEST_MODE = false;

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
                        this.ForecastData = dummyData;
                        this.history.unshift(dummyData);
                        this.animateUI();
                        return;
                    }

                    try {
                        const response = await fetch (`http://localhost:3000/forecast/${this.city}`);
                        const data = await response.json();
                        this.ForecastData=data;
                        this.history.unshift(data);
                    } catch (err){
                        console.error("Error fetching weather:", err);
                        alert("Failed to fetch weather data.");
                    }
                },
            },
        });  