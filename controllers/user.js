import { user } from "../models/user.js";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken"; bcs its used in auth.js
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let usr = await user.findOne({ email });
    if (usr) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    usr = await user.create({ name, email, password: hashedpassword });
    sendCookie(usr, res, "registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const usr = await user.findOne({ email }).select("+password"); //bcs password is set as select:false in the schema.
    if (!usr) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isMatch = await bcrypt.compare(password, usr.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
    sendCookie(usr, res, `welcome back, ${usr.name}`, 201);
  } catch (error) {
    next(error);
  }
};
export const getMyDetails = (req, res) => {
  res.status(200).json({
    success: true,
    usr: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develeopment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develeopment" ? false : true,
    })
    .json({
      success: true,
      message: "logged out",
    });
};
