// authController.js
import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = (user) => {
  const accessToken = jwt.sign({
      userId: user.uuid, // Gunakan uuid sebagai pengenal pengguna
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET, {
      expiresIn: "7d"
    }
  );

  const refreshToken = jwt.sign({
      userId: user.uuid,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d"
    }
  );

  return {
    accessToken,
    refreshToken
  };
};

export const registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    confPassword
  } = req.body;

  // Check if password and confirmation password match
  if (password !== confPassword) {
    return res.status(400).json({
      msg: 'Password and confirmation password do not match'
    });
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        msg: 'Email is already registered'
      });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      role: "user",
    });

    // Omit the password from the response
    const newUserWithoutPassword = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      // Add other attributes as needed
    };

    res.status(201).json({
      msg: "Register account successfully",
      newUser: newUserWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(404).json({
      msg: "User not found"
    });

    const match = await bcryptjs.compare(req.body.password, user.password);

    if (!match) return res.status(400).json({
      msg: "Password wrong"
    });

    const {
      accessToken,
      refreshToken
    } = generateTokens(user);
    const role = user.role;

    res.json({
      accessToken,
      role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: error.message
    });
  }
};

export const Me = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId, // Gunakan uuid sebagai pengenal pengguna
      },
      attributes: ["uuid", "username", "email", "role"], // Sesuaikan dengan atribut yang ada di model
    });


    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error"
    });
  }
};