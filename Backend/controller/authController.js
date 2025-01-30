const jwt = require('jsonwebtoken');
const  User = require('../models/user');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: 'User exists, you can login', success: false });
    }
    const newUser = new User({ username, email });
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    await newUser.save();
    res.status(201).json({
      message: 'Sign-up Successful',
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const errMsg = 'Auth failed email or password not found !!';
    if (!user) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );
    res.status(200).json({
      message: 'Login  Successful',
      success: true,
      jwtToken,
      email,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
