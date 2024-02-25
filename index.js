const express = require("express");
const mongoose = require("mongoose");

//to support cross orign resource sharing
const cors = require("cors");

//to use environment variables here
require("dotenv").config();

//importing the authentication middleware to protect the routes
const authenticateToken = require("./middleware/authenticate");

//use express
const app = express();
app.use(express.json());

//setting up middleware to handle cross orign requests or requests from other sites - CORS
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to mongo db"))
  .catch((error) => console.log("error connecting to mongoDb"));

//importing the routers for api-1
const authRouter = require("./routes/api-1/auth/authRouter");
const userRouter = require("./routes/api-1/user/userRouter");
const likeRouter = require("./routes/api-1/likes/likeRouter");

//routing for api-1
app.use("/auth", authRouter);
app.use("/user", authenticateToken, userRouter);
app.use("/like", likeRouter);

//importing routers for api-2
const jobRouter = require("./routes/api-2/Jobs/jobRouter");

//routing for api-2
app.use("/job", jobRouter);

//port where server is running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
