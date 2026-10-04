const Notification = require('../model/notificationSchema');

module.exports = async (req, res, next) => {
  res.locals.unreadNotificationCount = 0;

  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return next();
  }

  try {
    res.locals.unreadNotificationCount = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false
    });
  } catch (error) {
    console.error('Notification badge error:', error);
    // Notification failures should not break the rest of the application.
    res.locals.unreadNotificationCount = 0;
  }

  return next();
};
