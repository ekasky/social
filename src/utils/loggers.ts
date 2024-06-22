import fs from 'fs';
import path from 'path';
import { Request } from 'express';
import LogLevel from '../interfaces/LogLevel';

const logFilePath = path.resolve(__dirname, '../server.log');

const logger = (level:LogLevel['level'] = 'INFO', message:string, printToConsole:Boolean):void => {

    const timestamp    = new Date().toISOString();
    const logMessage   = `${timestamp} -- [${level}]: ${message}`;

    fs.appendFile(logFilePath, logMessage + '\n', (error) => {

        if(error) {

            console.error(`COULD NOT WRITE TO LOG FILE: ${error}`);

        }

    });

    if(printToConsole === true) {

        console.log(logMessage);

    }

};

const reqLogger = (req:Request, level:LogLevel['level'] = 'INFO', message:string, printToConsole:Boolean):void => {

    const timestamp = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const method = req.method;
    const url = req.originalUrl;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const logMessage   = `${timestamp} -- [${level}]: ${message} -- IP ADDRESS: ${ip} -- METHOD: ${method} -- URL: ${url} -- USER AGENT: ${userAgent}`;

    fs.appendFile(logFilePath, logMessage + '\n', (error) => {

        if(error) {

            console.error(`COULD NOT WRITE TO LOG FILE: ${error}`);

        }

    });

    if(printToConsole === true) {

        console.log(logMessage);

    }

};

export { logger, reqLogger };