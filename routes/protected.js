exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin){
        next()
    }
    else {
        res.status(401).json({msg: "You are not an Admin"})
    }
}