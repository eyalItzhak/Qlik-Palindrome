//This file is for testing purposes only. 

import mongoose from "mongoose"

//its only use in dev routes
const userData = [
    {
        _id: new mongoose.Types.ObjectId("67eea95e89fe37a1f7855431"),
        email: "user1@gmail.com",
        password: "e802c51f107e2d0f713eac2c1a4fc457cda3388692017cbe32247172dafdd4807957e369c58ac83b7d34a46d2eb26b71298048f6d7dcb2690e203e7c7202441a.e05cb65aa6ba076e",
        permission: "ADMIN",
        createdAt: new Date("2025-04-03T15:29:34.676Z"),
        updatedAt: new Date("2025-04-03T15:29:34.676Z"),
        __v: 0
    },
    {
        _id: new mongoose.Types.ObjectId("67eea96589fe37a1f7855434"),
        email: "user2@gmail.com",
        password: "a7e457fadc9bef7f78162e623ca21ba2c69eb6ff02b84f45be09c80bfdc90362e9692d34083da3313e3b93a44a20f868776e51e5fddcea5f8c0998ed2182decc.a3aa14b90e7c1872",
        permission: "USER",
        createdAt: new Date("2025-04-03T15:29:41.054Z"),
        updatedAt: new Date("2025-04-03T15:29:41.054Z"),
        __v: 0
    },
    {
        _id: new mongoose.Types.ObjectId("67eea96889fe37a1f7855437"),
        email: "user3@gmail.com",
        password: "9b7ce944a95d65fb7a0685294115204369da20c1795c07944e15b47d119414c05eadb6e30db1a6ae6fdfa6f7ac565d4e233fcbc286b2d2220d492051e1d0e8aa.27d35a3ef715c7a1",
        permission: "USER",
        createdAt: new Date("2025-04-03T15:29:44.504Z"),
        updatedAt: new Date("2025-04-03T15:29:44.504Z"),
        __v: 0
    },
    {
        _id: new mongoose.Types.ObjectId("67eea96c89fe37a1f785543a"),
        email: "user4@gmail.com",
        password: "2db68261aa9a29702be81c6ced7d792d3c1740c47e6ae2c874a75dc7fd02d9ec7cea4f0801b4b13654be3c5ce5aaf432225ed79354a466e7878cb7fced038a18.17cbadac4974811d",
        permission: "USER",
        createdAt: new Date("2025-04-03T15:29:48.314Z"),
        updatedAt: new Date("2025-04-03T15:29:48.314Z"),
        __v: 0
    },
    {
        _id: new mongoose.Types.ObjectId("67eea96f89fe37a1f785543d"),
        email: "user5@gmail.com",
        password: "8dd9b2d2391ee6a09ea6353fdd4d0a40cfce2358b13d118f983d114a4fc3a988eb15afc2c9923c607daa9ed3ff2c4cd0721309e5e30b19ff4de945a143f768e7.1397f5c5cfddba4b",
        permission: "USER",
        createdAt: new Date("2025-04-03T15:29:51.430Z"),
        updatedAt: new Date("2025-04-03T15:29:51.430Z"),
        __v: 0
    }
]


const messageData = [{
    "_id": new mongoose.Types.ObjectId("67eeb0057504f38e9395da29"),
    "userId": new mongoose.Types.ObjectId("67eea96589fe37a1f7855434"),
    "content": "1",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:57:57.451Z"),
    "updatedAt": new Date("2025-04-03T15:57:57.451Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb0077504f38e9395da2b"),
    "userId": new mongoose.Types.ObjectId("67eea96589fe37a1f7855434"),
    "content": "1",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:57:59.888Z"),
    "updatedAt": new Date("2025-04-03T15:57:59.888Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb0087504f38e9395da2d"),
    "userId": new mongoose.Types.ObjectId("67eea96589fe37a1f7855434"),
    "content": "1",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:58:00.606Z"),
    "updatedAt": new Date("2025-04-03T15:58:00.606Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb00d7504f38e9395da2f"),
    "userId": new mongoose.Types.ObjectId("67eea96589fe37a1f7855434"),
    "content": "abc",
    "isPalindrome": false,
    "createdAt": new Date("2025-04-03T15:58:05.178Z"),
    "updatedAt": new Date("2025-04-03T15:58:05.178Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb0127504f38e9395da31"),
    "userId": new mongoose.Types.ObjectId("67eea96589fe37a1f7855434"),
    "content": "aaabbbaaa",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:58:10.431Z"),
    "updatedAt": new Date("2025-04-03T15:58:10.431Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb0167504f38e9395da33"),
    "userId": new mongoose.Types.ObjectId("67eea96589fe37a1f7855434"),
    "content": "aba",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:58:14.010Z"),
    "updatedAt": new Date("2025-04-03T15:58:14.010Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb0197504f38e9395da35"),
    "userId": new mongoose.Types.ObjectId("67eea96589fe37a1f7855434"),
    "content": "123321",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:58:17.647Z"),
    "updatedAt": new Date("2025-04-03T15:58:17.647Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb01d7504f38e9395da37"),
    "userId": new mongoose.Types.ObjectId("67eea96589fe37a1f7855434"),
    "content": "12321",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:58:21.212Z"),
    "updatedAt": new Date("2025-04-03T15:58:21.212Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb0557504f38e9395da3e"),
    "userId": new mongoose.Types.ObjectId("67eea95e89fe37a1f7855431"),
    "content": "12321",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:59:17.075Z"),
    "updatedAt": new Date("2025-04-03T15:59:17.075Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb0567504f38e9395da40"),
    "userId": new mongoose.Types.ObjectId("67eea95e89fe37a1f7855431"),
    "content": "12321",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:59:18.649Z"),
    "updatedAt": new Date("2025-04-03T15:59:18.649Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb05b7504f38e9395da42"),
    "userId": new mongoose.Types.ObjectId("67eea95e89fe37a1f7855431"),
    "content": "sssnnnsss",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:59:23.811Z"),
    "updatedAt": new Date("2025-04-03T15:59:23.811Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb0607504f38e9395da44"),
    "userId": new mongoose.Types.ObjectId("67eea95e89fe37a1f7855431"),
    "content": "abvc",
    "isPalindrome": false,
    "createdAt": new Date("2025-04-03T15:59:28.979Z"),
    "updatedAt": new Date("2025-04-03T15:59:28.979Z"),
    "__v": 0
},
{
    "_id": new mongoose.Types.ObjectId("67eeb0647504f38e9395da46"),
    "userId": new mongoose.Types.ObjectId("67eea95e89fe37a1f7855431"),
    "content": "aba",
    "isPalindrome": true,
    "createdAt": new Date("2025-04-03T15:59:32.348Z"),
    "updatedAt": new Date("2025-04-03T15:59:32.348Z"),
    "__v": 0
}]

export { userData, messageData }