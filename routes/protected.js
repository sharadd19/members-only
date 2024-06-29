exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin){
        next()
    }
    else {
        const err = new Error("You are not an Admin");
        err.status = 401;
        return next(err);
    }
}

exports.isMember = (req, res, next) => {
    if (req.user.membership){
        next()
    }
    else {
        const err = new Error("You are not a Member");
        err.status = 401;
        return next(err);
    }
}