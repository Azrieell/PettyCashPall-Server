import Users from "../models/users.js";
import Profile from "../models/profiles.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = (users) => {
  const accessToken = jwt.sign(
    {
      userId: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    {
      userId: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
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

    // Jika otentikasi berhasil, buat token akses dan refresh token
    const { accessToken, refreshToken } = generateTokens(user);
    const role = user.role;

    // Simpan refresh token di database
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, role });
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).json({ msg: "Internal Server Error" }); 
    console.log(error.message);
  }
};

export const Me = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.userId,
      },
      attributes: ["id", "uuid", "name", "email", "role"],
    });

    let profile;
    if (req.role === "user") {
      profile = await Profile.findOne({ // Perbaiki penggunaan model Profile di sini
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
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};