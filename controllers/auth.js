const { User } = require("../models/users");
const { ctrlWrapper } = require("../helpers/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Email or passwrod is wrong" });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    res.status(401).json({ message: "Email or passwrod is wrong" });
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: email,
      subscription: "starter",
    },
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({
    email,
    subscription: "starter",
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
