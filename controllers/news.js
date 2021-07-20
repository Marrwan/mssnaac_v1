// Load Models
const MSSNNews = require("../models/MSSNNews");
const AcademicNews = require("../models/AcademicNews");
const ScholarshipNews = require("../models/ScholarshipNews");
const User = require("../models/User");
const AppError = require("../utilities/appError");

exports.getMSSNNews = async (req, res) => {
  try {
let { page = 1, limit = 5 } = req.query;
let mssnnews = await MSSNNews.find({})
  .sort({ created: "desc" })
  .limit(limit * 1)
  .skip((page - 1) * limit);
let allnews =  await MSSNNews.find({})
      res.render("news/mssn/mssn", { mssnnews, allnews, page, limit });
  } catch (error) {
    return new AppError(error.message, error.status);
  }
};
exports.getNewMSSNForm = async (req, res) => {
  try {
    let mssnnews = MSSNNews.find({})
      res.render("news/mssn/new", { mssnnews });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.newMSSNHandler = async (req, res) => {
  try {
 let mssnnews =  await MSSNNews.find({})
    const { title, post, excerpt } = req.body;
    let errors = [];
    if (!title || !post || !excerpt) {
      errors.push({ msg: "Please fill in all fields" });
    }
    if (title.lenght < 5) {
      errors.push({ msg: "Title must be at least 5 characters" });
    }
    if (errors.length > 0) {
      res.render("news/mssn/new", { title, post, excerpt, errors, mssnnews });
    } else {
    let foundMSSNnews =   await MSSNNews.findOne({ title })
        if (foundMSSNnews) {
          errors.push({ msg: "A post with this title already exist" });
          res.render("news/mssn/new", {
            title,
            post,
            excerpt,
            errors,
            mssnnews,
          });
        } else {
          let author = req.user.username;
          let newMSSNnews = new MSSNNews({
            post,
            title,
            author,
            excerpt,
          });
        let savedNews =  await newMSSNnews.save()
            req.flash("success_msg", `Post has been successfully added`);
            res.redirect("/news/mssn");
        }
    }
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.getSpecificMSSN = async (req, res) => {
  try{
  let slug = req.params.slug
let mssnnews =  await MSSNNews.findOne({ slug})
    res.render("news/mssn/show", { mssnnews });
  } catch (error) {
    return new AppError(error.message, error.status);
  }
};
exports.getEditMSSNForm = async (req, res) => {
  try {
  let slug = req.params.slug;
 let mssnnews =  await MSSNNews.findOne({slug })
    res.render("news/mssn/edit", { mssnnews });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.editMSSNHandler = async (req, res) => {
  try {
  let slug = req.params.slug;
 let mssnnews = await MSSNNews.findOne({slug})
    const { title, post, excerpt } = req.body;
    let errors = [];
    if (!title || !post || !excerpt) {
      errors.push({ msg: "Please fill in all fields" });
    }
    if (title.lenght < 5) {
      errors.push({ msg: "Title must be at least 5 characters" });
    }
    if (errors.length > 0) {
      res.render("news/mssn/edit", {
        title,
        post,
        excerpt,
        errors,
        mssnnews,
      });
    } else {
      await MSSNNews.findOneAndUpdate({slug},req.body, {runValidators: true})     
          req.flash("success_msg", `Update Successfull`);
          res.redirect(`/news/mssn`);
    }
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.deleteMSSN = async (req, res) => {
  try{
  let slug = req.params.slug;
  await MSSNNews.findOneAndRemove({slug})
       req.flash("success_msg", `successfully deleted`);
        res.redirect("/news/mssn");
} catch (error) {
  return new AppError(error.message, error.status);
}
};

exports.getAcademicNews = async (req, res) => {
  try{
  let { page = 1, limit = 5 } = req.query;
  let academicnews = await AcademicNews.find({}) 
  .sort({ created: "desc" })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  let allnews =  await AcademicNews.find({})
      res.render("news/academics/academics", {
        academicnews,
        allnews,
        page,
        limit,
      });
  } catch (error) {
    return new AppError(error.message, error.status);
  }
};
exports.getNewAcademicForm = (req, res) => {
  try{
let academicnews =  AcademicNews.find({})
    res.render("news/academics/new", { academicnews })
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.newAcademicHandler = (req, res) => {
  try{
  AcademicNews.find({}, (err, academicnews) => {
    if (err) throw err;
    const { title, post, excerpt } = req.body;
    let errors = [];
    if (!title || !post || !excerpt) {
      errors.push({ msg: "Please fill in all fields" });
    }
    if (title.lenght < 5) {
      errors.push({ msg: "Title must be at least 5 characters" });
    }
    if (errors.length > 0) {
      res.render("news/academics/new", {
        title,
        post,
        excerpt,
        errors,
        academicnews,
      });
    } else {
      AcademicNews.findOne({ title }, (err, foundAcademicNews) => {
        if (err) throw err;
        if (foundAcademicNews) {
          errors.push({ msg: "A post with this title already exist" });
          res.render("news/academics/new", {
            title,
            post,
            excerpt,
            errors,
            academicnews,
          });
        } else {
          let author = req.user.username;
          let newacademicnews = new AcademicNews({
            post,
            excerpt,
            title,
            author,
          });
          newacademicnews.save((err, savedNews) => {
            if (err) throw err;
            req.flash("success_msg", `Post has been successfully added`);
            res.redirect("/news/academics");
          });
        }
      });
    }
  });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.getSpecificAcademic = async(req, res) => {
  try{
let slug = req.params.slug;
 let academicnews = await AcademicNews.findOne({ slug })
    res.render("news/academics/show", { academicnews });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.getEditAcademicForm = async(req, res) => {
  try{
  let slug = req.params.slug;
  let academicnews = await AcademicNews.findOne({slug })
    res.render("news/academics/edit", { academicnews });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.editAcademicHandler = async (req, res) => {
  try{
  let slug = req.params.slug;
let academicnews =  await AcademicNews.findOne({ slug })
      const { title, post, excerpt } = req.body;
      let errors = [];
      if (!title || !post || !excerpt) {
        errors.push({ msg: "Please fill in all fields" });
      }
      if (title.lenght < 5) {
        errors.push({ msg: "Title must be at least 5 characters" });
      }
      if (errors.length > 0) {
        res.render("news/academics/edit", {
          title,
          post,
          excerpt,
          errors,
          academicnews,
        });
      } else {
  await  AcademicNews.findOneAndUpdate( { slug }, req.body, {runValidators: true})
            req.flash("success_msg", `Update Successfull`);
            res.redirect(`/news/academics`);
      }
    }
 catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.deleteAcademic = async(req, res) => {
  try{
  let slug = req.params.slug;
 await AcademicNews.findOneAndRemove({ slug })
 req.flash("success_msg", `successfully deleted`);
      res.redirect("/news/academics");
} catch (error) {
  return new AppError(error.message, error.status);
}
};

exports.getScholarshipNews = async (req, res) => {
  try{
  let { page = 1, limit = 5 } = req.query;
  let scholarshipnews = await ScholarshipNews.find({}).sort({ created: "desc" })
    .limit(limit * 1)
    .skip((page - 1) * limit);
 
  let allnews =   await ScholarshipNews.find({})
      res.render("news/scholarship/scholarship", {
        scholarshipnews,
        allnews,
        page,
        limit,
      });
  } catch (error) {
    return new AppError(error.message, error.status);
  }
};
exports.getNewScholarshipForm = (req, res) => {
  ScholarshipNews.find({}, (err, scholarshipnews) => {
    if (err) throw err;
    res.render("news/scholarship/new", { scholarshipnews });
  });
};
exports.newScholarshipHandler = async(req, res) => {
  try{
let scholarshipnews = await  ScholarshipNews.find({})
    const { title, post, excerpt } = req.body;
    let errors = [];
    if (!title || !post || !excerpt) {
      errors.push({ msg: "Please fill in all fields" });
    }
    if (title.lenght < 5) {
      errors.push({ msg: "Title must be at least 5 characters" });
    }
    if (errors.length > 0) {
      res.render("news/scholarship/new", {
        title,
        post,
        excerpt,
        errors,
        scholarshipnews,
      });
    } else {
 let foundScholarshipNews = await ScholarshipNews.findOne({ title })
        if (foundScholarshipNews) {
          errors.push({ msg: "A post with this title already exist" });
          res.render("news/scholarship/new", {
            title,
            post,
            excerpt,
            errors,
            scholarshipnews,
          });
        } else {
          let author = req.user.username;
          let newScholarshipNews = new ScholarshipNews({
            post,
            excerpt,
            title,
            author,
          });
          newScholarshipNews.save((err, savedNews) => {
            if (err) throw err;
            req.flash("success_msg", `Post has been successfully added`);
            res.redirect("/news/scholarship");
          });
        }
    }
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.getSpecificScholarship = async (req, res) => {
try{
  let slug = req.params.slug;
 let scholarshipnews = await ScholarshipNews.findOne({ slug }, (err, scholarshipnews) => {
    res.render("news/scholarship/show", { scholarshipnews });
  });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.getEditScholarshipForm = async(req, res) => {
  try{
  let slug = req.params.slug;
 let scholarshipnews = await ScholarshipNews.findOne({ slug })
    res.render("news/scholarship/edit", { scholarshipnews });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.editScholarshipHandler = async (req, res) => {
  try{
  let slug = req.params.slug;
 let scholarshipnews =  await ScholarshipNews.findOne({ slug })
      const { title, post, excerpt } = req.body;
      let errors = [];
      if (!title || !post || !excerpt) {
        errors.push({ msg: "Please fill in all fields" });
      }
      if (title.lenght < 5) {
        errors.push({ msg: "Title must be at least 5 characters" });
      }
      if (errors.length > 0) {
        res.render("news/scholarship/edit", {
          title,
          post,
          excerpt,
          errors,
          scholarshipnews,
        });
      } else {
      await  ScholarshipNews.findOneAndUpdate( {slug }, req.body, {runValidators: true})
            req.flash("success_msg", `Update Successfull`);
            res.redirect(`/news/scholarship/${scholarshipnews.slug}`);
      }
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.deleteScholarship = async(req, res) => {
  try{
    let slug = req.params.slug;
 await ScholarshipNews.findOneAndRemove({slug })
 req.flash("success_msg", `successfully deleted`);
        res.redirect("/news/scholarship"); 
} catch (error) {
  return new AppError(error.message, error.status);
}
};
