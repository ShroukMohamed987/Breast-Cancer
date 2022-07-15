const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const DoctorModel = require('../models/doctorModel');
const { uploadSingleImage } = require('../middleware/uploadImageMiddleware');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const getAllDoctor=async(req,res)=>{
    const allDoc=await DoctorModel.find()
    if(!allDoc) return res.status(500).json({msg:"Not Patient Found"})
    res.status(200).json(
      {
          status:"Success",
          count:allDoc.length,
          allDoc
        
        })
  }


  const registerDoctor = async (req, res) => {
    try {
        const {name,email,password,
          phone,address,price,
          specialize,about,city_id
        }=req.body;
        //check if user Already exist in DB or not
       const user = await DoctorModel.findOne({ email});
       //return this message if user exist in db
  if (user) return res.status(400).json({ msg: "This user Already Exist" });
  //check length of password
  if (password.length < 6)
    return res.status(400).json({ msg: "Password must be More Than 5" });

    // ecrypt password
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new DoctorModel({
    name,email,
    phone,address,price,
    specialize,about,city_id,
    password: passwordHash,
          
  });
  const accesstoken = createAccessToken({ id: newUser._id })
  //To Save In DB U Can USed Create But this is anthor way
  await newUser.save();
        res.status(200).send({
            apiStatus: true,
            msg: "New patient added successfully",
            data: newUser,
            accesstoken
        });
    }
    catch (error) {
      return res.status(500).json({ msg: error.message });
    }
}

//  //login
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await DoctorModel.findOne({ email });
      if (!user) return res.status(500).json({ msg: "Enter Valid Email" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(500).json({ msg: "Incoorect Password" });
      //if login success create access Token And Refresh Token
      // create JWT For Authentication
      const accesstoken = createAccessToken({ id: user._id });
      res.status(200).json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

    //forget password
const forgetPassword = async (req, res) => {
    try{
     const { email } = req.body;
     const doctor = await DoctorModel.findOne({ email });
     if (!doctor) return res.status(400).json({ msg: "doctor Not Found" ,dir:0});
     res.status(200).json({ msg: 'Success! Go to Reset Password',dir:1 })
    }catch(error){
     return res.status(500).json({ msg: error.message });
   
    }
   };

//reset password
const resetPassword = async (req, res) => {
    const { newPassword, confirmPassword, email} = req.body;
    if (!newPassword || !confirmPassword ) {
      res.status(400).json({msg: 'confirm didnot match new password'})
    }
    const patient = await DoctorModel.findOne({ email  });
  if(!patient) return res.status(500).json({msg:"not fount this email"})
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password Must be Match ConfirmPassword" });
    }
    const passwordHash = await bcrypt.hash(req.body.newPassword, 10);
    patient.password = passwordHash;
    await patient.save();
    res.status(200).json({msg: 'password reset success'})
  };

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "11m" });
  };

  const uploadCategoryImage = uploadSingleImage('image');

  // Image processing
  const resizeImage = async (req, res, next) => {
    const filename = `doctor-${uuidv4()}-${Date.now()}.jpeg`;
  
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads${filename}`);
  
    // Save image into our db
    req.body.image = filename;
  
    next();
  };


  module.exports= {
    registerDoctor,
    getAllDoctor,
    login,
    forgetPassword,
    resetPassword,
    uploadCategoryImage,resizeImage
  }