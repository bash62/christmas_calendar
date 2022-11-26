import path from "path";
import { RewardType } from "../types/reward.type";
import { app } from "../index";
import { Route } from "../structures/route";
import { encode, decode } from "../utils/base64";

const qr = require("qrcode");
const bcrypt = require('bcrypt');

async function isAuthenticated(req, res, next) {
  const user = await app.db.user.findOneBy({ id: 1});
  const cookie = req.headers.cookie
  let isAuth = false;
  if (!cookie) return res.redirect("/login");

  cookie.split(";").map((item) => {
    const [key, value] = item.replace(/\s/g,"").split("=");
    if(key == "hash" && decode(value) === user.loggedInCookieHash){
      isAuth = true;
    } 
  });

  return isAuth? next() : res.redirect("/login");
}

async function alreadyAuthenticated(req, res, next) {
  const user = await app.db.user.findOneBy({ id: 1});
  const cookie = req.headers.cookie
  let isAuth = false;
  if (!cookie) isAuth = false;

  cookie.split(";").map((item) => {
    const [key, value] = item.replace(/\s/g,"").split("=");
    if(key == "hash" && decode(value) === user.loggedInCookieHash){
      isAuth = true;
    } 
  });

  return isAuth? res.redirect("/") : next();
}

export default new Route("/")
  .get("/login", alreadyAuthenticated, async (req, res) => {
    res.render("login", {
      error: false,
    });
  })
  .post("/login", async (req, res) => {
    const { password } = req.body;
    const user = await app.db.user.findOneBy({ id: 1});
    const match = await bcrypt.compare( password,user.loggedInCookieHash)

    if(match){
      res.cookie("hash", encode(user.loggedInCookieHash), { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res.redirect("/");
    }

    return res.render("login", {
      error: true,
    });
  })
  .get("/", isAuthenticated, async (req, res) => {
    const days = new Date(Date.now()).getDate().toString().padStart(2, "0");
    const user = await app.db.user.findOneBy({ id: 1});

    const rewards = await app.db.rewards.find();
    const reward = rewards.find((item) => item.day === +days);

    const totalAmountChocolate = rewards.filter((item) => item.type === RewardType.chocolat).length;
    const totalAmountSurprise = rewards.filter((item) => item.type === RewardType.surprise).length;


    rewards.forEach(async (item) => {
      if (item.type === RewardType.coupon && item.qrcode === null) {
        const url = `https://${req.hostname}/coupons/${item.day}`;
    
        qr.toDataURL(url,{
          margin: 2,
          color: {
            dark:"#000000",
            light:"#d3d3d3"
          }
        }, (err, src) => {
          item.qrcode = src;
          app.db.rewards.save(item);
        });
      }
    });

    if (new Date(Date.now()).getMonth() !== 10 || new Date(Date.now()).getDate() > 26) {
      const startDate = new Date(new Date().getDate() > 26 && new Date().getMonth() !== 10? new Date().getFullYear() : new Date().getFullYear() + 1 , 11, 1, 0, 0, 0, 0);

      const now = new Date(Date.now());

      return res.render("error", {
        error: "L'application n'est pas encore disponible",
        days: (-(now.getTime() - startDate.getTime())) / 1000,
      });
    }

    res.render("home", {
      days,
      amountChocolate: user.amountChocolat,
      amountSurprise: user.amountSurprise,
      lastseen: user.lastDayConnection,
      title: "Home",
      reward: reward,
      rewards: rewards,
      totalAmountChocolate: totalAmountChocolate,
      totalAmountSurprise: totalAmountSurprise,
      claimedAllChocolat: totalAmountChocolate == user.amountChocolat,
      claimedAllSurprise: totalAmountSurprise == user.amountSurprise,
      showSnow: process.env.SHOW_SNOWFLAKE == "true",
    });
  })
  .post("/reedem/:day", isAuthenticated, async (req, res) => {
    const days = req.params.day;
    const user = await app.db.user.findOneBy({ id: 1});
    const reward = await app.db.rewards.findOneBy({ day: +days });

    if(reward.isRedeemed == false){
      reward.isRedeemed = true;
      user.amountRedeemed = user.amountRedeemed + 1;

      switch(reward.type){
        case RewardType.surprise:
          user.amountSurprise = user.amountSurprise + 1;
          reward.numberSurpriseOnClaimed = user.amountSurprise;
          break;
        case RewardType.chocolat:
          user.amountChocolat = user.amountChocolat + 1;
          reward.numberChocolateOnClaimed = user.amountChocolat;
          break;
      }

      user.lastDayConnection = +days;
      await app.db.rewards.save(reward);
      await app.db.user.save(user);
    }

    const totalAmountChocolate = await app.db.rewards.countBy({ type: RewardType.chocolat }); 
    const totalAmountSurprise = await app.db.rewards.countBy({ type: RewardType.surprise }); 

    res.status(200).send({
      ...reward,
      totalAmountChocolate,
      totalAmountSurprise,
    })
  })
  .get("/coupons/:id", isAuthenticated, async (req, res) => {
    const day = req.params.id;
    const coupon = await app.db.rewards.findOneBy({ day: +day });

    if(coupon){
      res.render("validate-coupon", {
        coupon: coupon,
      });
    } else {
      res.redirect("/");
    }
  })
  .post("/coupons/:id", isAuthenticated, async (req, res) => {
    const { id } = req.body;
    const coupon = await app.db.rewards.findOneBy({ id: +id });
    await app.db.rewards.save({
      ...coupon,
      isCouponClaimed: true,
    });
    res.render("validate-coupon", {
      coupon: {
        ...coupon,
        isCouponClaimed: true,
      },
    });
  });
