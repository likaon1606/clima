import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [weather, setWeather] = useState({});
  const [temp, setTemp] = useState();
  const [tempData, setTempData] = useState();

   const [isCelsius, setIsCelsious] = useState(false);
  const success = pos => {
    console.log(pos.coords)
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=93e0e1e3107b0969d6cc37d2796393f8`)
      .then((res) => {
        setWeather(res.data);
        setTempData(res.data.main.temp);
        setTemp((res.data.main.temp - 273.15).toFixed());

      });
  };
  
  useEffect(() =>{
  navigator.geolocation.getCurrentPosition(success);
  },[]);
  const convert = () => {
    let value = 0;
    if (isCelsius) {
      value = (tempData - 273.15).toFixed();
      setIsCelsious(false);
    } else {
      value = ((tempData - 273.15) * 1.8 + 32).toFixed();
      setIsCelsious(true);
    }
    setTemp(value);
  };
  return (
    <div className="App">
      <h1>Weather</h1>
      
      <div>
      <ul  className='Yannet'>
        <li><b>Country: </b>{weather.sys?.country}</li>
        <li><b>City: </b>{weather.main?.name}</li>
        <li><b>Wind Speed: </b>{weather.wind?.speed}</li>
        <li><b>Latitude: </b>{weather.coord?.lat}</li>
        <li><b>Longitude: </b>{weather.coord?.lon}</li>
        <li><b>Pressure: </b>{weather.main?.pressure} (hpa)</li>
        <li><b>Units: </b>{temp}
          {isCelsius ? "  °F" : " °C"}</li>
        </ul>

        
        <button className='Button' onClick={convert}>
          Convert to:
        </button>
        </div>
      
    </div>
  );
}
export default App;