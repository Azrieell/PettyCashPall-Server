import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['uuid', 'username', 'email', 'role']
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

export const getUsersById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ['uuid', 'username', 'email', 'role'],
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

export const createAdmin = async (req, res) => {
  const { username, email, password, confPassword } = req.body;

  // Pastikan password sesuai dengan konfirmasi password
  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password and Password confirmation do not match" });
  }

  try {
    const hashPassword = await bcryptjs.hash(password || "", 10);
    // Tambahkan pengguna ke dalam basis data
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      role: 'admin'
    });

    // Berikan respons berhasil
    res.status(201).json({
      msg: "User created successfully",
      user: newUser // Kirim kembali pengguna yang baru dibuat
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
}

export const updateUsers = async (req, res) => {
  const { username, email, password, confPassword, role } = req.body;

  try {
    let userData = await User.findOne({
      where: {
        uuid: req.params.id
      }
    });

    if (!userData) return res.status(404).json({ msg: "User not found" });

    // Hash password jika ada perubahan
    let hashPassword = userData.password;
    if (password && password === confPassword) {
      hashPassword = await bcryptjs.hash(password, 10);
    }

    await User.update(
      {
        username: username || userData.username,
        email: email || userData.email,
        password: hashPassword,
        role: role || userData.role
      },
      {
        where: {
          uuid: req.params.id
        }
      }
    );

    res.status(200).json({ msg: "User updated" }); // Hanya kembalikan pesan sukses
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}


export const deleteUsers = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  try {
    await User.destroy({
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
