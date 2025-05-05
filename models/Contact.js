const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  contactName: String,
  phone: Number,
  email: String,
  tag: String,
  lastContacted: Date,
});
module.exports = mongoose.model("Contact", contactSchema);
