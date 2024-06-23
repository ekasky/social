import { Request, Response } from 'express';
import { reqLogger } from '../../utils/loggers';
import UserModel from '../../models/UserModel';
import argon2  from 'argon2';

const registerController = async (req:Request, res:Response):Promise<Response> => {

    try {

        // Extract the request field
        const { first_name, last_name, email, username, password } = req.body;

        // Check to see if the email address is already in use by another user
        let user = await UserModel.findOne({email});

        if(user !== null) {

            reqLogger(req, 'ERROR', 'Email address already in use', true);

            return res.status(409).json({
                message: 'Email address alreay in use'
            });

        }

        // Check if the username is already in use by another user
        user = await UserModel.findOne({username});

        if(user !== null) {

            reqLogger(req, 'ERROR', 'Username taken', true);

            return res.status(409).json({
                message: 'Username taken'
            });

        }

        // Hash the user's password before stroing new user into db
        const hash = await argon2.hash(password, {type: argon2.argon2id});

        // Create the new User
        const newUser = new UserModel({first_name, last_name, email, username, password:hash});
        await newUser.save();

        // Return a success message
        reqLogger(req, 'INFO', 'User Registered Successfully', true);
        return res.status(201).json({
            message: 'User Registered Successfully'
        });

    }
    catch(error) {

        reqLogger(req, 'ERROR', `Registration Error: ${error}`, true);
        return res.status(500).json({
            message: 'Internal Server Error'
        });

    }
    
};

export default registerController;