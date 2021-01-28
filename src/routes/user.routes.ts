import { Router } from "express";
import { getUsers, getUser } from "../controllers/users.controller";
import passport from "passport";

const router = Router();

/**
 * Apply Middleware Strategy from Passport
 * Authentication with Passport
 */
router.get("/", passport.authenticate("jwt", { session: false }), getUsers);
router.get("/:id", passport.authenticate("jwt", { session: false }), getUser);

export default router;
