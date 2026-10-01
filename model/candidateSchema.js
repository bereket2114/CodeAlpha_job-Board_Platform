const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employers",
        required: true
    },
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resume",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobBoardUser",
        required: true
    }, 
    status: {
        type: String,
        enum: ['applied', 'interviewed', 'hired', 'rejected'],
        default: 'applied'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('jobapplications', candidateSchema)