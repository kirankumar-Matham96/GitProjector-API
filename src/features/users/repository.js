import bcrypt from "bcrypt";
import { userModel } from "./schema.js";
import { encrypt } from "../../middlewares/encrypt.middleware.js";
import { CustomError } from "../../utils/customError.js";

class UserRepository {
  addUser = async (user) => {
    try {
      // password encryption
      user.password = await encrypt(user.password);
      const newUser = await userModel(user);
      const userCreated = await newUser.save();
      const userData = {
        id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        subscribed: userCreated.createdAt,
        updated: userCreated.updatedAt,
      };
      return userData;
    } catch (error) {
      throw error;
    }
  };

  signIn = async ({ email, password }) => {
    try {
      email, password;

      const userFound = await userModel.findOne({ email });

      if (!userFound) {
        throw new CustomError("User not found", 404);
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        userFound.password
      );

      if (!isPasswordMatch) {
        throw new CustomError("Invalid credentials", 403);
      }

      const userData = {
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        subscribed: userFound.registeredOn,
        updated: userFound.updatedOn,
      };
      return userData;
    } catch (error) {
      throw error;
    }
  };

  getUser = async (userId) => {
    try {
      const user = await userModel.findById(userId);

      const userData = {
        id: userId,
        name: user.name,
        email: user.email,
        subscribedOn: user.registeredOn,
        updatedOn: user.updatedOn,
      };

      return userData;
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (userId, userData) => {
    try {
      // password encryption
      userData.password = await encrypt(userData.password);
      const user = await userModel.findByIdAndUpdate(userId, userData, {
        new: true,
      });

      const updatedUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        registeredOn: user.registeredOn,
        updatedOn: user.updatedOn,
      };

      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (userId) => {
    try {
      const user = await userModel.findByIdAndDelete(userId);
      if (!user) {
        throw new CustomError("User not found", 404);
      }

      return user;
    } catch (error) {
      throw error;
    }
  };
}

export default new UserRepository();
