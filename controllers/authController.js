// authController.js
import User from "../models/UserModel.js";
import Profile from "../models/ProfileModel.js";
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
      expiresIn: "1h"
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

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await bcryptjs.compare(req.body.password, user.password);

    if (!match) return res.status(400).json({ msg: "Password wrong" });

    const { accessToken, refreshToken } = generateTokens(user);
    const role = user.role;

    res.json({ accessToken, refreshToken, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const Me = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.userId, // Gunakan uuid sebagai pengenal pengguna
      },
      attributes: ["uuid", "username", "email", "role"], // Sesuaikan dengan atribut yang ada di model
    });

    let profile;
    if (req.role === "user") {
      profile = await Profile.findOne({
        where: {
          userId: user.uuid,
        },
      });
    }

    const responseAll = {
      user,
      profile: profile,
    };
    res.status(200).json(responseAll);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error"
    });
  }
};
