import { Router } from "express";
import { signIn, signUp } from "../controllers/auth/auth.controller";
import passport from "passport";

/**
 * Router
 * Using Passport
 */
const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Success!!");
  }
);

export default router;
