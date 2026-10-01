const mongoose = require('mongoose')

const employersSchema = new mongoose.Schema({
    jobTitle:{
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobLocation:{ 
        type: String,
        required: true
    },
    jobRequirements: {
        type: [String],
        required: true
    },
    jobSalary: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobBoardUser",
        required: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('employers', employersSchema)