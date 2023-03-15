import { AiOutlineSetting, AiOutlineLeft } from 'react-icons/ai';
import { BsCalendarEvent } from 'react-icons/bs';
import { MdLogout, MdSubject } from 'react-icons/md';
import { FaSuitcase, FaQuestion, FaSchool, FaHandPaper } from 'react-icons/fa';
import { IoMdSettings, IoIosSchool } from 'react-icons/io';
import { TbNewSection } from 'react-icons/tb';
import { SiGoogleclassroom } from 'react-icons/si';
import {
  AiOutlineTable,
  AiOutlineCheck,
  AiOutlineNotification,
  AiOutlineDashboard,
} from 'react-icons/ai';
import { BiIntersect, BiBook, BiBookAdd } from 'react-icons/bi';
import { HiOutlineStatusOnline } from 'react-icons/hi';

export const schoolArray = [
  {
    label: 'School Dashboard',
    icon: <FaSchool />,
    path: `/client_school`,
  },
  {
    label: 'Inquiries',
    icon: <FaQuestion />,
    path: `/client_school/enquiries`,
  },
  {
    label: 'Settings',
    icon: <IoMdSettings />,
    path: `/client_school/settings`,
  },
  {
    label: 'Logs',
    icon: <FaSuitcase />,
    path: `/client_school/logs`,
  },
];

export const academicArray = [
  {
    label: 'Academic Dashboard',
    icon: <AiOutlineDashboard />,
    path: `/client_academic`,
  },
  {
    label: 'Class Sections',
    icon: <BiIntersect />,
    path: `/client_academic/class_sections`,
  },
  {
    label: 'Subjects',
    icon: <MdSubject />,
    path: `/client_academic/subjects`,
  },
  {
    label: 'Timetable',
    icon: <AiOutlineTable />,
    path: `/client_academic/timetable`,
  },
  {
    label: 'Attendance',
    icon: <AiOutlineCheck />,
    path: `/client_academic/attendance`,
  },
  {
    label: 'Exeat',
    icon: <FaHandPaper />,
    path: `/client_academic/exeat`,
  },
  {
    label: 'Learning Materials',
    icon: <BiBook />,
    path: `/client_academic/study_materials`,
  },
  {
    label: 'Homework',
    icon: <BiBookAdd />,
    path: `/client_academic/homework`,
  },
  {
    label: 'Noticeboard',
    icon: <AiOutlineNotification />,
    path: `/client_academic/noticeboard`,
  },
  {
    label: 'Events',
    icon: <BsCalendarEvent />,
    path: `/client_academic/events`,
  },
  {
    label: 'Online Classes',
    icon: <HiOutlineStatusOnline />,
    path: `/client_academic/online_classes`,
  },
];
export const studentArray = [
  {
    label: 'Student Dashboard',
    icon: <AiOutlineDashboard />,
    path: `/client_student`,
  },
  {
    label: 'Admission',
    icon: <BiIntersect />,
    path: `/client_student/admission`,
  },
  {
    label: 'Students',
    icon: <MdSubject />,
    path: `/client_student/students`,
  },
  {
    label: 'I.D Cards',
    icon: <AiOutlineTable />,
    path: `/client_student/id`,
  },
  {
    label: 'Promotion',
    icon: <AiOutlineCheck />,
    path: `/client_student/promotion`,
  },
  {
    label: 'Student Transfers',
    icon: <FaHandPaper />,
    path: `/client_student/transfer`,
  },
  {
    label: 'Certifications',
    icon: <BiBook />,
    path: `/client_student/certificate`,
  },
];

export const adminArray = [
  {
    label: 'Admin Dashboard',
    icon: <AiOutlineDashboard />,
    path: `/staff`,
  },
  // {
  //   label: 'Admins',
  //   icon: <BiIntersect />,
  //   path: `/staff/admin`,
  // },
  {
    label: 'Roles',
    icon: <MdSubject />,
    path: `/staff/roles`,
  },
  {
    label: 'Staff List',
    icon: <AiOutlineTable />,
    path: `/staff/staffs`,
  },
  {
    label: 'Staff Attendance',
    icon: <AiOutlineCheck />,
    path: `/staff/attendance`,
  },
  {
    label: 'Staff Exeats',
    icon: <FaHandPaper />,
    path: `/staff/exeat`,
  },
];

export const examArray = [
  {
    label: 'Exams Dashboard',
    icon: <AiOutlineDashboard />,
    path: `/exams`,
  },
  {
    label: 'Manage Exams',
    icon: <BiIntersect />,
    path: `/exams/exam`,
  },
  {
    label: 'Exams Results',
    icon: <MdSubject />,
    path: `/exam/exam_results`,
  },
  {
    label: 'Print result',
    icon: <AiOutlineTable />,
    path: `/exams/print_result`,
  },
  {
    label: 'Result Assessment',
    icon: <AiOutlineCheck />,
    path: `/staff/result_assessment`,
  },
  // {
  //   label: 'Staff Exeats',
  //   icon: <FaHandPaper />,
  //   path: `/staff/exeat`,
  // },
];

export const schoolManagementArray = [
  {
    label: 'School Management',
    icon: <FaSchool />,
    path: '/school_management',
  },
  {
    label: 'Schools',
    icon: <IoIosSchool />,
    path: '/school_management/schools',
  },
  {
    label: 'Classes',
    icon: <SiGoogleclassroom />,
    path: '/school_management/classes',
  },
  {
    label: 'Terms/Semester',
    icon: <TbNewSection />,
    path: '/school_management/terms',
  },
];
