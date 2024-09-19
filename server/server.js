import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config"
import bcrypt from "bcrypt"

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

    bcrypt.hash(password, 10, (err, hash_pwd) => {
        let user = new User({
            personal_info: {
                fullname, email, username, password
            }
        })

        user.save().then((u) => {
            return res.status(200).json({ user: u })
        })
            .catch(err => {
                return res.status(403).json({ "error": err.message })
            })
    })
})

server.listen(PORT, () => {
    console.log('Listening =>' + PORT)
})
