const express = require("express");
const router = express.Router();
const adminLayoutLO = "../views/layouts/Logout-main";
const cancelLayoutLO = "../views/admin/cancel";
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Category = require("../models/Category");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const logins = "../views/admin/login";
const registers = "../views/admin/register";

// 로그인확인

const checkLogin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect("/admin");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userid = decoded.userid;
    next();
  } catch (error) {
    res.redirect("/admin");
  }
};

// 로그인화면 페이지

router.get("/login", (req, res) => {
  const locals = {
    title: "로그인 페이지",
  };

  res.render("admin/login", { locals, layout: logins });
});

// 로그인 화면확인
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { userid, password } = req.body;
    const user = await User.findOne({ userid });
    if (!user) {
      // return res.status(401).json({ message: "일치하는 사용자가 없습니다." });
      return res.status(401).send('<script>alert("일치하는 사용자가 없습니다."); window.location.href="/login";</script>');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      // return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
      return res.status(401).send('<script>alert("비밀번호가 일치하지 않습니다."); window.location.href="/login";</script>');
    }

    const token = jwt.sign({ id: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.send('<script>alert("로그인 되셨습니다."); window.location.href="/home/logout";</script>');
    // res.redirect("/home/Logout");
  })
);

//회원가입 페이지
router.get(
  "/register",
  asyncHandler(async (req, res) => {
    res.render("admin/register", { layout: registers });
  })
);
//회원가입 연결
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, password, userid, phone, email } = req.body;

    // 입력 값 검증
    if (!name || !password || !userid || !phone || !email) {
      res.send('<script>alert("모든 필드를 입력해야 합니다."); window.location.href="/register";</script>');
      // return res.status(400).json({ message: "모든 필드를 입력해야 합니다." });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // 새로운 사용자 생성
      const user = await User.create({
        name,
        password: hashedPassword,
        userid,
        phone,
        email,
      });
    // res.redirect("/home/Login");
    res.send('<script>alert("회원가입 되셨습니다."); window.location.href="/home/login";</script>');

    } catch (error) {
      if (error.code === 11000) {
        // 중복 키 오류 처리
        // return res.status(400).json({ message: `userid 가 이미 존재합니다.` });
        res.status(400).send('<script>alert("해당 아이디가 이미 존재합니다."); window.location.href="/register";</script>');
      }
      // res.status(500).json({ message: "사용자 생성 중 오류가 발생했습니다.", error });
      res.status(500).send('<script>alert("사용자 생성 중 오류가 발생했습니다.",errorr); window.location.href="/register";</script>');
    }
  })
);

//로그인 후 추가화면 추가,수정,삭제화면
router.get(
  "/allPosts",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "전체 게시물",
    };
    const data = await Category.find();
    const NF = await Category.find({ category: { $in: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] } });
    const SJ = await Category.find({ category: { $in: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] } });
    const NT = await Category.find({ category: { $in: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] } });
    const SP = await Category.find({ category: { $in: ['ISTP', 'ISFP', 'ESTJ', 'ESFP'] } });
    res.render("admin/allPosts", {
      locals,
      data,
      NF,SJ,NT,SP,
      layout: adminLayoutLO,
    })
  })
);

//로그아웃확인
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  // res.redirect("/");
  res.send('<script>alert("로그아웃 되셨습니다."); window.location.href="/home/login";</script>');
});

//게시물 추가 페이지
router.get(
  "/add",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = { title: "게시물 작성" };
    const NF = await Category.find({ category: { $in: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] } });
    const SJ = await Category.find({ category: { $in: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] } });
    const NT = await Category.find({ category: { $in: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] } });
    const SP = await Category.find({ category: { $in: ['ISTP', 'ISFP', 'ESTJ', 'ESFP'] } });
    res.render("admin/add", {
      locals,
      NF,SJ,NT,SP,
      layout: adminLayoutLO,
    });
  })
);

//게시물 추가 등록
router.post(
  "/add",
  checkLogin,
  asyncHandler(async (req, res) => {
    const {
      category,
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      value7,
      value8,
      value9,
      value10,
      value11,
      value12,
      value13,
      value14,
      value15,
      value16,
      communication,
      romantic,
    } = req.body;
    const newCategory = new Category({
      category: category,
      value1: value1,
      value2: value2,
      value3: value3,
      value4: value4,
      value5: value5,
      value6: value6,
      value7: value7,
      value8: value8,
      value9: value9,
      value10: value10,
      value11: value11,
      value12: value12,
      value13: value13,
      value14: value14,
      value15: value15,
      value16: value16,
      communication: communication,
      romantic: romantic,
    });
    await Category.create(newCategory);
    res.redirect("/allPosts");
  })
);

//게시물 편집 페이지
router.get(
  "/edit/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    
    const data = await Category.findOne({ _id: req.params.id });
    const locals = `${ data.category  }`;
    const NF = await Category.find({ category: { $in: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] } });
    const SJ = await Category.find({ category: { $in: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] } });
    const NT = await Category.find({ category: { $in: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] } });
    const SP = await Category.find({ category: { $in: ['ISTP', 'ISFP', 'ESTJ', 'ESFP'] } });
    res.render("admin/edit", {
      locals,
      data,
      NF,SJ,NT,SP,
      layout: adminLayoutLO,
    });
  })
);

//게시물 편집 수정
router.put(
  "/edit/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    await Category.findByIdAndUpdate(req.params.id, {
      category: req.body.category,
      value1: req.body.value1,
      value2: req.body.value2,
      value3: req.body.value3,
      value4: req.body.value4,
      value5: req.body.value5,
      value6: req.body.value6,
      value7: req.body.value7,
      value8: req.body.value8,
      value9: req.body.value9,
      value10: req.body.value10,
      value11: req.body.value11,
      value12: req.body.value12,
      value13: req.body.value13,
      value14: req.body.value14,
      value15: req.body.value15,
      value16: req.body.value16,
      communication: req.body.communication,
      romantic: req.body.romantic,
      createdate: Date.now(),
      // title: req.body.title,
      // body: req.body.body,
      // createdAt: Date.now(),
    });
    res.redirect("/allPosts");
  })
);

//게시물 삭제
router.delete(
  "/delete/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    await Category.deleteOne({ _id: req.params.id });
    res.redirect("/allPosts");
  })
);

// 회원 탈퇴 페이지 
router.get(
  "/cancel",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = { title: "mbti 회원탈퇴" };
    res.render("admin/cancel", {locals, layout: cancelLayoutLO });
  })
);
  
// 회원 탈퇴 처리
router.post(
  "/cancel",
  checkLogin,
  asyncHandler(async (req, res) => {
    const { userid, password } = req.body;
    const user = await User.findOne({ userid });

    if (!user) {
      // return res.status(401).json({ message: "일치하는 사용자가 없습니다." });
      return res.status(401).send('<script>alert("일치하는 사용자가 없습니다."); window.location.href="/cancel";</script>');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      // return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
      return res.status(401).send('<script>alert("비밀번호가 일치하지 않습니다."); window.location.href="/cancel";</script>');
    }

    // 사용자 삭제
    await User.deleteOne({ _id: user._id });

    // 추가적으로 사용자가 작성한 게시물 등 관련 데이터 삭제 (선택 사항)
    //await Category.deleteMany({ userId: user._id });

    // 로그아웃 처리
    res.clearCookie("token");

    // 성공 메시지 반환 후 메인 페이지로 이동
    res.send('<script>alert("회원탈퇴가 성공적으로 처리되었습니다."); window.location.href="/home/Login";</script>');
    
    //res.redirect("/home/Login");
  })
);

module.exports = router;
