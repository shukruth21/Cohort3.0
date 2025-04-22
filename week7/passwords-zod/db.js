require("dotenv").config();
const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(`${MONGO_URL}`);

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  name: String,
});

const TodoSchema = mongoose.Schema({
  title: String,
  done: Boolean,
  userId: ObjectId,
});

const UserModel = mongoose.model("users", UserSchema);
const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = {
  UserModel,
  TodoModel,
};
