import React from 'react';
import Schedule from '../../Schedule';

const TimeTable = () => {
  const data = [
    {
      day: 'Monday',
      subject: 'Mathematics',
      roomNumber: '101',
      startTime: '09:00',
      endTime: '10:30',
      teacher: 'Mr. Smith',
    },
    {
      day: 'Monday',
      subject: 'History',
      roomNumber: '102',
      startTime: '11:00',
      endTime: '12:30',
      teacher: 'Ms. Johnson',
    },
    {
      day: 'Monday',
      subject: 'Science',
      roomNumber: '103',
      startTime: '13:00',
      endTime: '14:30',
      teacher: 'Dr. Brown',
    },
    {
      day: 'Tuesday',
      subject: 'English',
      roomNumber: '201',
      startTime: '09:00',
      endTime: '10:30',
      teacher: 'Mrs. Davis',
    },
    {
      day: 'Tuesday',
      subject: 'Physical Education',
      roomNumber: '202',
      startTime: '11:00',
      endTime: '12:30',
      teacher: 'Mr. Wilson',
    },
    {
      day: 'Wednesday',
      subject: 'Art',
      roomNumber: '301',
      startTime: '09:00',
      endTime: '10:30',
      teacher: 'Ms. Martinez',
    },
    {
      day: 'Wednesday',
      subject: 'Music',
      roomNumber: '302',
      startTime: '11:00',
      endTime: '12:30',
      teacher: 'Mr. Lee',
    },
    {
      day: 'Wednesday',
      subject: 'Computer Science',
      roomNumber: '303',
      startTime: '13:00',
      endTime: '14:30',
      teacher: 'Ms. Kim',
    },
  ];
  return (
    <>
      <Schedule data={data} />
    </>
  );
};

export default TimeTable;
