import React, { useState } from 'react'
import './AppClima.css'
export const AppClima = () => {

  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const url = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'YOUR_API_KEY'
  const difKelvin = 273.15 // porque esta en kelvin la api entonces precisamos celcius

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${url}?q=${city}&appid=${API_KEY}&lang=es`)
      const data = await response.json()

      if (response.ok) {
        setWeatherData(data);
      } else {
        throw new Error(data.message || "Error al obtener los datos del clima");
      }
    } catch (error) {
      console.log(error);
      setWeatherData({ error: error.message });
    }
  }


  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchWeatherData()
  }


  return (
    <div className='container'>
      <h1>Aplicacion de Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder='Ingrese una ciudad'
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">Buscar</button>
      </form>

      {weatherData && weatherData.error ? (
        <p style={{ color: "red" }}>Error: {weatherData.error}</p>
      ) : (
        weatherData && (
          <div>
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>La temperatura actual es: {Math.floor(weatherData.main.temp - difKelvin)}°C</p>
            <p>La condición meteorológica actual: {weatherData.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
        )
      )}

    </div>
  )
}
