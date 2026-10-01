const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
    pdfUrl: {
        type: String,
        required: false // because I generate signed URLs on the fly
    },
    cloudinaryId: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobBoardUser",
        required: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('resume', resumeSchema)