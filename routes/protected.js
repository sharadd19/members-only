exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin){
        next()
    }
    else {
        const err = new Error("You are not an Admin");
        err.status = 401;
        return next(err);
        //res.status(401).json({msg: "You are not an Admin"})
    }
}