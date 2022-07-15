const mongoose = require("mongoose");
const ContactSchema = mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    message: { type: String, trim: true, required: true },

})
module.exports = mongoose.model("ContactUs", ContactSchema);
