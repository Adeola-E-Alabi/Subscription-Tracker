import dotenv from 'dotenv';

const envPath = `.env.${process.env.NODE_ENV || 'development'}.local`;
//cleaconsole.log(`Loading environment variables from: ${envPath}`);

dotenv.config({ path: envPath });

//console.log('PORT from env:', process.env); // Debugging line

export const {
    PORT,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_ENV,
    ARCJET_KEY,
    QSTASH_TOKEN,
    QSTASH_URL,
    SERVER_URL,
    EMAIL_PASSWORD
    } = process.env;
