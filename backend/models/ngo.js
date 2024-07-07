const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema for Physical Address
const addressSchema = new mongoose.Schema({
  address_line_1: { type: String, required: true },
  address_line_2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip_code: { type: String, required: true },
  country: { type: String, required: true },
  geo_location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
});

// Schema for Contact Information
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneno: { type: String, required: true, unique : true},
});

const contactSchema2 = new mongoose.Schema({
  name: { type: String},
  email: { type: String },
  phoneno: { type: String },
});

// Main NGO Registration Schema
const ngoSchema = new mongoose.Schema({
  organization_name: { type: String, required: true },
  registration_number: { type: String, required: true },
  tax_id_ein: { type: String, required: true },
  website_url: { type: String },
  physical_addresses: addressSchema,
  primary_contact: { type: contactSchema, required: true },
  password : {type : String , required : true},
  secondary_contact: contactSchema2,
  registration_certificate: { type: String, required: true },
  tax_exemption_certificate: { type: String, required: true },
  recent_annual_report: { type: String },
  ngo_photos : { type : [String] , required : true},
});

// Password hashing middleware
ngoSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Password hashing middleware for update
ngoSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }
  next();
});

// Method to compare password
ngoSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the model
const NGO = mongoose.model("NGO", ngoSchema);
const Unverified_NGOs = mongoose.model(
  "Unverified_NGOs",
  ngoSchema,
);

module.exports = {NGO , Unverified_NGOs};
