const resume = require("../model/resumeSchema");
const cloudinary = require("../middleware/cloudinary");
const streamifier = require("streamifier");



module.exports = {

    getCV: async (req, res) => {
        try {
            const userId = req.user._id;
            const cv = await resume.findOne({ userId });
            return res.render("resume.ejs", { cv, User: req.user });
        } catch (error) {
            console.error("Error fetching CV:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch CV.",
                error: error.message
            }); 
        }
    },


    uploadCV: async (req, res) => {
        try {
          // 1. Basic validation
          if (!req.file) {
            return res.status(400).send('No file uploaded.');
          }
    
          // Optional but recommended: only allow PDF
          if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).send('Only PDF files are allowed.');
          }
    
          // Optional: limit file size (e.g. 5MB)
          if (req.file.size > 5 * 1024 * 1024) {
            return res.status(400).send('File too large. Maximum size is 5MB.');
          }
    
          // 2. Upload to Cloudinary as private/raw
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: 'resumes',
                resource_type: 'raw',        // Important for PDFs
                type: 'upload',
                access_mode: 'authenticated', // More secure (requires signed URL)
                // You can also use 'public' if you prefer permanent public links
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
    
            streamifier.createReadStream(req.file.buffer).pipe(stream);
          });

    
          // 3. Generate a signed URL (valid for 1 hour – adjust as needed)
          const signedPdfUrl = cloudinary.url(result.public_id, {
            resource_type: 'raw',
            type: 'upload',
            sign_url: true,
            secure: true,
            expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour
          });

        // Check if the user already has a resume and delete the old one if it exists  
          const existingResume = await resume.findOne({ userId: req.user._id });
             if (existingResume) {
                // Delete the old file from Cloudinary
                await cloudinary.uploader.destroy(existingResume.cloudinaryId, { resource_type: 'raw' });
             }

          // 4. Save to database
          const resumeEntry = await resume.create({
            pdfUrl: signedPdfUrl,           // Store the signed URL
            cloudinaryId: result.public_id, // Always store public_id for regenerating later
            userId: req.user._id
          });
    
          console.log('Resume upload successful:', resumeEntry);
          return res.redirect('/');
    
        } catch (error) {
          console.error('Error caught in uploadCV catch block:', error);
          return res.status(500).json({
            success: false,
            message: 'Failed to create resume entry.',
            error: error.message
          });
        }
  }
}