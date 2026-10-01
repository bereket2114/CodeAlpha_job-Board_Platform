const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/ensureAuth')
const candidateController = require('../controller/jobApply-Controller');

router.get('/', candidateController.getJobs);
router.get('/details/:id', ensureAuthenticated, candidateController.details);
router.get('/applications', ensureAuthenticated, candidateController.myApplications);
router.post('/apply', ensureAuthenticated, candidateController.applyForJob);
//router.put('/:id', ensureAuthenticated, candidateController.updateCandidate);
//router.delete('/:id', ensureAuthenticated, candidateController.deleteCandidate);

module.exports = router;