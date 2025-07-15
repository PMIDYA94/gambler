import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const WeatherCard = ({ weatherData }) => {
  const getWeatherAnimation = (condition) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return require('../assets/animations/sunny.json');
    } else if (conditionLower.includes('cloud')) {
      return require('../assets/animations/cloudy.json');
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return require('../assets/animations/rainy.json');
    } else if (conditionLower.includes('snow')) {
      return require('../assets/animations/snowy.json');
    } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
      return require('../assets/animations/stormy.json');
    } else {
      return require('../assets/animations/cloudy.json');
    }
  };

  const getTemperatureColor = (temp) => {
    if (temp > 30) return '#FF5722';
    if (temp > 20) return '#FF9800';
    if (temp > 10) return '#2196F3';
    return '#3F51B5';
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.cityName}>{weatherData.city}</Text>
        <Text style={styles.country}>{weatherData.country}</Text>
      </View>

      <View style={styles.weatherContainer}>
        <LottieView
          source={getWeatherAnimation(weatherData.condition)}
          autoPlay
          loop
          style={styles.weatherAnimation}
        />

        <View style={styles.temperatureContainer}>
          <Text style={[styles.temperature, { color: getTemperatureColor(weatherData.temperature) }]}>
            {Math.round(weatherData.temperature)}°C
          </Text>
          <Text style={styles.condition}>{weatherData.condition}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Feels Like</Text>
          <Text style={styles.detailValue}>{Math.round(weatherData.feelsLike)}°C</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>{weatherData.windSpeed} km/h</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>{weatherData.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  locationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  country: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  weatherAnimation: {
    width: 120,
    height: 120,
  },
  temperatureContainer: {
    alignItems: 'center',
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 18,
    color: '#666666',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});

export default WeatherCard;