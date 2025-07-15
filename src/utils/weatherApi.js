

export const fetchWeatherData = async (latitude, longitude) => {

  try {
    const API_KEY = '42cee843d0e8450781d760dd1d1ba992';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5';

    // const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    console.log('API URL:', url);

    const response = await fetch(url);
    const data = await response.json();

    console.log('Full API Response:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error('Weather API Error:', response.status, data);
      throw new Error(`Weather API error: ${response.status} - ${data.message || 'Unknown error'}`);
    }

    // Validate response structure
    if (!data.main || !data.weather || !data.weather[0]) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid weather data structure received');
    }

    return {
      temperature: Math.round(data.main.temp), // Round temperature
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind?.speed || 0,
      pressure: data.main.pressure,
      city: data.name,
      country: data.sys?.country || 'Unknown',
      icon: data.weather[0].icon, // Weather icon code
      main: data.weather[0].main, // Main weather condition
    };
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
};

// Example usage:
// fetchWeatherData(37.4220936, -122.083922)
//   .then(weather => console.log(weather))
//   .catch(error => console.error(error));