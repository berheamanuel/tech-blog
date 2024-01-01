// import express and routers
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

// Export the router
module.exports = router;