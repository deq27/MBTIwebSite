const express = require("express");
const router = express.Router();
const mainLayoutLI = "../views/layouts/Login-main.ejs";
const mainLayoutLO = "../views/layouts/Logout-main.ejs";
const Category = require("../models/Category");
const asynchandler = require("express-async-handler");

router.get(
    "/post/:id",
    asynchandler(async (req, res) => {
        const data = await Category.findOne({ _id: req.params.id });
        const locals = {
            title: `mbti ${data.category}`,
          };
        const NF = await Category.find({ category: { $in: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] } });
        const SJ = await Category.find({ category: { $in: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] } });
        const NT = await Category.find({ category: { $in: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] } });
        const SP = await Category.find({ category: { $in: ['ISTP', 'ISFP', 'ESTJ', 'ESFP'] } });
        res.render("post", { locals,data,NF,SJ,NT,SP, layout: mainLayoutLO });
    })
);
router.get(
    ["/", "/home/Login"],
    asynchandler(async (req, res) => {
         const locals = {
            title: "MBTI",
        };
        res.render("center", { locals, layout: mainLayoutLI });
    })
);
router.get(
    ["/", "/home/Logout"],
    asynchandler(async (req, res) => {
         const locals = {
            title: "MBTI",
        };
    const NF = await Category.find({ category: { $in: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] } });
    const SJ = await Category.find({ category: { $in: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] } });
    const NT = await Category.find({ category: { $in: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] } });
    const SP = await Category.find({ category: { $in: ['ISTP', 'ISFP', 'ESTJ', 'ESFP'] } });
        res.render("center", { locals, NF,SJ,NT,SP, layout: mainLayoutLO });
    })
);
// router.get("/", (req, res) => {
//     res.render("index", { title: "오후의 블로그" });
// });


module.exports = router;

//main.js
