// Import model 'Users' dari file 'users.js' yang berada dalam folder 'models'
import Users from "../models/users.js";

// Import modul argon2d untuk pengamanan password
import argon2d from "argon2";

// Fungsi untuk mendapatkan semua pengguna (users)
export const getUsers = async (req, res) => {
  try {
    // Mengambil semua data pengguna dari tabel 'Users' dengan atribut tertentu
    const response = await Users.findAll({
      attributes: ['uuid', 'name', 'email', 'role']
    });
    // Mengirimkan respons berupa data pengguna dalam format JSON
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan respons status 500 beserta pesan kesalahan jika terjadi kesalahan dalam pengambilan data
    res.status(500).json({
      msg: error.message
    });
  }
}

// Fungsi untuk mendapatkan pengguna (user) berdasarkan ID tertentu
export const getUsersById = async (req, res) => {
  try {
    // Mengambil data pengguna dengan ID yang sesuai dengan yang diberikan dalam permintaan
    const response = await Users.findOne({
      attributes: ['uuid', 'name', 'email', 'role'],
      where: {
        uuid: req.params.id
      }
    });
    // Mengirimkan respons berupa data pengguna dalam format JSON
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan respons status 500 beserta pesan kesalahan jika terjadi kesalahan dalam pengambilan data
    res.status(500).json({
      msg: error.message
    });
  }
}

// Fungsi untuk membuat pengguna baru
export const createUsers = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  // Memeriksa apakah password dan konfirmasi password cocok
  if (password !== confPassword) return res.status(400).json({ msg: "Password and Password confirmation do not match"});
  // Melakukan hashing (pengamanan) terhadap password menggunakan argon2d
  const hashPassword = await argon2d.hash(password);
  try {
    // Menyimpan data pengguna baru ke dalam database
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role
    })
    // Mengirimkan respons status 201 (Created) jika pengguna berhasil dibuat
    res.status(201).json({ msg: "Register Successfully" });
  } catch (error) {
    // Mengirimkan respons status 400 beserta pesan kesalahan jika terjadi kesalahan dalam pembuatan pengguna
    res.status(400).json({ msg: error.message });
  }
}

// Fungsi untuk memperbarui data pengguna
export const updateUsers = async (req, res) => {
  // Mengambil data pengguna berdasarkan ID yang diberikan dalam permintaan
  const users = await Users.findOne({
    where: {
      uuid: req.params.id
    }
  });
  // Memeriksa apakah pengguna ditemukan
  if (!users) return res.status(404).json({ msg: "User not found" });
  const { name, email, password, confPassword, role } = req.body;
  let hashPassword;
  // Memeriksa apakah password baru telah diberikan
  if (password === "" || password === null) {
    hashPassword = users.password
  } else {
    // Melakukan hashing (pengamanan) terhadap password baru menggunakan argon2d
    hashPassword = await argon2d.hash(password);
  }
  // Memeriksa apakah password dan konfirmasi password cocok
  if (password !== confPassword) return res.status(400).json({ msg: "Password and Password confirmation do not match" });
  try {
    // Memperbarui data pengguna dalam database
    await Users.update({
      name: name,
      email: email,
      password: hashPassword,
      role: role
    }, {
      where: {
        id: users.id
      }
    });
    // Mengirimkan respons status 200 (OK) jika data pengguna berhasil diperbarui
    res.status(200).json({ msg: "User updated" });
  } catch (error) {
    // Mengirimkan respons status 400 beserta pesan kesalahan jika terjadi kesalahan dalam pembaruan data pengguna
    res.status(400).json({ msg: error.message });
  }
}

// Fungsi untuk menghapus data pengguna
export const deleteUsers = async (req, res) => {
  // Mengambil data pengguna berdasarkan ID yang diberikan dalam permintaan
  const users = await Users.findOne({
    where: {
      uuid: req.params.id
    }
  });
  // Memeriksa apakah pengguna ditemukan
  if (!users) return res.status(404).json({ msg: "User not found" });
  try {
    // Menghapus data pengguna dari database
    await Users.destroy({
      where: {
        id: users.id
      }
    });
    // Mengirimkan respons status 200 (OK) jika data pengguna berhasil dihapus
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    // Mengirimkan respons status 400 beserta pesan kesalahan jika terjadi kesalahan dalam penghapusan data pengguna
    res.status(400).json({ msg: error.message });
  }
}
