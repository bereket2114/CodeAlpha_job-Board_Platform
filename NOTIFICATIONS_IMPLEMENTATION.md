# JobBoard Notification System

This version adds the CodeAlpha Task 4 notification requirement to the existing JobBoard application.

## Notification flow

1. Candidate submits an application.
2. The application is saved in `jobapplications`.
3. An in-app notification is created for the employer who owns the job.
4. The employer sees an unread badge in the navigation and can open `/notifications`.
5. Employer changes an application status.
6. The status is saved only when the logged-in employer owns the job.
7. The candidate receives an in-app status notification.

## New files

- `model/notificationSchema.js`
- `services/notificationService.js`
- `controller/notificationController.js`
- `route/notificationRoutes.js`
- `middleware/notificationLocals.js`
- `views/notifications.ejs`
- `views/partials/notification-nav.ejs`

## Updated files

- `server.js`
- `controller/jobApply-Controller.js`
- `controller/employerController.js`
- `controller/resume-Controller.js`
- `route/employersRoute.js`
- `public/JS/main.js`
- authenticated EJS pages include the notification navigation partial

## Notification API

- `GET /notifications` - notification page
- `GET /notifications/unread-count` - unread count JSON API
- `PUT /notifications/read-all` - mark all notifications as read
- `PUT /notifications/:notificationId/read` - mark one notification as read

## Important environment setup

Copy `.env.example` to `config/.env` and fill in the real MongoDB, session, and Cloudinary credentials locally.
Do not commit `config/.env` to a public repository.
