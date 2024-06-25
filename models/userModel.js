
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  familyName: { type: String, required: true, maxLength: 100 },
  username: {type: String, required: true},
  password: {type: String, required: true},
  status: {type: Boolean, required: true},
  isAdmin: {type: Boolean, required: true},
});

// Virtual for users full name
UserSchema.virtual("fullName").get(function () {
  // To avoid errors in cases where an user does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.firstName && this.familyName) {
    fullname = `${this.familyName}, ${this.firstName}`;
  }

  return fullname;
});

// Virtual for author's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);
