const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
	return res.render("pages/index");
});

module.exports = router;
