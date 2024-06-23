import mongoose from "mongoose";


export default interface UserInterface extends Document {

    first_name:mongoose.Schema.Types.String;
    last_name:mongoose.Schema.Types.String;
    email:mongoose.Schema.Types.String;
    username:mongoose.Schema.Types.String;
    password:mongoose.Schema.Types.String;
    createdAt:mongoose.Schema.Types.Date;
    lastLogin:mongoose.Schema.Types.Date;
    verified:mongoose.Schema.Types.Boolean;
    locked:mongoose.Schema.Types.Boolean;
    loginAttempts:mongoose.Schema.Types.Number;

};