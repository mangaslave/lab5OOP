import { Request, Response } from "express";
import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

// function isAdmin(id: any) {
//   let user = getUserById(id)
//   let role = user.role;
//   if (role === "admin") {
//     return user;
//   }
// }

export {
  getUserByEmailIdAndPassword,
  getUserById,
  // isAdmin,
};
