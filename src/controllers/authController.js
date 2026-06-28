const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
try {
const {
full_name,
email,
phone_number,
password,
college_name,
course,
branch,
passing_year,
} = req.body;


const existingUser = await User.findUserByEmail(email);

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "Email already exists",
  });
}

const password_hash = await bcrypt.hash(password, 10);

const user = await User.createUser([
  full_name,
  email,
  phone_number,
  password_hash,
  college_name,
  course,
  branch,
  passing_year,
]);

return res.status(201).json({
  success: true,
  message: "Signup successful",
  user,
});


} catch (error) {
console.error("Signup Error:", error);


return res.status(500).json({
  success: false,
  message: "Server error",
  error: error.message,
});


}
};

exports.login = async (req, res) => {
try {
const { email, password } = req.body;

if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: "Email and password are required",
  });
}

const user = await User.findUserByEmail(email);

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
}

const isPasswordMatch = await bcrypt.compare(
  password,
  user.password_hash
);

if (!isPasswordMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
}

const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

return res.status(200).json({
  success: true,
  message: "Login successful",
  token,
  user: {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    phone_number: user.phone_number,
  },
});

} catch (error) {
console.error("Login Error:", error);

return res.status(500).json({
  success: false,
  message: "Server error during login",
  error: error.message,
});
}
};
