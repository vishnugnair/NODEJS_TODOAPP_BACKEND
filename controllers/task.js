import ErrorHandler from "../middlewares/error.js";
import { task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await task.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  //tasks of a particular user is beig fetched.
  try {
    const userid = req.user._id;
    const tasks = await task.find({ user: userid });
    res.status(201).json({
      success: true,
      tasks: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tsk = await task.findById(id);
    if (!tsk) {
      return next(new ErrorHandler("task not found", 404));
    }
    tsk.isCompleted = !tsk.isCompleted;
    await tsk.save();
    res.status(200).json({
      success: true,
      message: "task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tsk = await task.findById(id);
    if (!tsk) {
      return next(new ErrorHandler("task not found", 404));
    }
    await tsk.deleteOne();
    res.status(200).json({
      success: true,
      message: "task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
