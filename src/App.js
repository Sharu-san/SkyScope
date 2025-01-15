import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const[data,setData]= useState('')
  const[location,setLocation]= useState('')
  const [dateTime, setDateTime] = useState(new Date());

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=afb5e0a19b4ecd94334388e7a9f3e197`;

  const searchLocation = (event)=>{
    if(event.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
        setLocation('')
    }   
  }


  // Update the date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  // Format date and time as needed
  const formattedDateTime = `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;

  

  return (
    <div className="app">
     <div className="search">
      <input 
      value={location}
      onChange={event => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder="Enter Location"
      type="text"/>

     </div>
       <div className="container">
        <div className="top">
          <div classname="location">
            <p>📍{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p className="bold">{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name != undefined && 
          <div className="bottom">
          <div className="feelslike">
          {data.main ? <p className="bold">{data.main.feels_like}°F</p> : null}
          <p>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
          <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed}MPH</p> : null}
          <p>Wind</p>
          </div>
          </div>

        }
          {/* Date and Time */}
          <div className="date-time">
            <p className="bold">🕛 Date and Time: {formattedDateTime}</p>
          </div>
          {data.name == undefined && 
          <div className="message">
            <h1>Welcome!! </h1>
            <p>Weather App ReactJs|| ~ Sharu</p>
          </div>
}
        
       </div>
    </div>
  );
}

export default App;
