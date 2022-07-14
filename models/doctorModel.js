const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    price: { type: String, trim: true, required: true },
    specialize: { type: String, trim: true, required: true },
    about: { type: String, trim: true, required: true },
    city_id: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  });

  module.exports = mongoose.model("Doctor", DoctorSchema);