const express = require("express");
const { isLoggedIn } = require("../auth/auth");
const dashboard= require("../controllers/dashboard");

var router = express.Router();

//  GET-ROUTE : Dashboard
router.get("/dashboard", isLoggedIn, dashboard.getDashboard);

router.post("/regime/new",dashboard.newRegimeHandler);
router.put("/regime/:id",dashboard.updateRegimeHandler);
router.delete("/regime/:id/delete",dashboard.deleteRegimeHandler);
router
.route("/portfolio/new")
.post( dashboard.newPortfolioHandler )
module.exports = router;