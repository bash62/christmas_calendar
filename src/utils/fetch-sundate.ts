import axios from "axios";
import { app } from "../";

export const fetchSunDate = async (inc: number = 0) => {
  const date = new Date(Date.now());

  const sunDate = await app.db.sunDate.findOneBy({ id: inc });

  if (sunDate) {
    if(date >= sunDate.sunrise && date < sunDate.sunset){
      return "";
    } else {
      return "dark";
    }
  } else {
    const url = process.env.IPGEOLOCATION_URL+"apiKey="+process.env.IPGEOLOCATION_API_KEY+"&location=Strasbourg&date=2022-11-"+inc.toString().padStart(2, "0");

    return axios.get(url)
      .then( async (response) => {
        console.log(response.data);

        const { sunset, sunrise } = response.data;

        const sunsetHour = sunset.split(":")[0];
        const sunsetMinute = sunset.split(":")[1];

        const sunriseHour = sunrise.split(":")[0];
        const sunriseMinute = sunrise.split(":")[1];
        
        var startSunrise = new Date();
        var startSunset= new Date();

        startSunrise.setHours(sunriseHour,sunriseMinute,0); // L'heure du lever du soleil
        startSunset.setHours(sunsetHour,sunsetMinute,0); // l'heure du coucher du soleil

        const sunDate = await app.db.sunDate.create({
          id: inc,
          sunrise: startSunrise,
          sunset: startSunset,
        });
        await app.db.sunDate.save(sunDate);

        if(date >= startSunrise && date < startSunset){
          return "";
        } else {
          return "dark";
        }

        
      })
      .catch(function (error) {
        return "";
      });
  }
}