import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';
import { check, validationResult } from 'express-validator';
import he from 'he';
import { reqLogger } from '../utils/loggers';

const sanitizeAndValidateRegisterRequest = [

    // Sanitize the user's first_name to remove any XSS vulnerability

    (req:Request, res:Response, next:NextFunction) => {

        req.body.first_name = sanitizeHtml(req.body.first_name, { allowedTags: [], allowedAttributes: {} });
        req.body.first_name = he.decode(req.body.first_name);
        next();

    },

    // Sanitize the user's last_name to remove any XSS vulnerability

    (req:Request, res:Response, next:NextFunction) => {

        req.body.last_name = sanitizeHtml(req.body.last_name, { allowedTags: [], allowedAttributes: {} });
        req.body.last_name = he.decode(req.body.last_name);
        next();

    },

    // Sanitize the user's username to remove any XSS vulnerability

    (req:Request, res:Response, next:NextFunction) => {

        req.body.username = sanitizeHtml(req.body.username, { allowedTags: [], allowedAttributes: {} });
        req.body.username = he.decode(req.body.username);
        next();

    },

    // Validate the user's first_name
    check('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({max: 50}).withMessage('First name cannot exceed 50 characters'),

    
    // Validate the user's last_name
    check('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({max: 50}).withMessage('Last name cannot exceed 50 characters'),

    
    // Validate the user's email
    check('email')
    .trim()
    .normalizeEmail()
    .isEmail().withMessage('Invalid email format'),


    // Validate the user's username
    check('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isAlphanumeric().withMessage('Username can only contain alphanumeric characters')
    .isLength({max: 50}).withMessage('Username cannot exceed 50 characters'),


    // Validate the user's password
    check('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isStrongPassword().withMessage('Password is to weak')
    .isLength({max: 64}).withMessage('Password cannot exceed 64 characters'),

    // Validate that confirm_password matches password
    check('confirm_password')
    .trim()
    .notEmpty().withMessage('Confirm password required')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    

    // Handle any santization and/or validation errors
    (req:Request, res:Response, next:NextFunction) => {

        const errors = validationResult(req);

        // Extract error messages from error array
        const messages = errors.array().map(error => error.msg);

        if (!errors.isEmpty()) {

            reqLogger(req, 'ERROR', messages.join(', '), true);

            return res.status(400).json({
                message: messages
            });

        }

        next();

    }

];

export default sanitizeAndValidateRegisterRequest;