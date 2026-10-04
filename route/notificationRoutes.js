const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/ensureAuth');
const notificationController = require('../controller/notificationController');

router.get('/', ensureAuthenticated, notificationController.getNotifications);
router.get('/unread-count', ensureAuthenticated, notificationController.getUnreadCount);
router.put('/read-all', ensureAuthenticated, notificationController.markAllAsRead);
router.put('/:notificationId/read', ensureAuthenticated, notificationController.markAsRead);

module.exports = router;
