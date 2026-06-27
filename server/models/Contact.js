const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Contact name is required"],
      trim: true,
    },
    company: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },
    linkedinUrl: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    relationship: {
      type: String,
      enum: ["Recruiter", "Hiring Manager", "Referral", "Colleague", "Mentor", "Other"],
      default: "Recruiter",
    },
    notes: {
      type: String,
      default: "",
    },
    lastContactedAt: {
      type: Date,
      default: null,
    },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
