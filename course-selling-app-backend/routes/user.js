const { Router } = require('express')
const userRouter= Router()
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_USER_SECRET // different from admin password to improve security
//to avoid user to use admin endpoints using his password 
const { UserModel,PurchaseModel,CourseModel } = require('../db')
const { userMiddleware }= require('../middleware/user')

userRouter.post('/signup',async(req,res)=>{
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
        
            const newUser = new UserModel({
              email: email,
              password: hashedPassword,
              firstname: firstname,
              lastname: lastname
            });
        
            // console.log(hashedPassword);
            await newUser.save();
        
            res.json({ message: "Signed Up!" });
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error signing up user" });
          }
})
userRouter.post('/signin',async(req,res)=>{
     try {
            const email = req.body.email;
            const password = req.body.password;
        
            const findUser = await UserModel.findOne({
              email: email,
            });
        
            if (!findUser) {
              return res.status(403).json({ message: "Invalid credentials" });
            }
        
            const isPasswordValid = await bcrypt.compare(password, findUser.password);
        
            if (isPasswordValid) {
              const token = jwt.sign({ id: findUser._id.toString() }, JWT_SECRET);
              res.json({ token: token });
            } else {
              res.status(403).json({ message: "Invalid credentials" });
            }
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error signing in user" });
          }
})
userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const purchases = await PurchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await CourseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}