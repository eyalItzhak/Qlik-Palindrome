
//**************************/
//this is for demo purposes only
//**************************/


import express from 'express';
import { User } from '../models/users';
import { Message } from '../models/message';
import { messageData, userData } from '../const/baseData';
const router = express.Router();

//rest all dbs and put some data to interact with

router.post("/api/dev/restDB", async(req, res) => {
   await User.deleteMany({})
   await Message.deleteMany({})

   return res.status(200).json({ message: "All DBs reset" });
}) 

router.post("/api/dev/restDBWithUsers", async(req, res) => {
    await User.deleteMany({})
    await Message.deleteMany({})
    await User.insertMany(userData)
    return res.status(200).json({ message: "All DBs reset + users was created" });
 })
 
 router.post("/api/dev/restDBWithUsersAndMessages", async(req, res) => {
    await User.deleteMany({})
    await Message.deleteMany({})
    await User.insertMany(userData)
    await Message.insertMany(messageData)
    return res.status(200).json({ message: "All DBs reset + users was created + users have some messages " });
 })

export { router as devRoutes };