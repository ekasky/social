import { Request, Response } from "express";
import { reqLogger } from "../../utils/loggers";

const registerController = (req:Request, res:Response):Response => {

    try {

        // Extract the request field
        const { first_name, last_name, email, username, password } = req.body;

    }
    catch(error) {

    }
    

    reqLogger(req, 'DEBUG', 'REGISTER API TEST', true);
    return res.status(200).send('Register API Test');

};

export default registerController;