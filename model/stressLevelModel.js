const mongoose = require("mongoose");
const stressLevelSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const StressLevel = mongoose.model("StressLevel", stressLevelSchema);
module.exports = StressLevel;
