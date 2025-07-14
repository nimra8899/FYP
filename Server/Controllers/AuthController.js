// controllers/AuthController.js
import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// REGISTER new user
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "This email is already registered!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password.toString(), salt);
    req.body.password = hashedPass;

    const newUser = new UserModel(req.body);
    const user = await newUser.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const validity = await bcrypt.compare(password, user.password);
    if (!validity) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
