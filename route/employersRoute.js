const express = require('express');
const router = express.Router();
const employerController = require('../controller/employerController');
const { ensureAuthenticated } = require('../middleware/ensureAuth')

const ensureEmployer = (req, res, next) => {
    if (req.user?.role === 'employer') return next();
    return res.status(403).json({
        success: false,
        message: 'Employer access required.'
    });
};


router.get('/', ensureAuthenticated, ensureEmployer, employerController.getEmployersDashboard);
router.get('/applied-candidates', ensureAuthenticated, ensureEmployer, employerController.getAppliedCandidates);
router.get('/applied-candidates/job', ensureAuthenticated, ensureEmployer, employerController.jobStatus);
router.post('/jobs', ensureAuthenticated, ensureEmployer, employerController.postJobs);


module.exports = router; 