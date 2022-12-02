import { config } from "dotenv";
import { connect } from "mongoose";

import { readFileSync } from "fs";
import { createHash } from "crypto";

import User from "./user.model.js";

config();

export const encryptPassword = (pass) =>
    createHash("sha256", process.env.SALT).update(pass).digest("hex"); //  This bit encodes the provided password

export const createConnection = () =>
    connect(`mongodb://${process.env.MONGOHOST}/${process.env.MONGODB}`)
        .catch((e) => console.error(e))
        .then(({ connection }) => {
            console.log(`Connected to ${connection.name}`);
        });

export const insertAll = async (removeFirst = false) => {
    //  Remove all users prior to insertion?
    if (removeFirst) {
        await User.deleteMany();
    }

    const userList = JSON.parse(readFileSync("./data/users.json"));

    //  Yeah, awaited promises. Ugly, I know, but it works.
    return await User.insertMany(userList)
        .then(() => console.log("Inserted users"))
        .catch((e) => console.error(e));
};

export const listAll = async () =>
    await User.find({}, "name email")
        .limit(4)
        .then(() => console.log("Sought all users"))
        .catch((e) => console.error(e));

export const insertUser = async (name, email, password) =>
    await User.insertOne({
        name, //  instead of name: name,
        email, //  instead of email: email,
        password: encryptPassword(password),
    });
