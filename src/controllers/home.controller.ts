import path from "path";
import { RewardType } from "../types/reward.type";
import { app } from "../index";
import { Route } from "../structures/route";
import { fetchSunDate } from "../utils/fetch-sundate";
var crypto = require('crypto');
const axios = require('axios');


export default new Route("/")
  .get("/", async (req, res) => {

    const days = new Date(Date.now()).getDate().toString().padStart(2, "0");
    const user = await app.db.user.findOneBy({ id: 1});
    const isAuth = await checkCookies(req,user);

    if(!isAuth){
      // res.redirect("/login");
      console.log("USER COOKIE DOES NOT MATCH");
    }
    console.log(user);

    const reward = await app.db.rewards.findOneBy({ id: 1 });
    console.log(JSON.stringify(reward));

    res.render("home", {
      days,
      lastseen: user.lastDayConnection,
      title: "Home",
      theme: await fetchSunDate(+days),
      reward: reward,
    });
  })
  .get("/robot.txt", (req, res) => {
    /*for (let i = 1; i < 26; i++) {
      fetchSunDate(i);
    }*/
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
        user.amountRedeemed = user.amountRedeemed + 1;

        switch(reward.type){
          case RewardType.surprise:
            user.amountSurprise = user.amountSurprise + 1;
            break;
          case RewardType.chocolat:
            user.amountChocolat = user.amountChocolat + 1;
            break;
        }

        user.lastDayConnection = days;

        await app.db.rewards.save(reward);
        await app.db.user.save(user);
      }
    }

    res.status(200);
  });

async function checkCookies(req,user) {
  let isAuth = false;
  const cookie = req.headers.cookie
  if(cookie){
    cookie.split(";").map((item) => {
      const [key, value] = item.replace(/\s/g,"").split("=");
      if(key == "hash" && value === user.loggedInCookieHash){
        isAuth=true;
      } 
    });
    console.log(isAuth);
  }
  return isAuth;
}

export async function getThemeFromApi() {
  const date = new Date(Date.now());

  const sunDate = await app.db.sunDate.findOneBy({ id: date.getDate() });

  if (sunDate) {
    if(date >= sunDate.sunrise && date < sunDate.sunset){
      return "";
    } else {
      return "dark";
    }
  } else {

    const url = process.env.IPGEOLOCATION_URL+"apiKey="+process.env.IPGEOLOCATION_API_KEY+"&location=Strasbourg";

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

        await app.db.sunDate.save({
          id: date.getDate(),
          sunrise: startSunrise,
          sunset: startSunset,
        });

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