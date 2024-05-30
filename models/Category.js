const mongoose = require("mongoose");

// 스키마 정의
const CategorySchema = new mongoose.Schema({
  // 게시물 제목
  category: {
    type: String,
    required: true,
  },

  // 게시물 내용
  value1: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value2: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value3: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value4: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value5: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value6: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value7: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value8: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value9: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value10: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value11: {
    type: String,
    required: true,
  },
  // 게시물 내용
  value12: {
    type: String,
    // required: true,
  },
  // 게시물 내용
  value13: {
    type: String,
    // required: true,
  },
  // 게시물 내용
  value14: {
    type: String,
    // required: true,
  },
  // 게시물 내용
  value15: {
    type: String,
    // required: true,
  },
  // 게시물 내용
  value16: {
    type: String,
    // required: true,
  },
  //궁합
  communication: {
    type: String,
    // required: true,
  },
  //연애성향
  romantic: {
    type: String,
    // required: true,
  },
  //생성시간
  createdate: {
    type: Date,
    default: Date.now(),
},
});

module.exports = mongoose.model("Category", CategorySchema);
