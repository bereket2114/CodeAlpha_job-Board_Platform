const Notification = require('../model/notificationSchema');

const createNotification = async ({
  recipient,
  sender = null,
  type,
  title,
  message,
  jobId = null,
  applicationId = null
}) => {
  if (!recipient) {
    throw new Error('Notification recipient is required.');
  }

  return Notification.create({
    recipient,
    sender,
    type,
    title,
    message,
    jobId,
    applicationId
  });
};

module.exports = { createNotification };
