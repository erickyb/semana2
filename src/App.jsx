
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';

const API_KEY = "aaebaaed3a30d29abde508a68ac7d4e5"
const arrayErick = ['Profe: Junior Pacheco', 'Alumno:Erickyb ', 'Academlo']

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temps, setTemps] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  // esto es nuevo
  // const [paragraph, setParagraph] = useEffect('');
  // const [paragraphCounter, setParagraphCounter] = useEffect(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setParagraphCounter((currentValue) => {
  //       if (currentValue + 1 === arrayErick.length) {
  //         return 0;
  //       }
  //       return currentValue + 1;
  //     });
  //   }, 3000);
  //   return () => clearInterval(interval)
  // }, []);






  const success = (e) => {
    console.log(e)
    const newCoords = {
      lat: e.coords.latitude,
      lon: e.coords.longitude
    }
    setCoords(newCoords)

    // console.log(newCoords)
  }

  const changeUnitTemp = () => setIsCelsius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)

  }, [])
  useEffect(() => {
    if (coords) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {

          setTimeout(() => {
            setWeather(res.data)
            const celsius = (res.data.main.temp - 273.15).toFixed(2)
            const fahrenheit = (celsius * (9 / 5) + 32).toFixed(2);
            const newTemps = { celsius, fahrenheit }
            setTemps(newTemps)
          }, 1000)
        })
        .catch(err => console.log(err))
    }

  }, [coords])

  return (
    <div className="App">
      {
        weather ? (
          <WeatherCard
            weather={weather}
            temps={temps}
            isCelsius={isCelsius}
            changeUnitTemp={changeUnitTemp}
          />
        ) : <Loader />

      }

    </div>
  )
}

export default App
