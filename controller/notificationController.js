const Notification = require('../model/notificationSchema');

module.exports = {
  getNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find({ recipient: req.user._id })
        .populate('sender', 'fullName role')
        .populate('jobId', 'jobTitle jobLocation')
        .sort({ createdAt: -1 })
        .lean();

      const unreadCount = notifications.filter(notification => !notification.isRead).length;

      return res.render('notifications', {
        notifications,
        unreadCount,
        User: req.user
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch notifications.',
        error: error.message
      });
    }
  },

  getUnreadCount: async (req, res) => {
    try {
      const unreadCount = await Notification.countDocuments({
        recipient: req.user._id,
        isRead: false
      });

      return res.status(200).json({
        success: true,
        unreadCount
      });
    } catch (error) {
      console.error('Error fetching unread notification count:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch unread notification count.',
        error: error.message
      });
    }
  },

  markAsRead: async (req, res) => {
    try {
      const notification = await Notification.findOneAndUpdate(
        {
          _id: req.params.notificationId,
          recipient: req.user._id
        },
        {
          $set: { isRead: true }
        },
        { new: true }
      );

      if (!notification) {
        return res.status(404).json({
          success: false,
          message: 'Notification not found.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Notification marked as read.',
        notification
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to mark notification as read.',
        error: error.message
      });
    }
  },

  markAllAsRead: async (req, res) => {
    try {
      const result = await Notification.updateMany(
        {
          recipient: req.user._id,
          isRead: false
        },
        {
          $set: { isRead: true }
        }
      );

      return res.status(200).json({
        success: true,
        message: 'All notifications marked as read.',
        modifiedCount: result.modifiedCount
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to mark all notifications as read.',
        error: error.message
      });
    }
  }
};
