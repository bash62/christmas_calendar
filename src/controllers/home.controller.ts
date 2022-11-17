import path from "path";
import { app } from "../index";
import { Route } from "../structures/route";

const axios = require('axios');


export default new Route("/")


  .get("/", async (req, res) => {

    app.db.user.find().then((users) => {
      console.log(users);
    });

    let getTheme = await getThemeFromApi();
    console.log("first APi called");
    while(getTheme == "404"){
      console.log("API called again");
      getTheme = await getThemeFromApi();
    }
    
    const days = new Date(Date.now()).getDate().toString().padStart(2, "0");
    res.render("home", {
      days,
      title: "Home",
      theme: getTheme,
    });
  })
  .get("/robot.txt", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'robot.txt'))
  })
  .get("/sitemap.xml", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'sitemap.xml'))
  })
  .get("/site.webmanifest", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'site.webmanifest'))
  });


  async function getThemeFromApi(){

    console.log("API CALLED");

    const date = new Date(Date.now());
    const url = process.env.IPGEOLOCATION_URL+"apiKey="+process.env.IPGEOLOCATION_API_KEY+"&location=Strasbourg";
    //Get the location to know if theme is dark or not
    console.log(date.getHours(),date.getMinutes());
    //get the interval if it's in or not




    return axios.get(url)
    .then(function (response) {
      const sunset = response.data.sunset;
      const sunrise = response.data.sunrise;
      const sunsetHour = sunset.split(":")[0];
      const sunsetMinute = sunset.split(":")[1];
      const sunriseHour = sunrise.split(":")[0];
      const sunriseMinute = sunrise.split(":")[1];
      
      var startSunrise = new Date();
      startSunrise.setHours(sunriseHour,sunriseMinute,0); // L'heure du lever du soleil
      var startSunset= new Date();
      startSunset.setHours(sunsetHour,sunsetMinute,0); // l'heure du coucher du soleil
      if(date >= startSunrise && date < startSunset){
        return "";
      }
      else {
        return "dark";
      }
    })
    
    .catch(function (error) {
      // handle error
      console.log(error);
      return "404";
    })

  }


