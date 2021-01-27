import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import config from "../config/config";
import User from "../models/User";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey,
};

export default new Strategy(opts, (payload, done) => {
  try {
    const user = User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
