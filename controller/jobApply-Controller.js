const candidateSchema = require('../model/candidateSchema');
const employerSchema = require('../model/employersSchema');
const resume = require('../model/resumeSchema');

module.exports = {
    getJobs: async (req, res) => {
        try {
            const jobs = await employerSchema.find().populate('postedBy').sort({createdAt: 'desc'}).lean();
            return res.render('jobs.ejs', { jobs, User: req.user });
        } catch (error) {
            console.error("Error fetching jobs:", error);
            return res.status(500).json({     
            success: false,
            message: "Failed to fetch jobs.",
            error: error.message
            });
        }
    },


    details: async (req, res) => {
        try {
            const jobId = req.params.id;
            const job = await employerSchema.findById(jobId).populate('postedBy');

                if (!job) {
                    return res.status(404).json({
                        success: false,
                        message: "Job not found."
                    });
                }

                return res.render('jobDetails.ejs', { job, User: req.user });

        } catch (error) {
            console.error("Error fetching job details:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch job details.",
                error: error.message
            });
        }
    },              

    applyForJob: async (req, res) => {
        try {

            const userId = req.user._id;
            const {jobId} = req.body;

            const job = await employerSchema.findById(jobId).populate('postedBy');
        
        // Check if the user has uploaded a resume before applying
            const userResume = await resume.findOne({ userId });

            if (!userResume) {
                return res.status(400).render('jobDetails.ejs', 
                    {errorMessage: "Please upload your resume before applying for a job.", job, User: req.user});
            }
        
        // Check if the user has already applied for this job
            const appliedAlready = await candidateSchema.findOne({ userId, jobId });

            if (appliedAlready) {
                return res.status(400).render('jobDetails.ejs', 
                    {errorMessage: "You have already applied for this job.", job, User: req.user});
            }
    
            await candidateSchema.create({ 
                jobId,
                userId,
                resumeId: userResume._id,
            });

            return res.status(201).redirect('/');  

        } catch (error) {
            console.error("Error submitting application:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to submit application.",
                error: error.message
            });
        }
    },

    myApplications: async (req, res) => {
        try {
            const userId = req.user._id;

            const applications = await candidateSchema.find({ userId }).populate([
              { path: 'userId', select: 'fullName' },
              {
                path: 'jobId',
                select: 'jobTitle jobDescription jobLocation postedBy',
                populate: { path: 'postedBy', select: 'fullName' }
              }
            ]).sort({appliedAt: 'desc'}).lean();
            
            // Keep only applications that still have a valid job
            const validApplications = applications.filter(app => app.jobId != null);
            
            return res.render('myApplication', { 
              applications: validApplications, 
              User: req.user 
            });
            
        } catch (error) {
            console.error("Error fetching applications:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch applications.",
                error: error.message
            });
        }
    },


    searchJobs: async (req, res) => {
        try {
            const { q, location } = req.query;
    
            const filter = {};
    
            if (q && q.trim()) {
                const searchRegex = new RegExp(q.trim(), 'i');
    
                filter.$or = [
                    { jobTitle: searchRegex },
                    { jobRequirements: searchRegex },
                    { jobLocation: searchRegex }
                ];
            }
    
            if (location && location.trim()) {
                filter.jobLocation = {
                    $regex: location.trim(),
                    $options: 'i'
                };
            }
    
            const jobs = await employerSchema
                .find(filter)
                .populate('postedBy', 'fullName')
                .sort({ createdAt: -1 })
                .lean();
    
            return res.status(200).render('jobs.ejs', { jobs, User: req.user });
    
        } catch (error) { 
            console.error("Error searching jobs:", error);
    
            return res.status(500).json({
                success: false,
                message: "Failed to search jobs.",
                error: error.message
            });
        }
    },

    updateCandidateStatus: async(req,res)=> {
        try{
            const { candidateId} = req.params;
            const { status } = req.body

            const updatedCandidate = await candidateSchema.findByIdAndUpdate(candidateId, { status }, {new:true, runValidators:true});
            if(!updatedCandidate){
                return res.status(404).json({
                    success: false,
                    message: "Candidate not found.",
                    error: err.message
                })
            }
            return res.status(200).redirect('/employers')
        } catch(err){
            console.log(err)
            return res.status(500).json({
                success: false, 
                message: "Failed to update candidate status.",
                error: err.message
            })
        }
    }
}
