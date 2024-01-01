const mongoose = require("mongoose");

// for Hash Password
const bcrypt = require("bcrypt");
const salt = 12;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
