const express = require("express");
const { isLoggedIn, isAdmin } = require("../auth/auth");
const dashboard= require("../controllers/dashboard");

var router = express.Router();

//  GET-ROUTE : Dashboard
router.get("/dashboard", isLoggedIn, dashboard.getDashboard);

router.post("/regime/new", isLoggedIn, isAdmin, dashboard.newRegimeHandler);
router.put("/regime/:id/edit", isLoggedIn, isAdmin, dashboard.updateRegimeHandler);
router.delete("/regime/:id/delete", isLoggedIn, isAdmin, dashboard.deleteRegimeHandler);
router
.route("/portfolio/new")
.post(isLoggedIn, isAdmin, dashboard.newPortfolioHandler )

router.post('/dashboard/newevent', isLoggedIn,isAdmin, dashboard.newEventHadler)
router.delete("/dashboard/:id/delete", isLoggedIn,isAdmin, dashboard.deleteEventHandler)
module.exports = router;

