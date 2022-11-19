import { app } from "..";
import { Route } from "../structures/route";

export default new Route("/api")
  .get("/rewards", async (req, res) => {
    const rewards = await app.db.rewards.find();
    res.json(rewards);
  })