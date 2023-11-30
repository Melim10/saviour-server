const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    name:{
      type: String, required:true, 
      unique: true
    },
    skills:{
      type:[String]
    },
    picture:{
      type: String,
      default:"https://cdn1.iconfinder.com/data/icons/user-interface-664/24/User-512.png"
    }
  }
);

const User = model("User", userSchema);

module.exports = User;
