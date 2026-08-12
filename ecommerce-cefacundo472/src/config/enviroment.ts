import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

export const environment = {
  host: process.env.HOST,
  port: process.env.PORT ? Number(process.env.PORT) : 3000,

  
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
 
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};