const mongoose = require("mongoose");

const APPLICATION_STATUSES = [
  "Bookmarked",
  "Applied",
  "Phone Screen",
  "Technical Interview",
  "Final Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
  "Ghosted",
];

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: "Bookmarked",
      index: true,
    },
    jobUrl: {
      type: String,
      trim: true,
      default: "",
    },
    jobDescription: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    workType: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site", ""],
      default: "",
    },
    salaryMin: { type: Number, default: null },
    salaryMax: { type: Number, default: null },
    salaryCurrency: { type: String, default: "USD" },
    appliedDate: {
      type: Date,
      default: null,
    },
    deadlineDate: {
      type: Date,
      default: null,
    },
    source: {
      type: String,
      enum: ["LinkedIn", "Indeed", "Company Website", "Referral", "AngelList", "Glassdoor", "Other", ""],
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    coverLetterUrl: {
      type: String,
      default: "",
    },
    resumeVersion: {
      type: String,
      default: "",
    },
    aiGeneratedCoverLetter: {
      type: String,
      default: "",
    },
    aiResumeScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    aiMatchScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    tags: [{ type: String, trim: true }],
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  },
  { timestamps: true }
);

// Indexes for common queries
applicationSchema.index({ user: 1, status: 1 });
applicationSchema.index({ user: 1, createdAt: -1 });
applicationSchema.index({ user: 1, company: 1 });

module.exports = mongoose.model("Application", applicationSchema);
