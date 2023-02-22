const host = 'http://localhost:3001';
const permissions = [
  {
    name: 'Manage Inquiries',
    description: 'Manage Inquiries generated for the school',
    resources: ['/client_school/:id/enquiries'],
  },
  {
    name: 'Delete Students',
    resources: [`${host}/student_record/:id`],
  },
  {
    name: 'Add/Remove Staff Member',
    resources: ['/enquiries'],
  },
  {
    name: 'Manage Certificates',
    resources: ['/enquiries'],
  },
  {
    name: 'Manage Subjects',
    resources: ['/client_academic/:id/subjects'],
  },
  {
    name: 'Manage Student Attendance',
    resources: ['/client_academic/:id/attendance'],
  },
  {
    name: 'Manage Staff Exeats',
    resources: ['/enquiries'],
  },
  {
    name: 'Manage Live Classes',
    resources: ['/client_academic/:id/online_classes'],
  },
  {
    name: 'Manage Noticeboard',
    resources: ['/client_academic/:id/noticeboard'],
  },
  {
    name: 'Manage Expenses',
    resources: ['/enquiries'],
  },
  {
    name: 'Delete Invoices',
    resources: ['/enquiries'],
  },
  {
    name: 'View Stats-Amount',
    resources: ['/enquiries'],
  },
  {
    name: 'Manage Logs',
    description: 'Manage logs(logins) for the school',
    resources: ['/client_school/:id/logs'],
  },
  {
    name: 'Add/Remove Admins',
    resources: ['/enquiries'],
  },
  {
    name: 'Manage Admissions',
    resources: ['/enquiries'],
  },
  {
    name: 'Manage Student Promotions',
    resources: ['/enquiries'],
  },
  {
    name: 'Manage Classes and Sections',
    description: 'Add, update and delete Classes and sections for the school',
    resources: [
      '/client_academic/:id/class_sections',
      '/client_academic/:id/assign_classes',
    ],
  },
  {
    name: 'Manage Timetable',
    resources: ['/client_academic/:id/timetable'],
  },
  {
    name: 'Manage Staff Attendance',
    resources: ['/enquiries'],
  },
  {
    name: 'Manage Learning Materials',
    resources: ['/client_academic/:id/study_materials'],
  },
  {
    name: 'Manage Library',
    resources: ['/enquiries', 'view books,', 'library cards', 'books issued'],
  },
  {
    name: 'Manage Events',
    resources: ['/client_academic/:id/events'],
  },
  {
    name: 'Manage Income',
    resources: ['/enquiries'],
  },
  {
    name: 'Delete Payments',
    resources: ['/enquiries'],
  },
  {
    name: 'View Stats Expenses',
    resources: ['/enquiries'],
  },
  {
    name: 'Send Notification',
    resources: ['/enquiries'],
  },
  {
    name: 'Manage Students',
    description: ' delete, update students',
    resources: ['/client_student/:id/students'],
  },
  {
    name: 'Manage roles',
    resources: ['/houses', 'rooms'],
  },
  {
    name: 'Transfer Students',
    description: 'Transfer students to another school',
    resources: ['/client_student/:id/transfer'],
  },
  {
    name: 'Delete Class Sections',
    resources: ['http://localhost:3001//class_section/:id'],
  },
  {
    name: 'View Timetable',
    resources: ['/client_academic/:id/timetable'],
  },
  {
    name: 'Manage Students Exeats',
    resources: ['/client_academic/:id/exeat'],
  },
  {
    name: 'Manage Homework',
    resources: ['/client_academic/:id/homework'],
  },
  {
    name: 'Manage Transport',
    resources: ['/houses', 'rooms'],
  },
  {
    name: 'Manage Exams',
    resources: ['/houses', 'rooms'],
  },
  {
    name: 'Manage Invoices',
    resources: ['/houses', 'rooms'],
  },
  {
    name: 'View stats-Payments',
    resources: ['/houses', 'rooms'],
  },
  {
    name: 'View stats-Income',
    resources: ['/houses', 'rooms'],
  },
  {
    name: 'Manage Settings',
    description: 'Manage settings for the school',
    resources: ['/client_school/:id/settings'],
  },
];
module.exports = permissions;
