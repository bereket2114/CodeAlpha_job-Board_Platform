const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../middleware/ensureAuth')
const candidateController = require('../controller/jobApply-Controller');

router.get('/', ensureAuthenticated, candidateController.myApplications);
router.post('/apply', ensureAuthenticated, candidateController.applyForJob);
router.put('/update-status/:candidateId/status', ensureAuthenticated, candidateController.updateCandidateStatus);


module.exports = router