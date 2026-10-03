const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/ensureAuth')
const candidateController = require('../controller/jobApply-Controller');

router.get('/', candidateController.getJobs);
router.get('/details/:id', ensureAuthenticated, candidateController.details);
router.get('/search', ensureAuthenticated, candidateController.searchJobs);


module.exports = router;