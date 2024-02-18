// AuthUser.js
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Tidak ada token, otentikasi gagal' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { uuid: decodedToken.userId } });
    if (!user) {
      return res.status(404).json({ msg: 'User tidak ditemukan' });
    }

    req.userId = user.uuid;
    req.role = user.role;

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ msg: 'Token tidak valid' });
  }
};

export const adminOnly = async (req, res, next) => {
  try {

    if (!req.userId || !req.role) {
      return res.status(401).json({ msg: "Token tidak valid" });
    }

    if (req.role !== "admin") {
      return res.status(403).json({ msg: "Akses terlarang" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Token tidak valid" });
  }
};
