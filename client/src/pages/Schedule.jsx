import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
`;

const Day = styled.th`
  background-color: #ddd;
  width: 150px;
  padding-right: 16px;
`;

const Subject = styled.td`
  background-color: #f0f0f0;
`;

const Details = styled.div`
  font-size: smaller;
  color: gray;
  margin-top: 4px;
`;

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    setTimetable([
      {
        day: 1,
        subject: 'Mathematics',
        start: '9:00 AM',
        end: '10:30 AM',
        room: '202',
        teacher: 'Ms. Smith',
      },
      {
        day: 1,
        subject: 'Science',
        start: '10:30 AM',
        end: '12:00 PM',
        room: '301',
        teacher: 'Mr. Johnson',
      },
      {
        day: 2,
        subject: 'English',
        start: '8:00 AM',
        end: '9:30 AM',
        room: '103',
        teacher: 'Ms. Davis',
      },
      {
        day: 2,
        subject: 'Physical Education',
        start: '9:30 AM',
        end: '11:00 AM',
        room: 'Gym',
        teacher: 'Mr. Brown',
      },
    ]);
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const scheduleByDay = Array(daysOfWeek.length)
    .fill(null)
    .map(() => []);

  timetable.forEach((schedule) => {
    const currentDay = schedule.day - 1;
    scheduleByDay[currentDay].push(schedule);
  });

  return (
    <Container>
      <Table>
        <tbody>
          {scheduleByDay.map((daySchedules, dayIndex) => {
            return (
              <tr key={dayIndex}>
                <Day>{daysOfWeek[dayIndex]}</Day>
                <td>
                  {daySchedules
                    .sort((a, b) => {
                      const timeA = new Date(`2000-01-01T${a.start}`);
                      const timeB = new Date(`2000-01-01T${b.start}`);
                      return timeA - timeB;
                    })
                    .map((schedule, i) => (
                      <Subject key={i}>
                        {schedule.subject}
                        <Details>
                          {schedule.start} - {schedule.end}
                          <br />
                          {schedule.teacher}
                        </Details>
                      </Subject>
                    ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Timetable;
