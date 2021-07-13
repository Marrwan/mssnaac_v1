const axios = require("axios");
// LOAD MODELS

const MSSNNews = require("../models/MSSNNews");
const AcademicNews = require("../models/AcademicNews");
const ScholarshipNews = require("../models/ScholarshipNews");
const User = require("../models/User");
const AppError = require("../utilities/appError");

exports.getHomepage = async (req, res) => {
  try {
    await MSSNNews.find({}, async (err, mssnnews) => {
      await AcademicNews.find({}, async (err, academicnews) => {
        await ScholarshipNews.find({}, async (err, scholarshipnews) => {
          const response = await axios({ method: 'GET',
          url: 'https://api.sunnah.com/v1/hadiths/random',
          headers: { 'x-api-key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk' },
          body: '{}' });
          const random = Math.floor(Math.random() * response.data.length);
          const data = response.data.hadith[0];
          res.render("index", { mssnnews, academicnews, scholarshipnews, data });
        }).sort({ created: "desc" });
      }).sort({ created: "desc" });
    }).sort({ created: "desc" });
  } catch (err) {
    return new AppError(err.message, err.status);
  }
};

exports.getDashboard = async (req, res) => {
  await User.find({}, (err, users) => {
    res.render("dashboard", { users });
  });
};

exports.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("back");
};
