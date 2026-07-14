export const ALL_PROJECTS = [
  {
    title: 'Lindela Credential Manager',
    desc: 'Secure credential storage and management platform for streamlined verifications.',
    purpose: `This system is SecureVault (Lindela Credential Manager), a secure, role-based password and credential management application built for internal company use (specifically "Lindela Travel & Tours"). Its main purposes are:
• Secure Credential Storage: To securely store company assets such as domain logins, hosting accounts, marketing tools, and financial gateway credentials. Passwords and notes are encrypted in the database.
• Role-Based Access Control: Admins have full control to add/edit credentials, manage users, view system logs, and approve access. IT Staff/Regular Users are restricted and must submit an OTP Request.
• Audit & Analytics Logging: The system strictly logs every action providing complete transparency and security incident tracking.`,
    tech: `• Backend: Laravel 12 (PHP 8.2+), SQLite, Laravel Breeze, spatie/laravel-permission, pragmarx/google2fa-laravel, spatie/laravel-activitylog.
• Frontend: Laravel Blade, Tailwind CSS, Alpine.js, Inline SVG icons.`,
    tags: ['Security', 'SaaS', 'Laravel'],
    span: 'md:col-span-2',
    device: 'macbook' as const,
    image: '/lindela.png',
    images: [
      '/Lindela/login.png',
      '/Lindela/dash.png',
      '/Lindela/creds.png',
      '/Lindela/view creds.png',
      '/Lindela/employee  otp  req.png',
      '/Lindela/employee otp2.png',
      '/Lindela/adminn otp  accept.png',
      '/Lindela/useermannagement.png',
      '/Lindela/system logs.png',
    ]
  },
  {
    title: 'West Gate Realty Services with System',
    desc: 'Real estate property management and listing system with integrated client CRM.',
    purpose: `West Gate Realty Services is a complete, custom-built real estate management platform.
For the Public (Your Clients):
• Property Discovery: Browse properties, filter by type, view descriptions and image galleries.
• Trust Building: "Why West Gate", Testimonials, and "Recent Transactions".
• Lead Generation: Easy inquiries, messages, and bookings.
For the Administrator:
• Content Management System (CMS): Full control over website content without a developer.
• Customer Relationship Management (CRM): Track incoming inquiries and bookings.
• Real-time Alerts: Instant notifications for new form submissions.`,
    tech: `• Frontend: React.js (via Vite), Tailwind CSS, React Router, TanStack Query, Zustand.
• Backend & Database: Supabase, PostgreSQL, Supabase Storage, Supabase Realtime, Supabase Auth & RLS.`,
    tags: ['Web', 'Real Estate', 'React', 'Supabase'],
    device: 'macbook' as const,
    image: '/westgate.png',
    images: [
      '/westgaate/home.png',
      '/westgaate/property.png',
      '/westgaate/serv.png',
      '/westgaate/loginn  admin.png',
      '/westgaate/admin dashboard.png',
      '/westgaate/admin manage property.png',
      '/westgaate/admin innquiries.png',
      '/westgaate/contennnt maangeme.png',
    ]
  },
  {
    title: 'JobFinder',
    desc: 'Online Job Match (JobFinder) is a full-stack web-based job matching platform.',
    purpose: `Online Job Match (also called JobFinder) connects three types of users: Job Seekers, Employers, and Admins.

Features for Job Seekers:
• Job Browsing: Search and filter job listings
• Job Application: Apply to jobs with a form/resume upload
• Application Tracking: View application status (shortlisted, interview, hired, rejected)
• Profile Management: Build a personal profile
• Messaging: Communicate with employers
• Notifications: Real-time alerts on status changes
• Subscription Plans: Unlock premium features via subscription tiers

Features for Employers:
• Post Jobs: Create and manage job listings
• Candidate Management: Review and filter applicants
• Analytics: Job posting performance metrics
• Messaging: Communicate with applicants
• Notifications: Alerts for new applications
• Subscription Plans: Access premium posting quotas

Features for Admins:
• Admin Dashboard: Platform-wide overview
• User Management: Suspend/activate accounts
• Job Moderation: Review/remove job listings
• Subscription Management: Manage plans and billing
• Analytics & Reports: Platform usage insights
• Advertisement System: Create and manage pop-up ads`,
    tech: `Frontend:
• UI Framework: React 18, Vite, React Router v6
• Styling: TailwindCSS v3, Radix UI + Headless UI
• Animations: Framer Motion
• State Management: TanStack Query (React Query v5), Zustand
• Forms: React Hook Form + Zod
• Data Visualization: Recharts
• Icons: Lucide React + Heroicons
• Notifications: React Hot Toast
• Other: React Dropzone, Socket.io Client, date-fns, react-helmet-async

Backend / BaaS:
• Supabase: Database (PostgreSQL), Auth, Storage, Realtime
• Architecture: Protected routes with role-based guards (job_seeker, employer, institution_partner, admin)
• API Layer: Supabase JS client + Axios for external APIs
• Testing: Vitest + Testing Library
• PWA: vite-plugin-pwa (installable app)

Database:
• Key tables: profiles, jobs, applications, notifications, subscriptions, advertisements, messages`,
    tags: ['Web', 'Recruitment', 'Supabase'],
    device: 'macbook' as const,
    image: '/JobFider/jobfinder-mockup.png',
    images: [
      '/JobFider/jobfinder-mockup.png',
      '/JobFider/jobs phone.jpg',
      '/JobFider/home.png',
      '/JobFider/about.png',
      '/JobFider/employeer.png',
      '/JobFider/employer2.png',
      '/JobFider/employer3.png',
      '/JobFider/employer4.png',
      '/JobFider/admin dash.png',
      '/JobFider/admin aalyticsc.png',
      '/JobFider/admin job management.png',
    ]
  },
  {
    title: 'Silario Dental Clinic',
    desc: 'Complete website overhaul with online booking and patient management system.',
    purpose: `The Silario Dental Clinic Management System is a comprehensive, centralized web application designed to digitalize and streamline the daily operations of a modern dental clinic.

Core Features:
1. Interactive Clinical Charting:
• Dental Record Chart: Interactive visual grid of all 32 adult teeth with 16 color-coded diagnostic symbols.
• Orthodontic Treatment Chart: specialized module for tracking long-term orthodontic treatments, tracking elapsed time vs. estimated duration, and detailed logging for adjustments.
• Comprehensive Health History: Tracking 28 specific medical conditions, dental history, and TMJ/TMD symptoms.

2. Patient & Appointment Management:
• Calendar Integration: Robust scheduling system for doctor schedules and patient appointments.
• Queue Management: Real-time tracking of patient flow (Waiting, In Consultation, Completed).
• Emergency Cases: Specialized handling for emergency bookings.
• Patient Records: Secure digital profiles including demographics and uploaded files (x-rays).

3. Administrative & Financial Tools:
• Billing System: Invoice generation and payment tracking.
• Analytics & Dashboard: Visual data representation using charts and graphs.
• Medical Certificates & Printable Documents: Generation of highly styled, A4-ready HTML documents for printing.

4. Security & System Administration:
• Authentication & Authorization: Role-Level Security (RLS) to ensure staff only see what they are permitted to.
• Audit Logging: Strict tracking system monitoring administrative actions and clinical adjustments.
• Email Notifications: Automated email integration for password resets and appointment confirmations.`,
    tech: `Frontend:
• Core Framework: React 19 and Vite
• Styling & UI: Tailwind CSS, Headless UI
• Routing: React Router DOM
• Forms & Validation: Formik, Yup
• Data Visualization: Chart.js (via react-chartjs-2), Recharts
• Key Libraries: react-datepicker, react-icons, react-toastify, swiper, react-to-print

Backend & Infrastructure:
• Backend-as-a-Service (BaaS): Supabase
• Database: PostgreSQL
• Authentication: Supabase Auth
• Storage: Supabase Storage for patient profile pictures, x-rays, and documents
• Communication: Axios, EmailJS (for client-side email sending)`,
    tags: ['Web', 'UI/UX', 'Health'],
    device: 'macbook' as const,
    image: '/dental.png',
    images: [
      '/Silario/1.png',
      '/Silario/2.png',
      '/Silario/3.png',
      '/Silario/4.png',
      '/Silario/5.png',
      '/Silario/Doc dash.png',
      '/Silario/admin dash.png',
      '/Silario/doc dental chart.png',
      '/Silario/doc patient records.png',
      '/Silario/doc appointment calendar.png',
      '/Silario/doc appointments.png',
      '/Silario/doc queu managemnt.png',
      '/Silario/doctors analytics.png',
      '/Silario/admin appointment details.png',
      '/Silario/admin appointmet.png',
      '/Silario/admin paymeeent 2.png',
      '/Silario/admin queu management.png',
      '/Silario/admin service management.png',
      '/Silario/admin settings.png',
      '/Silario/adminn paaymets.png',
      '/Silario/aaadmin usermaanagement.png',
      '/Silario/aadmin billing.png',
      '/Silario/admin analytics.png',
      '/Silario/admin audit  logs.png',
    ]
  },
  {
    title: 'Deaf App',
    desc: 'HandsOn — Sign Language Learning App for beginners to learn communication through visual demos and audio cues.',
    purpose: `HandsOn is a sign language learning app for beginners that helps users learn how to communicate using sign language through visual demonstrations, videos, and audio cues.

Features:
• Welcome Screen: App intro with logo and "Get Started" button
• Onboarding: Introduction slides for first-time users
• Dashboard: Home screen with learning categories and progress overview
• Finger Spelling: Learn all 26 alphabet letters (A–Z) with hand gesture images and descriptions
• Basic Sign Language: Learn 7 common phrases (Hello, Thank You, Please, Sorry, You're Welcome, Yes, No) with MP4 video demos
• Audio Playback: Each basic sign has an accompanying audio pronunciation (MP3)
• Speech Recognition: Built-in speech-to-text feature (can be toggled on/off)
• Settings: Toggle speech recognition, adjust animation speed (0.5x–2x), change language (English/Spanish/French)
• Persistent Settings: Settings are saved locally using SharedPreferences`,
    tech: `Layer / Technology:
• Framework: Flutter (Dart)
• Database: sqflite (SQLite — mobile/desktop)
• Local Storage: shared_preferences
• Video Playback: video_player
• Audio Playback: audioplayers
• Speech-to-Text: speech_to_text
• Animations: lottie
• Font: Roboto (custom bundled)
• Target Platforms: Android, iOS, Windows, Web, Linux, macOS`,
    tags: ['Mobile', 'Accessibility', 'Flutter'],
    device: 'iphone' as const,
    image: '/DeafApp/1.jpg',
    images: [
      '/DeafApp/1.jpg',
      '/DeafApp/2.jpg',
      '/DeafApp/3.jpg',
      '/DeafApp/4.jpg',
      '/DeafApp/5.jpg',
      '/DeafApp/6.jpg',
      '/DeafApp/7.jpg',
      '/DeafApp/8.jpg',
      '/DeafApp/8.2.jpg',
      '/DeafApp/10.jpg',
    ]
  },
  {
    title: 'KUMADRONAS On-Call Duty System',
    desc: 'Automated scheduling and dispatch system for on-call midwives and medical staff.',
    purpose: `The Comadronas System (part of kumadronas-edu-iscc) is an Educational Management Information System (EMIS) designed to manage educational administrative tasks. It serves as a centralized portal for the school's stakeholders.

Key Features:
• Authentication & Authorization: Secure login, role-based access control, and approval workflows.
• Dashboard: Personalized landing area based on user roles (Student, Parent, Admin).
• User Management: Admin tools to approve registrations and activate profiles.
• Student Management: Managing student profiles and academic details.
• Parent-Student Linking: Parents can link and monitor multiple student accounts.
• Schedule Management: Creation and viewing of class schedules.
• Reports & Analytics: Visual data reports using Chart.js.
• Profile Settings & Support: Personal info management and dedicated user assistance.`,
    tech: `Frontend:
• React (v18.2.0)
• Tailwind CSS
• Lucide React (Icons)
• Chart.js & React-Chartjs-2
• Create React App

Backend & Database (Supabase):
• Authentication (Sessions, Magic Links, Password Recovery)
• PostgreSQL Database (Profiles, registrations, parent-student links)
• Row Level Security (RLS) & Real-time database interactions`,
    tags: ['Health', 'Scheduling', 'System'],
    device: 'macbook' as const,
    image: '/kumadronas.png',
    images: [
      '/kumadronas.png',
      '/Kumadronas/2.jpg',
      '/Kumadronas/3.jpg',
      '/Kumadronas/admin 1.jpg',
      '/Kumadronas/admin 2.jpg',
      '/Kumadronas/admin 3.jpg',
      '/Kumadronas/admin 3.2.jpg',
      '/Kumadronas/admin 4.jpg',
      '/Kumadronas/admin 5.jpg',
      '/Kumadronas/admin 6.jpg',
      '/Kumadronas/parent 1.jpg',
      '/Kumadronas/parent 22.jpg',
      '/Kumadronas/parent  3.jpg',
      '/Kumadronas/parent 4.jpg',
      '/Kumadronas/student 1.jpg',
      '/Kumadronas/student  2.jpg',
      '/Kumadronas/student  3.jpg',
      '/Kumadronas/studet  4.jpg'
    ]
  },
  {
    title: 'RAF & ROX Booking System',
    desc: 'RNR Booker — Full-stack barbershop management and appointment booking system with AI haircut recommendations.',
    purpose: `RNR Booker (R&R Booker) is a full-stack barbershop management and appointment booking system designed to digitize and streamline barbershop operations. It serves three user types — Customers, Barbers, and Managers — each with dedicated dashboards. Deployable as a PWA and native Android app via Capacitor.

Customer Features:
• Book Appointment — Browse barbers, select service, choose date/time
• Walk-in Queue — Join a barber's live queue without a fixed time slot
• Double Booking — Book on behalf of another person
• AI Haircut Recommender — face-api.js detects face shape and recommends hairstyles
• Product Catalog & Shopping Cart — Browse, add to cart, and place orders
• Real-time Notifications — Appointment confirmations and status alerts

Barber Features:
• Barber Dashboard & Schedule — Calendar-style view of all appointments
• Live Queue Management — Real-time walk-in and queued customer tracking
• Appointment Status Control — Mark as In Progress, Completed, or No-Show
• Barber Status Toggle — Set availability (Available / Busy / Off)

Manager Features:
• Manager Dashboard — Business summary: appointments, revenue, active barbers
• Manage Barbers, Services & Products — Full CRUD with stock tracking
• Manage Appointments — View, filter, reschedule, cancel any booking
• Reports — Appointments Report, Revenue Report, Inventory Report

AI Haircut Recommender:
• Detects face shape (oval, round, square, oblong, heart, diamond) using face-api.js
• Returns tailored haircut recommendations and saves history to Supabase

Mobile App (Android):
• Built with Capacitor v5 — native push & local notifications`,
    tech: `Frontend:
• React 18 (functional components + hooks)
• React Router DOM v6
• Bootstrap 5 & Bootstrap Icons
• face-api.js v0.22 (AI face detection)
• Custom CSS (App.css)

Backend / Database (Supabase):
• Supabase Auth — JWT sessions, OAuth-ready
• Supabase PostgreSQL — users, appointments, services, products, system_logs
• Supabase Storage — Profile pictures bucket
• Supabase Realtime — WebSocket live sync (appointments, queue)
• Row Level Security (RLS)

Custom Services Layer:
• ApiService.js — Centralized CRUD data access
• NotificationService.js — Real-time & scheduled notifications
• SessionManager.js — Auth session lifecycle
• StorageService.js — Supabase Storage abstraction

Mobile:
• Capacitor v5 — Cross-platform bridge (Android/iOS)
• @capacitor/push-notifications & local-notifications

Tooling:
• Create React App (Webpack + Babel)
• ESLint, Prettier, Jest + React Testing Library`,
    tags: ['Web', 'Booking', 'Mobile', 'AI'],
    device: 'iphone' as const,
    image: '/RnRbarber/1.jpg',
    images: [
      '/RnRbarber/1.jpg',
      '/RnRbarber/2.jpg',
      '/RnRbarber/signgupo.jpg',
      '/RnRbarber/customer.jpg',
      '/RnRbarber/customer2.jpg',
      '/RnRbarber/customer3.jpg',
      '/RnRbarber/customer4.jpg',
      '/RnRbarber/customer5.jpg',
      '/RnRbarber/customer6.jpg',
      '/RnRbarber/barber1.jpg',
      '/RnRbarber/barber2.jpg',
      '/RnRbarber/barber3.jpg',
      '/RnRbarber/barber4.jpg',
      '/RnRbarber/admin.jpg',
      '/RnRbarber/adminn2.jpg',
      '/RnRbarber/admin3.jpg',
      '/RnRbarber/admin4.jpg',
      '/RnRbarber/admin5.jpg',
      '/RnRbarber/admin6.jpg',
    ]
  },
  {
    title: '102nd-CDC-ROTC-Monitoring-System',
    desc: 'Centralized monitoring and cadet management system for the ROTC program.',
    purpose: `The 102nd CDC ROTC Monitoring System is a web-based management and monitoring platform designed specifically for administering Reserve Officers' Training Corps (ROTC) units across multiple schools within the 102nd Community Defense Center's jurisdiction. It digitizes, centralizes, and streamlines administrative operations by consolidating cadet records, performance grades, military serial number tracking, and school assignments into a single database.

Key Features:
• User Authentication & RBAC: Multi-tiered roles (Coordinator, CDC Personnel, Officer/Instructor) with secure access control.
• Cadet Profile & Directory: Comprehensive demographics, photo uploads, status tracking, and real-time search.
• Performance & Grade Management: Automates multi-criteria grading (attendance, quizzes, exams, military bearing) and term segregation.
• Military Serial Numbers: Tracks validity, prevents duplicates, and links unique serials directly to cadets.
• Analytics Dashboard: Real-time metrics on enrollment, active strength, passing rates, and visual charts.
• Administration: SQL database backups and data import scripts.`,
    tech: `Frontend:
• HTML5, CSS3, JavaScript (Vanilla)
• CSS Print Media (for formatted official reports)

Backend & Database:
• PHP (OOP / MVC Architecture)
• MySQL / MariaDB (Relational database mapping)
• Apache (XAMPP / WampServer)
• Authentication via PHP Sessions & Bcrypt Hashing`,
    tags: ['Education', 'System', 'Portal'],
    device: 'macbook' as const,
    image: '/mock3.png',
    images: [
      '/mock3.png',
      '/ROTC/1.jpg',
      '/ROTC/2.jpg',
      '/ROTC/4.jpg',
      '/ROTC/5.jpg',
      '/ROTC/6.jpg',
      '/ROTC/7.jpg',
      '/ROTC/8.jpg',
      '/ROTC/9.jpg'
    ]
  },
  {
    title: 'Barangay Management System',
    desc: 'Local government platform for citizen records, certificate issuance, and community announcements.',
    purpose: `The Barangay Portal System is an all-in-one local government administration and resident services portal designed to digitize and streamline operations at the grassroots barangay level. It transitions traditional paper-based operations into a centralized digital ecosystem, facilitating secure authentication, census tracking, official document requests, blotter case mediation, public asset management, and local announcements.

Key Features:
• User & Account Management: Role-based dashboards (Admin, Secretary, Resident) with Google OAuth integration.
• Resident & Household Census: RBI Census Compliance (Forms A, B, C), managing vital stats and demographics.
• Official & Personnel Management: Tracks terms of office for officials, Tanod shifts, and Health Worker assignments.
• Document Request Workflow: Online requests for clearances and certificates with payment tracking and PDF generation.
• Blotter & Mediation Scheduling: Logs incidents and schedules amicable hearings (Mediation, Conciliation, Arbitration).
• Public Assets & Inventory: Tracks and manages borrowing requests for community resources (tents, chairs, etc.).
• Health Tracking: Monitors vaccination metrics and WRA (Women of Reproductive Age) health tracking.`,
    tech: `Backend & Database:
• PHP 8.x (Processes business logic and routing)
• MySQL (Relational database with prepared statements)
• Google Client API (OAuth integration for resident logins)

Frontend & UI:
• HTML5 & CSS3
• Bootstrap 4 & AdminLTE 3 (Responsive dashboard interface)
• jQuery & Javascript (AJAX forms and dynamic updates)
• SweetAlert2 & FontAwesome`,
    tags: ['GovTech', 'System', 'Web'],
    device: 'macbook' as const,
    image: '/BMS/COVER.png',
    images: [
      '/BMS/COVER.png',
      '/BMS/dash.jpg',
      '/BMS/2.jpg',
      '/BMS/3.jpg',
      '/BMS/4.jpg',
      '/BMS/5.jpg',
      '/BMS/6.jpg',
      '/BMS/7.jpg',
      '/BMS/8.jpg',
      '/BMS/9.jpg'
    ]
  },
  {
    title: 'Human Resource Management System',
    desc: 'Full-suite HR platform covering payroll, attendance, employee records, and performance tracking.',
    purpose: `The HR Administration Office Management System is specifically designed for the Ilocos Sur Community College. It serves as a centralized platform to manage all human resource processes and records, solving the problem of inefficient HR administration by streamlining everything from employee data management to payroll processing.

Key Features:
• Dashboard: Overview statistics, recent activity feeds, and department distribution analytics.
• Personnel Management: Employee records, document uploads, and employment tracking.
• Attendance Tracking: Daily attendance and monthly summaries.
• Leave Management: Leave requests, manager approvals, and balance tracking.
• Payroll Processing: Payroll computation, earnings/deductions management, and payslip generation.
• Performance Evaluations: Evaluation forms, scoring, and employee review workflows.
• Recruitment: Job postings, applicant tracking, and hiring process management.
• Training Management: Training programs, enrollments, and history tracking.
• Reports & Analytics: Cross-module analytics with CSV data exports.
• Security & RBAC: College Administrator (full access) and HR Staff (restricted) roles.
• Audit Logs: Comprehensive activity logging with change tracking for all CRUD operations.
• Data Backup: Built-in database backup, download, and restore tools.`,
    tech: `Backend:
• PHP 8.x (Custom OOP/MVC Framework)
• Apache (mod_rewrite via .htaccess for URL routing)

Database:
• MySQL / MariaDB (PDO singleton for database interactions)

Frontend:
• HTML5
• Tailwind CSS (via CDN)
• Alpine.js (via CDN for lightweight JS interactions)

Security:
• bcrypt (cost factor 12) for password hashing
• CSRF tokens for form protection
• PDO Prepared Statements (SQL injection prevention)
• Strict session management & output sanitization (htmlspecialchars())`,
    tags: ['HR', 'SaaS', 'System'],
    device: 'macbook' as const,
    image: '/HRMS/Cover.png',
    images: [
      '/HRMS/Cover.png',
      '/HRMS/1.jpg',
      '/HRMS/2.jpg',
      '/HRMS/3.jpg',
      '/HRMS/4.jpg',
      '/HRMS/5.jpg',
      '/HRMS/6.jpg',
      '/HRMS/7.jpg',
      '/HRMS/8.jpg',
      '/HRMS/9.jpg',
      '/HRMS/10.jpg',
      '/HRMS/11.jpg',
      '/HRMS/12.jpg',
      '/HRMS/13.jpg',
      '/HRMS/14.jpg',
      '/HRMS/15.jpg'
    ]
  },
  {
    title: 'Scholarship Management System',
    desc: 'Centralized scholarship administration platform for managing applicants, grants, and academic compliance.',
    purpose: `The ISCC Scholarship Management System is a web-based application designed to streamline the administration, application, and tracking of scholarship programs for the Ilocos Sur Community College (ISCC). It replaces manual paper-based inefficiencies with a fully digitized online application process, providing transparency and eliminating communication bottlenecks.

Key Features:
• For Students: Secure online portal, multi-step application form with secure document uploads (PDF, JPG, PNG), real-time status tracking, and automated email notifications.
• For Administrators: Centralized dashboard for evaluating and managing hundreds of applications, searchable student directory, and announcement broadcast system.
• Automated Reminders: One-click functionality to send out mass emails to existing scholars for renewal deadlines.
• System Settings: Role-based access control (Super Admin vs. Standard Admin), branding customization, and security management.`,
    tech: `Backend & Database:
• PHP (Core server-side business logic)
• PDO (PHP Data Objects for secure database connections)
• MySQL / MariaDB (Relational database management)

Frontend:
• HTML5 & CSS3
• Tailwind CSS (Utility-first CSS framework for rapid UI development)
• Alpine.js (Lightweight JS framework for interactivity)
• Animate.css (Subtle animations and transitions)

Integrations:
• PHPMailer (SMTP connections for automated email notifications)
• QR Server API (Dynamic QR code generation)`,
    tags: ['Education', 'EdTech', 'System'],
    device: 'macbook' as const,
    image: '/SMS/cover.png',
    images: [
      '/SMS/cover.png',
      '/SMS/1.jpg',
      '/SMS/2.jpg',
      '/SMS/3.jpg',
      '/SMS/4.jpg',
      '/SMS/5.jpg',
      '/SMS/6.jpg',
      '/SMS/7.jpg',
      '/SMS/8.jpg',
      '/SMS/9.jpg',
      '/SMS/10.jpg',
      '/SMS/11.jpg',
      '/SMS/12.jpg'
    ]
  },
  {
    title: 'Smart Slip Management System',
    desc: 'Employee gate pass system for requesting, approving, and tracking temporary exit/entry permits.',
    purpose: `SmartSlip Management (Employee Gate Pass System) digitizes the entire process of tracking employee movements, temporary exit/entry permits, and visitor access. By replacing slow and easily falsified manual paper "gate pass" systems, it provides a secure, fully logged, and organized centralized platform. It tackles the challenge of monitoring off-site employees by integrating GPS coordinate logging.

Key Features:
• Gate Pass/Permit Management: Request, approve, and track the complete lifecycle of official/personal gate passes.
• Time & Movement Tracking: Precisely records exit and return times to aid in payroll and productivity monitoring.
• GPS Logging & Tracking: Uploads and logs GPS coordinates (via batch scripts) to verify the location of field employees.
• Employee Directory: Manages employee profiles, departments, and designations for structured reporting.
• Visitor Management: A dedicated module to log and track external visitors entering the premises.
• Admin Dashboard & Reporting: Approvals, system logs, user management, and detailed movement reports.
• Role-Based Access Control: Different interfaces and permissions for standard employees vs. administrators.`,
    tech: `Backend & Database:
• PHP (Core server-side logic using OOP)
• MySQL / MariaDB (Relational data storage for users, permits, GPS logs)

Frontend:
• HTML5 & CSS3 (Custom styling with modern glassmorphism UI)
• Google Fonts ('Orbitron' and 'Poppins')
• JavaScript (Form handling and interactivity)
• Bootstrap & Plugins (Datepicker, timepicker)

Environment & Utilities:
• Apache/XAMPP (Local hosting environment)
• Windows Batch Scripting (Automating GPS tracker data sync to the server)`,
    tags: ['Admin', 'Workflow', 'Web'],
    device: 'iphone' as const,
    image: '/smartslip/cover.png',
    images: [
      '/smartslip/cover.png',
      '/smartslip/1.jpg',
      '/smartslip/2.jpg',
      '/smartslip/admin.jpg',
      '/smartslip/admin2.jpg',
      '/smartslip/admi2.2.jpg',
      '/smartslip/admin3.jpg',
      '/smartslip/admin4.jpg',
      '/smartslip/admi4.jpg',
      '/smartslip/adminn5.jpg'
    ]
  },

]
