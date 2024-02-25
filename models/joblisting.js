// jobListing.js
const mongoose = require("mongoose");

const jobListingSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  usersApplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("JobListing", jobListingSchema);
