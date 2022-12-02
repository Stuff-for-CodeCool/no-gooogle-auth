//  {"type": "module"} in package.json for imports
import { config } from "dotenv";
import express, { json, static as expressStatic, urlencoded } from "express";
import cors from "cors";

import users from "./routes/users.js";

//  Get all data from .env
config();
const port = process.env.PORT;

//  No need to declare an app variable
express()
    .use(cors())
    .use(json()) //  and not express.json()
    .use(urlencoded({ extended: false })) //  and not bodyParser.urlencoded({ extended: false })
    .use(expressStatic("public")) //  static is a keyword so express.static is imported as expressStatic
    .set("views", "./views")
    .set("view engine", "ejs")
    .get("/", (req, res) => res.render("index.ejs", {}))
    .use("/users", users)
    .listen(port, () =>
        console.log(`Server listening on http://localhost:${port}/`)
    );
