import moongoose, { Schema, model } from 'mongoose';
import UserInterface from '../interfaces/UserInterface';
import mongoose from 'mongoose';

const UserSchema = new Schema<UserInterface>({

    first_name: {
        type: moongoose.Schema.Types.String,
        required: true
    },

    last_name: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },

    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },

    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    },

    lastLogin: {
        type: mongoose.Schema.Types.Date,
        default: null
    },

    verified: {
        type: moongoose.Schema.Types.Boolean,
        default: false
    },

    locked: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },

    loginAttempts: {
        type: mongoose.Schema.Types.Number,
        default: 0
    }

});

const UserModel = model<UserInterface>('UserModel', UserSchema);

export default UserModel;