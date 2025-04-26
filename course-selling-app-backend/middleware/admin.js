require("dotenv").config();
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET

function adminMiddleware(req,res,next){
    const token = req.headers.token
    const decoded = jwt.verify(token,JWT_ADMIN_SECRET)
    if(decoded){
        req.adminId = decoded.id
        next()
    }else{
        res.status(403).json({
            message: "you are not signed in"
        })
    }

}

module.export = {
    adminMiddleware: adminMiddleware
}