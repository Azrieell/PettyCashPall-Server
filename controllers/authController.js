// authController.js
import Users from "../models/users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await bcryptjs.compare(req.body.password, user.password);

    if (!match) return res.status(400).json({ msg: "Password wrong" });

    const { accessToken, refreshToken } = generateTokens(user);
    const role = user.role;

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, role });
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).json({ msg: "Internal Server Error" }); // Tanggapan umum untuk kesalahan server
  }
};

export const Me = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.userId,
      },
      attributes: ["id", "uuid", "username", "email", "role"],
    });

    let profile;
    if (req.role === "user") {
      // Pastikan bahwa variabel profile yang digunakan ada di modul yang diimport.
      profile = await profile.findOne({
        where: {
          userId: user.id,
        },
      });      
    }

    const responseAll = {
      user,
      profile: profile,
    };
    res.status(200).json(responseAll);
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).json({ msg: "Internal Server Error" }); // Tanggapan umum untuk kesalahan server
  }
};
