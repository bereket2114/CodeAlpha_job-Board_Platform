const candidateSchema = require('../model/candidateSchema');
const employerSchema = require('../model/employersSchema');
const resume = require('../model/resumeSchema');
const { createNotification } = require('../services/notificationService');

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

            if (req.user.role !== 'candidate') {
                return res.status(403).json({
                    success: false,
                    message: 'Only candidates can apply for jobs.'
                });
            }

            const userId = req.user._id;
            const { jobId } = req.body;

            const job = await employerSchema.findById(jobId).populate('postedBy');

            if (!job) {
                return res.status(404).json({
                    success: false,
                    message: 'Job not found.'
                }); 
            }
        
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
    
            const application = await candidateSchema.create({
                jobId,
                userId,
                resumeId: userResume._id,
            });

            // Notify the employer that a new candidate has applied.
            if (job.postedBy?._id) {
                try {
                    await createNotification({
                        recipient: job.postedBy._id,
                        sender: userId,
                        type: 'new_application',
                        title: 'New job application',
                        message: `${req.user.fullName} applied for your ${job.jobTitle} position.`,
                        jobId: job._id,
                        applicationId: application._id
                    });
                } catch (notificationError) {
                    console.error('Application was saved, but employer notification failed:', notificationError);
                }
            }

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

    updateCandidateStatus: async (req, res) => {
        try {
            const { candidateId } = req.params;
            const { status } = req.body;
            const allowedStatuses = ['applied', 'shortlisted', 'interviewed', 'hired', 'rejected'];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid application status.'
                });
            }

            // Load the application with its job owner so we can enforce authorization.
            const application = await candidateSchema
                .findById(candidateId)
                .populate({
                    path: 'jobId',
                    select: 'jobTitle postedBy',
                    populate: { path: 'postedBy', select: 'fullName' }
                })
                .populate('userId', 'fullName');

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: 'Application not found.'
                });
            }

            if (!application.jobId || !application.jobId.postedBy) {
                return res.status(404).json({
                    success: false,
                    message: 'The job attached to this application is no longer available.'
                });
            }

            // Only the employer who owns the job can change this application.
            if (String(application.jobId.postedBy._id) !== String(req.user._id)) {
                return res.status(403).json({
                    success: false,
                    message: 'You are not authorized to update this application.'
                });
            }

            const previousStatus = application.status;
            application.status = status;
            await application.save();

            // Notify the candidate when the employer changes the status.
            if (previousStatus !== status && application.userId?._id) {
                try {
                    await createNotification({
                        recipient: application.userId._id,
                        sender: req.user._id,
                        type: 'application_status',
                        title: 'Application status updated',
                        message: `Your application for ${application.jobId.jobTitle} is now ${status}.`,
                        jobId: application.jobId._id,
                        applicationId: application._id
                    });
                } catch (notificationError) {
                    console.error('Application status was updated, but candidate notification failed:', notificationError);
                }
            }

            return res.status(200).json({
                success: true,
                message: 'Application status updated successfully.',
                application: {
                    id: application._id,
                    status: application.status
                }
            });
        } catch (err) {
            console.error('Error updating candidate status:', err);
            return res.status(500).json({
                success: false,
                message: 'Failed to update candidate status.',
                error: err.message
            });
        }
    }
}
