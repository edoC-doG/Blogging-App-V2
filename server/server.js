import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

//Chema
import User from './Schema/User.js';

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

const server = express();
let PORT = 3055;

server.use(express.json())

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
});

const formatDatatoSend = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)
    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname,
    }
}

server.post("/signup", (req, res) => {
    let { username, fullname, email, password } = req.body;
    if (fullname.length < 3) {
        return res.status(403).json({ "error": "Fullname must be at least 3 letters long" })
    }
    if (username.length < 3) {
        return res.status(403).json({ "error": "Username must be at least 3 letters long" })
    }
    if (!email.length) {
        return res.status(403).json({ "error": "Enter email" })
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Email is invalid" })
    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters" })
    }

    bcrypt.hash(password, 10, async (err, hash_pwd) => {
        let user = new User({
            personal_info: {
                fullname, email, username, password: hash_pwd
            }
        })

        user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u))
        })
            .catch(err => {
                if (err.code === 11000) {
                    return res.status(500).json({ "error": "Email already exists" })
                }
                return res.status(403).json({ "error": err.message })
            })
    })
})

server.post("/signin", (req, res) => {
    let { email, password } = req.body;

    User.findOne({ "personal_info.email": email })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ "err": "Email not found" })
            }
            bcrypt.compare(password, user.personal_info.password, (err, rs) => {
                if (err) {
                    return res.status(403).json({ "error": "Error occurred while login please try again" })
                }
                if (!rs) {
                    return res.status(403).json({ "error": "Incorrect Password" })
                } else {
                    return res.status(200).json(formatDatatoSend(user))
                }
            })
        })
        .catch(err => {
            console.log(err.message)
            return res.status(500).json({ "err": err.message })
        })
})


server.listen(PORT, () => {
    console.log('Listening =>' + PORT)
})
