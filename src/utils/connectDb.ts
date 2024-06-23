import mongoose from 'mongoose';
import { logger } from './loggers';

const connectDb = async () => {

    const URI = process.env.URI as string;

    try {

        await mongoose.connect(URI);
        logger('INFO', 'Connected to db', true);

    }
    catch(error) {

        logger('ERROR', `Failed to connect to db: ${error}`, true);

    }

};

export default connectDb;