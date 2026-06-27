const bcrypt = require("bcrypt");

const User = require("../models/userModel");



exports.signup = async(req,res)=>{
try{
const {
full_name,
email,
phone_number,
password,
college_name,
course,
branch,
passing_year


}=req.body;



// check existing user

const existingUser = await User.findUserByEmail(email);



if(existingUser){

return res.status(400).json({

message:"Email already exists"

});

}


// encrypt password

const password_hash = await bcrypt.hash(password,10);



// save user

const user = await User.createUser([
full_name,

email,

phone_number,

password_hash,

college_name,

course,

branch,

passing_year


]);



res.status(201).json({

message:"Signup successful",

user:user


});



}

catch(error){


res.status(500).json({

message:"Server error",

error:error.message

});


}


};