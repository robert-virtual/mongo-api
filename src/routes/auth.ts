import { Router } from "express";
import { UserMongoDao } from "../dao/mongo/UserMongoDao";

const authRouter = Router();
const users = new UserMongoDao();

authRouter.post("/signup", async (req, res) => {
  const result = await users.signup(req.body);
  res.json({ msg: "successfully signed up", ...result });
});

authRouter.post("/signin", async (req, res) => {
  try {
    const result = await users.signin(req.body);
    res.json({ msg: "successfully signed in", ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.get("/refresh", (req, res) => {
  res.json({ token: "new token" });
});

authRouter.put("/reset", (req, res) => {
  res.json({ msg: "successfully signedup" });
});

authRouter.delete("/logout", (req, res) => {
  res.json({ msg: "successfully signedup" });
});

export default authRouter;
