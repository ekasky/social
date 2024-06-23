import { Request, Response } from "express";
import { reqLogger } from "../../utils/loggers";

const registerController = (req:Request, res:Response):Response => {

    // Extract the request field
    const { first_name, last_name, email, username, password } = req.body;

    console.log(`FIRST NAME: ${first_name}`);
    console.log(`LAST NAME: ${last_name}`);
    console.log(`EMAIL: ${email}`);
    console.log(`USERNAME: ${username}`);
    console.log(`PASSWORD: ${password}`);

    reqLogger(req, 'DEBUG', 'REGISTER API TEST', true);
    return res.status(200).send('Register API Test');

};

export default registerController;