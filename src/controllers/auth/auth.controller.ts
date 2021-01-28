import config from "../../config/config";

import { Request, Response } from "express";
import { IUser } from "../../models/IUser";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Creating tokens 
 * Using jsonwebtoken
 * @param user 
 * @returns
 */
function createToken(user: IUser) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.secretKey,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
}

/**
 * User registration function 
 * @param req 
 * @param res 
 * @returns
 */
export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please, send your email and password." });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "User already exixts!" });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

/**
 * User login function
 * @param req 
 * @param res 
 * @returns
 */
export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please, send your email and password." });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "User does not exixts!" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (isMatch) {
    return res.status(201).json({ token: createToken(user) });
  }

  return res.status(400).json({ msg: "The email or password are incorrect!" });
};
