import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * environment
   */
  env: process.env.NODE_ENV as string,

  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT as string, 10) as number,

  /**
   * MongoDB URI
   */
  mongoURI: process.env.MONGODB_URI as string,

  /**
   * GOOGLE LOGIN
   */
  googleClientID: process.env.GOOGLE_CLIENT_ID as string,
  googleClientSECRET: process.env.GOOGLE_CLIENT_SECRET as string,

  /**
   * jwt Secret
   */

  jwtSecret: process.env.JWT_SECRET as string,

  /**
   * jwt Algorithm
   */
  jwtAlgo: process.env.JWT_ALGO as string,

  /**
   * baseUrl
   */
  baseUrl: process.env.BASE_URL as string,

  /**
   * slack webhook
   */
  slackWebHook: process.env.SLACK_WEB_HOOK_URL as string,
};
