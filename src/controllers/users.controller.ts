import { Request, Response } from 'express'

import User from '../models/User'

export const getUsers = async (req: Request,res: Response)=>{
  const users = await User.find({})
  res.status(200).json(users)
}

export const getUser = async (req: Request,res: Response)=>{
  const {id} = req.params
  const user = await User.findById(id)
  res.status(200).json(user)
}