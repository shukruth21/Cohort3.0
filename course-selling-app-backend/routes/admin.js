const { Router } = require('express')
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_ADMIN_SECRET
const adminRouter= Router()
const { AdminModel,CourseModel} =require("../db")
const { adminMiddleware } = require('../middleware/admin')
adminRouter.post('/signup',async(req,res)=>{
    const reqBody= z.object({
        email: z.string().min(3).max(50).email(),
        password: z
            .string()
            .min(6)
            .refine((password) => /[A-Z]/.test(password), {
             message: "Required atleast one uppercase character",
            })
            .refine((password) => /[a-z]/.test(password), {
              message: "Required atleast one lowercase character",
            })
            .refine((password) => /[0-9]/.test(password), {
               message: "Required atleast one number",
            })
            .refine((password) => /[!@#$%^&*]/.test(password), {
               message: "Required atleast one special character",
            }),
        firstname: z.string().min(3).max(30),
        lastname: z.string().min(3).max(30)
    })
    const parsedData= reqBody.safeParse(req.body)
    if (!parsedData.success) {
        res.json({
          message: "Incorrect format",
          error: parsedData.error.issues[0].message,
        });
        return;
    }
    try {
        const email = req.body.email;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newAdmin = new AdminModel({
          email: email,
          password: hashedPassword,
          firstname: firstname,
          lastname: lastname
        });
    
        // console.log(hashedPassword);
        await newAdmin.save();
    
        res.json({ message: "Signed Up!" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error signing up user" });
      }
})

adminRouter.post('/signin',async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
    
        const findAdmin = await AdminModel.findOne({
          email: email,
        });
    
        if (!findAdmin) {
          return res.status(403).json({ message: "Invalid credentials" });
        }
    
        const isPasswordValid = await bcrypt.compare(password, findAdmin.password);
    
        if (isPasswordValid) {
          const token = jwt.sign({ id: findAdmin._id.toString() }, JWT_SECRET);
          res.json({ token: token });
        } else {
          res.status(403).json({ message: "Invalid credentials" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error signing in user" });
      }
})

adminRouter.post('/course',adminMiddleware,async(req,res)=>{
    const adminId = req.userId
    const {title,description,imageUrl,price}= req.body
    const course = await CourseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })
    res.json({
        message: "course created",
        courseId: course._id
    })
})

adminRouter.put('/course',adminMiddleware,async(req,res)=>{
    const adminId = req.userId
    const {title,description,imageUrl,price,courseId}= req.body
    const course = await CourseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        
    })
    res.json({
        message: "course updated",
        courseId: course._id
    })
})

adminRouter.get('/course/bulk',adminMiddleware,async(req,res)=>{
    const adminId = req.userId
    const course = await CourseModel.find({
        creatorId: adminId
    })
    res.json({
        message: " course created by this admin",
        courses: course
    })
})

module.exports = {
    adminRouter: adminRouter
}