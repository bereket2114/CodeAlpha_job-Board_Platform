# CodeAlpha Job Board Platform

A full-stack **Job Board Platform** developed for the **CodeAlpha Backend Development Internship — Task 4**.

The platform connects **employers and candidates** through a complete job recruitment workflow: employers can publish jobs and manage applicants, while candidates can search jobs, upload resumes, apply for positions, track application status, and receive notifications.

## 📌 CodeAlpha Task 4

This project addresses the main requirements of the Job Board Platform task:

- Backend using **Express.js / Node.js**
- Job listings and employer management
- Candidate and application management
- Resume upload and storage
- Job search and location filtering
- Job applications and duplicate-application prevention
- Application status updates
- Employer and candidate notifications
- Authentication and protected routes

## 🚀 Features

### 👤 Authentication

- Candidate and employer registration
- Login and logout
- Session-based authentication with Passport.js
- Password hashing with bcrypt
- Protected routes
- Employer-only access for employer dashboard actions

### 💼 Employer Features

- Create and publish job listings
- Define job title, location, salary, requirements, responsibilities, education, and experience
- View applicants for posted jobs
- Access candidate resume information
- Update application status
- Receive notifications when candidates apply

### 🔎 Candidate Features

- Browse available jobs
- Search jobs by keyword
- Filter jobs by location
- View detailed job information
- Upload a resume
- Apply for jobs
- Prevent duplicate applications
- View and track submitted applications
- Receive notifications when an employer updates application status

### 📄 Resume Management

- Resume upload with Multer
- Cloudinary integration for file storage
- Resume metadata stored in MongoDB
- Secure resume access using Cloudinary URLs

### 🔔 Notification System

The notification system supports both sides of the application workflow.

**New application:**

```text
Candidate applies for a job
        ↓
Application is stored
        ↓
Employer notification is created
        ↓
Employer sees unread notification
```

**Application status update:**

```text
Employer changes application status
        ↓
Application is updated
        ↓
Candidate notification is created
        ↓
Candidate sees the update
```

Notification features include:

- Unread notification count
- Mark individual notification as read
- Mark all notifications as read
- Dedicated notifications page
- Automatic notifications for application events

## 🛠️ Technology Stack

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

### Authentication & Security

- **Passport.js**
- **Passport Local Strategy**
- **bcrypt**
- **express-session**
- **connect-mongo**

### File Handling

- **Multer**
- **Cloudinary**
- **Streamifier**

### Frontend

- **EJS**
- **HTML**
- **CSS**
- **JavaScript**

### Other Tools

- **Morgan** for HTTP request logging
- **Method Override** for PUT-style form requests
- **dotenv** for environment variables

## 🏗️ Project Structure

```text
codeAlpha_JobBoard/
│
├── config/
│   ├── DB_Connection.js
│   └── passportConfig.js
│
├── controller/
│   ├── employerController.js
│   ├── jobApply-Controller.js
│   ├── notificationController.js
│   ├── resume-Controller.js
│   └── userController.js
│
├── middleware/
│   ├── cloudinary.js
│   ├── ensureAuth.js
│   ├── multer.js
│   └── notificationLocals.js
│
├── model/
│   ├── candidateSchema.js
│   ├── employersSchema.js
│   ├── notificationSchema.js
│   ├── resumeSchema.js
│   └── userModel.js
│
├── route/
│   ├── applicationRoutes.js
│   ├── employersRoute.js
│   ├── jobRoute.js
│   ├── notificationRoutes.js
│   ├── resume-Route.js
│   └── userRoutes.js
│
├── services/
│   └── notificationService.js
│
├── views/
│   ├── candidates.ejs
│   ├── employers.ejs
│   ├── jobDetails.ejs
│   ├── jobs.ejs
│   ├── login.ejs
│   ├── myApplication.ejs
│   ├── notifications.ejs
│   ├── register.ejs
│   ├── resume.ejs
│   └── partials/
│       └── notification-nav.ejs
│
├── public/
│   ├── JS/
│   │   └── main.js
│   ├── auth.css
│   ├── password-visibility.js
│   └── style.css
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## 🔗 Main Routes

### Job Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | View available jobs |
| GET | `/details/:id` | View job details |
| GET | `/search` | Search and filter jobs |

### Employer Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employers/` | Employer dashboard |
| GET | `/employers/applied-candidates` | View applicants |
| GET | `/employers/applied-candidates/job` | View job/application status data |
| POST | `/employers/jobs` | Create a job listing |

### Application Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/applications/` | Candidate's applications |
| POST | `/applications/apply` | Apply for a job |
| PUT | `/applications/update-status/:candidateId/status` | Update application status |

### Resume Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/resume/` | View resume page |
| POST | `/resume/upload` | Upload a resume |

### Notification Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/notifications/` | View notifications |
| GET | `/notifications/unread-count` | Get unread notification count |
| PUT | `/notifications/read-all` | Mark all notifications as read |
| PUT | `/notifications/:notificationId/read` | Mark one notification as read |

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/CodeAlpha_JobBoard.git
cd CodeAlpha_JobBoard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Create:

```text
config/.env
```

Use `.env.example` as a template.

Example:

```env
DB_String=your_mongodb_connection_string
PORT=3000
SESSION_SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_SECRET=your_cloudinary_api_secret
API_KEY=your_cloudinary_api_key
SECRET_KEY=your_cloudinary_secret_key
```

> Never commit your real `config/.env` file to GitHub.

### 4. Start the application

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

For development with automatic restart, you can use:

```bash
npx nodemon server.js
```

## 🔄 Application Workflow

```text
                    ┌──────────────────┐
                    │     Employer     │
                    └────────┬─────────┘
                             │
                       Post a Job
                             │
                             ▼
                    ┌──────────────────┐
                    │   Job Listing    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Candidate     │
                    └────────┬─────────┘
                             │
                  Search / View Job
                             │
                             ▼
                      Upload Resume
                             │
                             ▼
                      Apply for Job
                             │
                             ▼
                    ┌──────────────────┐
                    │   Application    │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
          Employer gets             Employer reviews
          notification                  applicant
                                          │
                                          ▼
                                  Update application
                                       status
                                          │
                                          ▼
                                   Candidate gets
                                    notification
                                          │
                                          ▼
                                  Track application
```

## 🗄️ Main Data Models

### User

Stores authentication information and user role such as candidate or employer.

### Employer / Job

Stores employer information and job listing details, including the employer responsible for posting the job.

### Resume

Stores candidate resume information and the Cloudinary file reference.

### Application

Stores the relationship between a candidate, job, resume, application date, and application status.

### Notification

Stores the notification recipient, sender, notification type, message, related job/application information, and read status.

## 🔐 Security & Access Control

The project uses:

- Session authentication
- Passport.js authentication
- bcrypt password hashing
- Protected routes
- Employer-only route checks
- Environment variables for credentials and API secrets

## 📸 Suggested Demo Flow

For a project demonstration video, the recommended flow is:

1. Log in as an employer.
2. Create and publish a job.
3. Log in as a candidate.
4. Search for the newly published job.
5. Open the job details.
6. Upload a resume.
7. Apply for the job.
8. Return to the employer account.
9. Open applicants.
10. Show the employer notification.
11. Update the application status.
12. Return to the candidate account.
13. Show the candidate notification.
14. Open **My Applications** and show the updated status.

## 🎯 Project Purpose

This project was developed to gain practical experience in:

- Backend development with Node.js and Express.js
- MVC-style application architecture
- MongoDB database design
- Authentication and sessions
- REST-style routing
- File upload and cloud storage
- Search and filtering logic
- Application workflow management
- Authorization
- Notification systems

## 👨‍💻 Author

**Bereket Woldemariyam**

Backend Development Intern — CodeAlpha

## 📄 Internship Task

**CodeAlpha Backend Development Internship — Task 4: Job Board Platform**

---

⭐ If you find this project useful, feel free to explore the repository and connect with me on LinkedIn.
