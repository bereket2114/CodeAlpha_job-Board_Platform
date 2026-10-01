const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer")
const { ensureAuthenticated } = require('../middleware/ensureAuth')
const resumeController = require("../controller/resume-Controller");


router.get('/', ensureAuthenticated, resumeController.getCV)
router.post('/upload', ensureAuthenticated, multer.single("resume"), resumeController.uploadCV)


module.exports = router;