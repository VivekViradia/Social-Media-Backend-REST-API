import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";

const app = express();
app.use(express.json())
app.use('/api/user', router)
app.use('/api/blog',blogRouter)


mongoose
  .connect(
    "mongodb+srv://vivekviradia0710:h47YI3rhaU61SVBE@cluster0.srbnksa.mongodb.net/"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Running on Port 5000"))
  .catch((err) => console.log("Error", err));
