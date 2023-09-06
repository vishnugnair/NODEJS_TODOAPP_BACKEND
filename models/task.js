import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, //user acts like a foreign key here.
    ref: "User", //ref bcs the type is a foreign key.
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const task = mongoose.model("Task", schema);
