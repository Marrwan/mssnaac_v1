// Load Models
const MSSNNews = require("../models/MSSNNews");
const AcademicNews = require("../models/AcademicNews");
const ScholarshipNews = require("../models/ScholarshipNews");
const User = require("../models/User");
const AppError = require("../utilities/appError");

exports.getMSSNNews = async (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  await MSSNNews.find({}, async (err, mssnnews) => {
    if (err) {
      return new AppError(err.message, err.status);
    }
    await MSSNNews.find({}, (err, allnews) => {
      if (err) {
        return new AppError(err.message, err.status);
      }
      res.render("news/mssn/mssn", { mssnnews, allnews, page, limit });
    });
  })
    .sort({ created: "desc" })
    .limit(limit * 1)
    .skip((page - 1) * limit);
};
exports.getNewMSSNForm = async (req, res) => {
  MSSNNews.find({}, (err, mssnnews) => {
    if (err) {
      throw new AppError(err.message, err.status);
    } else {
      res.render("news/mssn/new", { mssnnews });
    }
  });
};
exports.newMSSNHandler = async (req, res) => {
  await MSSNNews.find({}, async (err, mssnnews) => {
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
      res.render("news/mssn/new", { title, post, excerpt, errors, mssnnews });
    } else {
      await MSSNNews.findOne({ title }, async (err, foundMSSNnews) => {
        if (err) {
          return new AppError(err.message, err.status);
        }
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
          await newMSSNnews.save((err, savedNews) => {
            if (err) throw err;
            req.flash("success_msg", `Post has been successfully added`);
            res.redirect("/news/mssn");
          });
        }
      });
    }
  });
};
exports.getSpecificMSSN = async (req, res) => {
  // <%let modifiedPost = mssnnews.title.replace(/\s/g, '-')%>
  // let title = req.params.title.replace(/-/gi, " ");
  let id = req.params.id

  await MSSNNews.findOne({ _id: id}, (err, mssnnews) => {
    if (err) {
      return new AppError(err.message, err.status);
    }

    res.render("news/mssn/show", { mssnnews });
  });
};
exports.getEditMSSNForm = async (req, res) => {
  let id = req.params.id;
  await MSSNNews.findOne({_id: id }, (err, mssnnews) => {
    if (err) {
      return new AppError(err.message, err.status);
    }
    res.render("news/mssn/edit", { mssnnews });
  });
};
exports.editMSSNHandler = async (req, res) => {
  let id = req.params.id;
  await MSSNNews.findOne({ _id: id }, async (err, mssnnews) => {
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
      await MSSNNews.findOneAndUpdate(
        {_id : id},
        req.body,
        (err, updatedMSSNnews) => {
          if (err) {
            return new AppError(err.message, err.status);
          }
          req.flash("success_msg", `Update Successfull`);
          res.redirect(`/news/mssn`);
        }
      );
    }
  });
};
exports.deleteMSSN = async (req, res) => {
  let id = req.params.id;
  await MSSNNews.findOneAndRemove(
    {_id: id },
    (err, deleted) => {
      if (err) {
        res.redirect(`/news/mssn/${req.params.title}`);
        req.flash("error_msg", err);
        console.log(err);
      } else {
        req.flash("success_msg", `successfully deleted`);
        res.redirect("/news/mssn");
      }
    }
  );
};

exports.getAcademicNews = async (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  await AcademicNews.find({}, async (err, academicnews) => {
    if (err) {
      return new AppError(err.message, err.status);
    }
    await AcademicNews.find({}, (err, allnews) => {
      if (err) {
        return new AppError(err.message, err.status);
      }
      res.render("news/academics/academics", {
        academicnews,
        allnews,
        page,
        limit,
      });
    });
  })
    .sort({ created: "desc" })
    .limit(limit * 1)
    .skip((page - 1) * limit);
};
exports.getNewAcademicForm = (req, res) => {
  AcademicNews.find({}, (err, academicnews) => {
    if (err) throw err;
    res.render("news/academics/new", { academicnews });
  });
};
exports.newAcademicHandler = (req, res) => {
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
};
exports.getSpecificAcademic = (req, res) => {
  // let title = req.params.title.replace(/-/gi, " ");
let id = req.params.id;
  AcademicNews.findOne({ _id: id }, (err, academicnews) => {
    if (err) throw err;
    res.render("news/academics/show", { academicnews });
  });
};
exports.getEditAcademicForm = (req, res) => {
  let id = req.params.id;
  AcademicNews.findOne({_id : id }, (err, academicnews) => {
    if (err) throw err;
    res.render("news/academics/edit", { academicnews });
  });
};
exports.editAcademicHandler = async (req, res) => {
  let id = req.params.id;
  await AcademicNews.findOne(
    { _id : id },
    (err, academicnews) => {
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
        AcademicNews.findOneAndUpdate(
          { _id : id },
          req.body,
          (err, updatedAcademic) => {
            if (err) throw err;
            req.flash("success_msg", `Update Successfull`);
            res.redirect(`/news/academics`);
          }
        );
      }
    }
  );
};
exports.deleteAcademic = (req, res) => {
  let id = req.params.id;
  AcademicNews.findOneAndRemove({ _id : id }, (err, deleted) => {
    if (err) {
      res.redirect(`/news/academics/${id}`);
      req.flash("error_msg", err);
     
    } else {
      req.flash("success_msg", `successfully deleted`);
      res.redirect("/news/academics");
    }
  });
};

exports.getScholarshipNews = async (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  await ScholarshipNews.find({}, async (err, scholarshipnews) => {
    if (err) {
      return new AppError(err.message, err.status);
    }
    await ScholarshipNews.find({}, (err, allnews) => {
      if (err) {
        return new AppError(err.message, err.status);
      }
      res.render("news/scholarship/scholarship", {
        scholarshipnews,
        allnews,
        page,
        limit,
      });
    });
  })
    .sort({ created: "desc" })
    .limit(limit * 1)
    .skip((page - 1) * limit);
};
exports.getNewScholarshipForm = (req, res) => {
  ScholarshipNews.find({}, (err, scholarshipnews) => {
    if (err) throw err;
    res.render("news/scholarship/new", { scholarshipnews });
  });
};
exports.newScholarshipHandler = (req, res) => {
  ScholarshipNews.find({}, (err, scholarshipnews) => {
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
      res.render("news/scholarship/new", {
        title,
        post,
        excerpt,
        errors,
        scholarshipnews,
      });
    } else {
      ScholarshipNews.findOne({ title }, (err, foundScholarshipNews) => {
        if (err) throw err;
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
      });
    }
  });
};
exports.getSpecificScholarship = (req, res) => {
  // let title = req.params.title.replace(/-/gi, " ");
  let id = req.params.id;
  ScholarshipNews.findOne({ _id: id }, (err, scholarshipnews) => {
    if (err) throw err;
    res.render("news/scholarship/show", { scholarshipnews });
  });
};
exports.getEditScholarshipForm = (req, res) => {
  let id = req.params.id;
  ScholarshipNews.findOne({ _id : id }, (err, scholarshipnews) => {
    if (err) throw err;
    res.render("news/scholarship/edit", { scholarshipnews });
  });
};
exports.editScholarshipHandler = async (req, res) => {
  let id = req.params.id;
  await ScholarshipNews.findOne(
    { _id : id },
    (err, scholarshipnews) => {
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
        ScholarshipNews.findOneAndUpdate(
          {_id : id },
          req.body,
          (err, updatedScholarshipNews) => {
            if (err) throw err;
            req.flash("success_msg", `Update Successfull`);
            res.redirect(`/news/scholarship/${req.params.title}`);
          }
        );
      }
    }
  );
};
exports.deleteScholarship = (req, res) => {
  ScholarshipNews.findOneAndRemove(
    {_id : id },
    (err, deleted) => {
      if (err) {
        res.redirect(`/news/scholarship/${req.params.title}`);
        req.flash("error_msg", err);
        console.log(err);
      } else {
        req.flash("success_msg", `successfully deleted`);
        res.redirect("/news/scholarship");
      }
    }
  );
};
