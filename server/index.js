const express = require("express");
const cors = require("cors");
const http = require("http");
const userDataRoutes = require("./routes/data/userData");


const connectToDatabase = require("./db/db");
const authRoutes = require("./routes/auth/auth");
const verifyToken = require("./routes/middlewares/tokenVerification");
const bodyParser = require('body-parser')


const PORT = process.env.PORT || 8000;
require('dotenv').config();



const app = express();


app.use(cors());

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  

connectToDatabase(process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD);



app.use("/auth", authRoutes);
app.use("/users", userDataRoutes);


app.post("/verifyToken", verifyToken, (req, res) => {
    res.status(200).json({ message: "Token is valid" });
});




app.listen(PORT, () =>
    console.log(`Server is listening on port: ${PORT}`)
);






