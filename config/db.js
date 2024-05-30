const mongoose = require("mongoose");

const asynchandler = require("express-async-handler");
require("dotenv").config(); 

const connectDb = asynchandler(async () => {
    const connect = await 
        mongoose.connect(process.env.MONGODB_URI);
         console.log(`DB connectd: ${connect.connection.host}이 연결되었습니다`); 
});

module.exports = connectDb;