const employersSchema = require('../model/employersSchema');
const candidateSchema = require('../model/candidateSchema');
const cloudinary = require('cloudinary').v2;

module.exports = {
    getEmployersDashboard: async (req, res) => {

        try {
            const userId = req.user._id;
            const employers = await employersSchema.find({ postedBy: userId }).sort({ createdAt: -1 }).lean();
            return res.render("employers.ejs", { employers , User: req.user });
        } catch (error) {
            console.error("Error caught in getEmployers catch block:");
            return res.status(500).json({
                success: false,
                message: "Failed to fetch employers.",
                error: error.message
            });
        }
    },

    getAppliedCandidates: async (req, res)=> {

        try {
          // 1. Get all jobs posted by the currently logged-in employer
          const myJobs = await employersSchema.find({ postedBy: req.user._id }).select('_id');
      
          const myJobIds = myJobs.map(job => job._id);
      
          // 2. Find only applications that belong to those jobs
          const candidates = await candidateSchema
            .find({ jobId: { $in: myJobIds } })
            .populate('userId', 'fullName email')
            .populate('resumeId')
            .populate('jobId', 'jobTitle')       
            .sort({appliedAt: 'desc'}).lean();
      
          // 3. Generate signed Cloudinary URLs (your existing logic)
          const candidatesWithSignedUrls = candidates.map(candidate => {
            if (candidate.resumeId && candidate.resumeId.cloudinaryId) {
              candidate.resumeId.signedPdfUrl = cloudinary.url(candidate.resumeId.cloudinaryId, {
                resource_type: 'raw',
                type: 'upload',
                sign_url: true,
                secure: true,
                expires_at: Math.floor(Date.now() / 1000) + 3600
              });
            }
            return candidate;
          });
      
          return res.render('candidates', {
            candidates: candidatesWithSignedUrls,
            User: req.user
          });
      
        } catch (error) {
          console.error("Error fetching applied candidates:", error);
          return res.status(500).json({
            success: false,
            message: "Failed to fetch applied candidates"
          });
        }
    },


    jobStatus: async (req, res) => {
        try {
          // 1. Clean the status query parameter (removes quotes like %27)
          let status = req.query.status ? req.query.status.replace(/['"]/g, '').trim() : null;
      
          // 2. Find jobs created by the logged-in employer
          const myJobs = await employersSchema.find({ postedBy: req.user._id }).select('_id');
          const myJobIds = myJobs.map(job => job._id);
      
          // 3. Build query filter (restrict to employer's jobs + optional status)
          const filter = { jobId: { $in: myJobIds } };
          const allowedStatuses = ['applied', 'shortlisted', 'interviewed', 'hired', 'rejected'];
      
          if (status && allowedStatuses.includes(status)) {
            filter.status = status;
          }
      
          // 4. Query database with case-sensitive 'jobId'
          const candidates = await candidateSchema
            .find(filter)
            .populate('userId', 'fullName email')
            .populate('resumeId')
            .populate('jobId', 'jobTitle')
            .sort({ appliedAt: 'desc' })
            .lean();
      
          // 5. Generate Cloudinary signed URLs (if applicable)
          const candidatesWithSignedUrls = candidates.map(candidate => {
            if (candidate.resumeId && candidate.resumeId.cloudinaryId) {
              candidate.resumeId.signedPdfUrl = cloudinary.url(candidate.resumeId.cloudinaryId, {
                resource_type: 'raw',
                type: 'upload',
                sign_url: true,
                secure: true,
                expires_at: Math.floor(Date.now() / 1000) + 3600
              });
            }
            return candidate;
          });
      
          // 6. Pass 'candidates' variable so candidates.ejs renders without errors
          return res.render('candidates', { 
            candidates: candidatesWithSignedUrls, 
            User: req.user 
          });
      
        } catch (err) {
          console.error('Failed to fetch candidate status:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to fetch candidate status.',
            error: err.message
          });
        }
    },


    postJobs: async (req, res) => {
        try {
            if (req.user.role !== 'employer') {
                return res.status(403).json({
                    success: false,
                    message: 'Only employers can post jobs.'
                });
            }

            const { jobTitle, jobDescription, jobRequirements, jobSalary, jobLocation } = req.body;

            await employersSchema.create({
                  jobTitle,
                  jobDescription,
                  jobRequirements,
                  jobLocation,
                  jobSalary,
                  postedBy: req.user._id
            });

            return res.redirect("/employers");

        } catch (error) {
            console.error("Error caught in postJobs catch block:");
            return res.status(500).json({
                success: false,
                message: "Failed to post job.",
                error: error.message
            });
        }
    },

}