const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobBoardUser',
      required: true,
      index: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobBoardUser',
      default: null
    },
    type: {
      type: String,
      enum: ['new_application', 'application_status'],
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employers',
      default: null
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobapplications',
      default: null
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true
  }
);

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('notification', notificationSchema);
