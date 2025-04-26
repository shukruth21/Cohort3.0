const express = require('express')
const { userRouter } = require('./routes/user')
const { courseRouter } = require('./routes/course')
const { adminRouter } = require('./routes/admin')
const app = express()
require("dotenv").config()
const MONGO_URL = process.env.MONGO_URL
const mongoose = require('mongoose')

app.use('/api/v1/user',userRouter)
app.use('/api/v1/course',courseRouter)
app.use('/api/v1/admin',adminRouter)
// this step is to ensure that the server starts only when the db is connected 
async function main() {
    await mongoose.connect(`${MONGO_URL}`)
    app.listen(3000)
    console.log("listening on port 3000")
}

main()