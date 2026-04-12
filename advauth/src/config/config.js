import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGODB_URI is not defined in environmental variables");
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
};
