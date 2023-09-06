import { user } from "../models/user.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Please login first",
    });
  }
  const decodedid = jwt.verify(token, process.env.JWT_SECRET); // bcs the token is set as the database id.
  req.user = await user.findById(decodedid._id);
  next();
};
