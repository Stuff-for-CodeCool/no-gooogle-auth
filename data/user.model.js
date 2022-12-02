import { Schema, model } from "mongoose";

//  Schema() imported directly
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

//  same with model()
export default model("User", userSchema);