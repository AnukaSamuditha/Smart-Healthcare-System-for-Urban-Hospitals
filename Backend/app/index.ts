import { connectDB } from "#utils/connectDatabase.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from '#routes/userRoutes.js';
import patientRoute from "#routes/patientRoute.js";
import managementRoute from "#routes/managementRoute.js";
const port = process.env.PORT ?? 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_PREFIX,
    credentials: true,
  }),
);



app.use("/users",userRoutes);
app.use("/patient",patientRoute);
app.use("/management",managementRoute);


await connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}...`);
    });
  })
  .catch((error) => {
    console.log(
      "Error occurred in connecting to the database! ",
      error.message,
    );
  });