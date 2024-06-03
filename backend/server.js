const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors=require("cors")
const mainRoute = require("./routes/index.js");
const port = 3000;
const clientDomain = process.env.CLIENT_DOMAIN;
const origin = [clientDomain];

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use(express.json());
app.use(cors({origin, credentials: true}));

app.use("/api", mainRoute);

app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
