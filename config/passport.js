const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel")
const isValidPassword = require("../passwordHelper").isValidPassword;

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await Promise.resolve(isValidPassword(password, user.password));
        //const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
  
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });