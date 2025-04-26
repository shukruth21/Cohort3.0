const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const UserSchema = new Schema({
    email: {type: String , unique: true},
    password: String,
    firstname: String,
    lastname: String
})

const AdminSchema = new Schema({
    email: {type: String , unique: true},
    password: String,
    firstname: String,
    lastname: String
})

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { type: ObjectId, ref:"admin" }//Reference to the admin model

})

const PurchaseSchema = new Schema({
    courseId: { type: ObjectId, ref: "course" }, // Reference to the Course model
    userId: { type: ObjectId, ref: "user" }     // Reference to the User model
})

const UserModel = mongoose.model("user", UserSchema)
const AdminModel = mongoose.model("admin", AdminSchema)
const CourseModel = mongoose.model("course", CourseSchema)
const PurchaseModel = mongoose.model("purchase", PurchaseSchema)

module.export = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}