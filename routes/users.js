import { Router } from "express";
import { ReturnDocument } from "mongodb";
import { createConnection, encryptPassword } from "../data/user.handler.js";

import User from "../data/user.model.js";

createConnection();

//  Super simple router, no need to require anything
export default Router()
    .get("/", async (req, res) => {
        const users = await User.find({}).sort({ _id: -1 });
        res.render("users.ejs", { users });
    })
    .get("/id/:id", async (req, res) => {
        res.render("user.ejs", { user: await User.findById(req.params.id) });
    })
    .put("/id/:id", async (req, res) => {
        const _id = req.params.id;
        const { name, email } = req.body;
        const user = await User.findOneAndUpdate(
            { _id },
            { name, email },
            { returnOriginal: false }
        );
        res.json({ message: "User updated" });
    })
    .get("/register", (req, res) => res.render("register.ejs"))
    .post("/register", async (req, res) => {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ name, email });

        if (!exists) {
            const user = await new User({
                name,
                email,
                password: encryptPassword(password),
            }).save();
            console.log(user);

            res.json({ message: "ok" });
        } else {
            res.json({ exists });
        }
    })
    .post("/register/check/name", async (req, res) => {
        const { name } = req.body;
        const exists = await User.findOne({ name });
        res.json({ exists });
    })
    .post("/register/check/email", async (req, res) => {
        const { email } = req.body;
        const exists = await User.findOne({ email });
        res.json({ exists });
    })
    .get("/login", (req, res) => res.render("login.ejs"))
    .post("/login", async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.json({ message: "Email not found" });
        } else if (user.password !== encryptPassword(password)) {
            res.json({ message: "Incorrect password provided" });
        } else {
            res.json({ message: "Logged in", ok: true });
        }
    });
