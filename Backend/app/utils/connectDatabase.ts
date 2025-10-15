import mongoose from "mongoose";

const connectDB = async () => {
  return mongoose
    .connect(process.env.DB_LINK as string)
    .then(() => {
      console.log("Database connected successfully...");
    })
    .catch((error) => {
      console.log("Error in connecting to database! ", error.message);
      throw error;
    });
};

export { connectDB };