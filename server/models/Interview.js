const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      index: true,
    },
    round: {
      type: String,
      required: [true, "Interview round is required"],
      trim: true, // e.g. "HR Screen", "Technical Round 1", "System Design", "Final"
    },
    type: {
      type: String,
      enum: ["Phone", "Video", "On-site", "Take-home", "Technical", "Behavioral", "Other"],
      default: "Video",
    },
    scheduledAt: {
      type: Date,
      required: [true, "Interview date/time is required"],
    },
    duration: {
      type: Number, // minutes
      default: 60,
    },
    interviewer: {
      type: String,
      default: "",
      trim: true,
    },
    interviewerRole: {
      type: String,
      default: "",
      trim: true,
    },
    meetingLink: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled", "Rescheduled"],
      default: "Scheduled",
    },
    outcome: {
      type: String,
      enum: ["Passed", "Failed", "Pending", "Waiting", ""],
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    questions: [
      {
        question: { type: String },
        answer: { type: String },
        difficulty: { type: String, enum: ["Easy", "Medium", "Hard", ""] },
      },
    ],
    selfRating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    followUpSent: {
      type: Boolean,
      default: false,
    },
    followUpDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

interviewSchema.index({ user: 1, scheduledAt: 1 });

module.exports = mongoose.model("Interview", interviewSchema);
