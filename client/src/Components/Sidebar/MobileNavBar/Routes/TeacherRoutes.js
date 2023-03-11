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

export const teacherArrays = [
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
    label: 'Online Classes',
    icon: <HiOutlineStatusOnline />,
    path: `/client_academic/online_classes`,
  },
];

export const teacherStudentArray = [
  {
    label: 'Students',
    icon: <MdSubject />,
    path: `/client_student/students`,
  },
  {
    label: 'Promotion',
    icon: <AiOutlineCheck />,
    path: `/client_student/promotion`,
  },
];

export const teacherExamArray = [
  {
    label: 'Exams Results',
    icon: <MdSubject />,
    path: `/staff/results`,
  },
];
