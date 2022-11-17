import path from "path";
import { app } from "../index";
import { Route } from "../structures/route";
var crypto = require('crypto');
const axios = require('axios');


export default new Route("/")


  .get("/", async (req, res) => {


    const days = new Date(Date.now()).getDate().toString().padStart(2, "0");
    const user = await app.db.user.findOneBy({ id: 1});
    const isAuth = await checkCookies(req,user);

    if(!isAuth){
      //res.redirect("/login");
      console.log("USER COOKIE DOES NOT MATCH");
    }
    console.log(user);

    const reward = await app.db.rewards.findBy({ id: 1});
    console.log(JSON.stringify(reward));



    res.render("home", {
      days,
      lastseen: user.lastdayconnection,
      title: "Home",
      theme: "dark",//await getThemeFromApi(),
      reward: reward,
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
  })
  .post("/redeem", async (req, res) => {
    const days = new Date(Date.now()).getDate();
    const user = await app.db.user.findOneBy({ id: 1});
    const reward = await app.db.rewards.findOneBy({ id: 1});
    const isAuth = await checkCookies(req,user);
    if(isAuth){
      console.log(reward);
      if(reward.isRedeemed == false){

        reward.isRedeemed = true;
        user.ammount_redeemed = user.ammount_redeemed + 1;

        
        switch(reward.type){
          case "surprise":
            if(reward.caption == "chocolat"){
              user.ammount_chocolat = user.ammount_chocolat + 1;
            }
            else {
              user.ammount_surprise = user.ammount_surprise + 1;
            }
            break;
        }
        user.lastdayconnection = days;
        await app.db.rewards.save(reward);
        await app.db.user.save(user);


      }
    }

    res.status(200);
  });

  async function checkCookies(req,user){
    let isAuth = false;
    const cookie = req.headers.cookie
    if(cookie){
      const isAuthCookie = cookie.split(";").map((item) => {
        const [key, value] = item.replace(/\s/g,"").split("=");
        console.log(key,value)
        if(key == "hash"){
          if(value === user.logged_in_cookie_hash){
            isAuth=true;
          }
        } 
      });
      console.log(isAuth);
      return isAuth;
    }


  }

  async function getThemeFromApi(){


    const date = new Date(Date.now());
    const url = process.env.IPGEOLOCATION_URL+"apiKey="+process.env.IPGEOLOCATION_API_KEY+"&location=Strasbourg";

    return axios.get(url)
    .then(function (response) {
      const sunset = response.data.sunset;
      const sunrise = response.data.sunrise;
      const sunsetHour = sunset.split(":")[0];
      const sunsetMinute = sunset.split(":")[1];
      const sunriseHour = sunrise.split(":")[0];
      const sunriseMinute = sunrise.split(":")[1];
      
      var startSunrise = new Date();
      var startSunset= new Date();

      startSunrise.setHours(sunriseHour,sunriseMinute,0); // L'heure du lever du soleil
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


