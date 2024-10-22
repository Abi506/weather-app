import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoSunnySharp } from "react-icons/io5";
import { LuWaves } from "react-icons/lu";
import { FaWind } from "react-icons/fa";
import axios from 'axios'

import rain_icon from '../../assets/rainy_icon.png'
import cloud_icon from '../../assets/cloud_icon.png'
import drizzle_icon from '../../assets/drizzle_icon.png'
import clear_icon from '../../assets/clear_icon.png'
import snow_icon from '../../assets/snow_icon.png'

import'./weather.css'
const Weather = () => {
    const [weatherData,setWeatherData]=useState()
    const [city,setCity]=useState('chennai')

    const allIcons={
        '01d':clear_icon,
        '01n':clear_icon,
        '02d':cloud_icon,
        '02n':cloud_icon,
        '03d':cloud_icon,
        '03n':cloud_icon,
        '04d':drizzle_icon,
        '04n':drizzle_icon,
        '09d':rain_icon,
        '09n':rain_icon,
        '10d':rain_icon,
        '10n':rain_icon,
        '13d':snow_icon,
        '13n':snow_icon,
    }

    const handleSearch=async()=>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8f619ac9a17669917a38135e23fd1024`;
        console.log(url,'url')
        try{
            const response=await axios.get(url)
            console.log(response,'response')
            const icon=allIcons[response.data.weather[0].icon]||clear_icon
            setWeatherData({
                humidity:response.data.main.humidity,
                wind_speed:response.data.wind.speed,
                temperature:response.data.main.temp,
                city_name:response.data.name,
                icon:icon
                
            })
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        handleSearch()
    },[])
    console.log(city,'city')

    const handleChangeCity=(e)=>{
        setCity(e.target.value)
    }

    console.log(weatherData)

  return (
    <div className='main-weather-container'>
    <div className='weather-container'>
        {weatherData&&(
            <>
        <div>
        <input type='text' className='search-container' placeholder='search' onChange={handleChangeCity} value={city}/>
        <button type='button' className='search-button' onClick={handleSearch}><CiSearch/></button>
        </div>
        <div className='sun-container'>
            <IoSunnySharp className='sun'/>
        </div>
        <div className='temperatur-city-container'>
            <h1 className='temperature'>{weatherData.temperature}&deg;C</h1>
            <p>{weatherData.city_name}</p>
        </div>
        <div className='humidity-wind-container'>
            <div>
            <div className='humidity-container'>
            <LuWaves className='common-icon'/>
            <p>{weatherData.humidity} %</p>
            </div>
            <p className='humidity-text'>Humidity</p>
            </div>

            <div>
            <div className='wind-container'>
            <FaWind className='common-icon'/>
            <p>{weatherData.wind_speed} Km/h</p>
            </div>
            <p className='wind-text'>Wind Speed</p>
            </div>
        </div>
        </>
        )}
    </div>
    </div>
  )
}

export default Weather
