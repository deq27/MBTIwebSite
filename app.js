require("dotenv").config(); 
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const adminRoutes = require('./routes/admin'); // 실제 경로로 수정

const app = express();
const port = process.env.PORT || 3000; 

connectDb();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layouts/main"); 

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(cookieParser());

// 정적파일인식 미들웨어
app.use(express.static(path.join(__dirname, 'static')));

app.use("/", require("./routes/main"));
app.use("/", require("./routes/admin"));

app.use('/', adminRoutes); // 라우트 설정
app.listen(port, () => {
   console.log(`app 실행. ${port}번 포트가 실행되고 있습니다`);
});

// app.js
