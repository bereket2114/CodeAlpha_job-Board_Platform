const express = require('express');
const router = express.Router();
const employerController = require('../controller/employerController');
const { ensureAuthenticated } = require('../middleware/ensureAuth')

router.get('/', ensureAuthenticated, employerController.getEmployersDashboard);
router.get('/applied-candidates', ensureAuthenticated, employerController.getAppliedCandidates);
router.post('/jobs', ensureAuthenticated, employerController.postJobs);
//router.put('/:id', ensureAuthenticated,  employerController.updateEmployer);
//router.delete('/:id', ensureAuthenticated,  employerController.deleteEmployer);

module.exports = router;