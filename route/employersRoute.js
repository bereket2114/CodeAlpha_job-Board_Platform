const express = require('express');
const router = express.Router();
const employerController = require('../controller/employerController');
const { ensureAuthenticated } = require('../middleware/ensureAuth')


router.get('/', ensureAuthenticated, employerController.getEmployersDashboard);
router.get('/applied-candidates', ensureAuthenticated, employerController.getAppliedCandidates);
router.get('/applied-candidates/job', ensureAuthenticated, employerController.jobStatus);
router.post('/jobs', ensureAuthenticated, employerController.postJobs);
router.delete('/jobs/delete/:jobId', ensureAuthenticated,  employerController.deleteJob);

module.exports = router; 