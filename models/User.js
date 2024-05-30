const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  createdate: {
    type: Date,
    default: Date.now(),
},
});

const User = mongoose.model('User', userSchema);

// 스키마 적용 후 인덱스 재생성
User.init()
  .then(() => {
    console.log("Indexes ensured.");
  })
  .catch(err => {
    console.error("Error creating indexes:", err);
  });


module.exports = mongoose.model("User", userSchema);
