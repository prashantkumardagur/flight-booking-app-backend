const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { respondSuccess, respondError } = require('./utils/responders');

// =====================================================================================


// Admin Login
module.exports.adminLogin = async (req, res) => {
  const { password } = req.body;
  // Check if the password is correct
  if(password !== process.env.ADMIN_PASSWORD) return respondError(res, 'Incorrect password', 401);

  // Create a JWT token
  const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });

  // Send the token to the client
  respondSuccess(res, 'Admin logged in successfully', token);
}


// Register a new user
module.exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if(existingUser) return respondError(res, 'User already exists', 400);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user
  const user = new User({name, email, phone, password: hashedPassword});

  // Save the user to the database
  try {
    await user.save();
    respondSuccess(res, 'User registered successfully');
  } catch (err) {
    respondError(res, 'Error registering user', 500);
  }
}


// User login
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({email});
  if(!user) return respondError(res, 'User does not exist', 400);

  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if(!isPasswordCorrect) return respondError(res, 'Invalid credentials', 400);

  // Create a JWT token
  user.password = undefined;
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '7d' });

  // Send the token to the client
  respondSuccess(res, 'User logged in successfully', { token, user });
}


// Refresh the JWT token
module.exports.refreshToken = async (req, res) => {
  const { user, isAdmin } = req;

  // Create a new JWT token
  const newToken = jwt.sign({ user, isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });

  respondSuccess(res, 'Token refreshed successfully', newToken);
}


// Change the user password
module.exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(req.user._id);
    if(!user) return respondError(res, 'User does not exist', 400);

    // Check if the old password is correct
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if(!isPasswordCorrect) return respondError(res, 'Invalid credentials', 400);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user password
    user.password = hashedPassword;

    await user.save();
    respondSuccess(res, 'Password changed successfully');
  } catch (err) {
    respondError(res, 'Error changing password', 500);
  }
}