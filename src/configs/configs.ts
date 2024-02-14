import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT,
  SECRET_SALT: +process.env.SECRET_SALT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN,
  DB_URL: process.env.DB_URL,
  FRONT_URL: process.env.FRONT_URL,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  ADMIN_SIGNUP_PASSWORD: process.env.ADMIN_SIGNUP_PASSWORD,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_ACCESS_: process.env.AWS_S3_ACCESS,
  AWS_S3_SECRET: process.env.AWS_S3_SECRET,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_S3_URL: process.env.AWS_S3_URL,
};
