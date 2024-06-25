const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  date: {type: Date, required: true},
  user: {type: Schema.Types.ObjectId, ref: "User", required: true}
});



// Virtual for post's URL
PostSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `//post/${this._id}`;
});

// Virtual for post's formatted date
PostSchema.virtual("date_formatted").get(function () {
    return this.date
    ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED)
    : "";
  });

// Export model
module.exports = mongoose.model("Post", PostSchema);