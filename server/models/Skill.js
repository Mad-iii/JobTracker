const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Technical", "Language", "Framework", "Tool", "Soft Skill", "Other"],
      default: "Technical",
    },
    proficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Intermediate",
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
      min: 0,
    },
    isHighlighted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

skillSchema.index({ user: 1, category: 1 });
skillSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Skill", skillSchema);
