import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaSchool } from 'react-icons/fa';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import Spinner from '../../../Components/Spinner/Spinner';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { baseUrl } from '../../../helpers/baseUrl';
import AddView from '../../../Components/AddViewComponent/AddView';
import { TertiaryButton } from '../../../Components/Buttons/TertiaryButton';

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
    border: 1px solid ${({ theme }) => theme.text};
    padding: 8px;
  }
`;

const Day = styled.th`
  background-color: inherit;
  width: 150px;
  padding-right: 16px;
`;

const Subject = styled.td`
  background-color: ${({ theme }) => theme.bg3};
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Details = styled.div`
  font-size: smaller;
  color: gray;
  margin-top: 4px;
`;

const Schedule = () => {
  const [timetable, setTimetable] = useState([]);
  const { auth, currentData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const printTimetable = () => {
    const table = document.getElementById('timetable-table');
    const tableClone = table.cloneNode(true);
    tableClone.style.width = '100%';

    const printContainer = document.createElement('div');
    printContainer.appendChild(tableClone);
    printContainer.style.display = 'none';
    document.body.appendChild(printContainer);

    window.print();

    document.body.removeChild(printContainer);
  };

  useEffect(() => {
    setLoading(true);
    const getAllTimeTableData = async () => {
      const res = await axios.post(`${baseUrl}/timetable/class`, {
        sectionId: currentData?.sectionId,
        termId: auth?.currentTermId._id,
      });
      setTimetable(res.data);
      console.log(res.data);
      setLoading(false);
    };
    getAllTimeTableData();
  }, [currentData, auth.currentTermId._id]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const scheduleByDay = Array(daysOfWeek.length)
    .fill(null)
    .map(() => []);

  timetable.forEach((schedule) => {
    const currentDay = schedule.day - 1;
    scheduleByDay[currentDay].push(schedule);
  });

  return (
    <>
      {loading ? (
        <>
          {' '}
          <Spinner />
        </>
      ) : (
        <Layout>
          <LocationLabel
            label={auth?.schoolId.label.toUpperCase()}
            icon={<FaSchool />}
          >
            <TermSelector />
          </LocationLabel>
          <AddView>
            <TertiaryButton onClick={printTimetable} label='Print Timetable' />
          </AddView>
          <Container>
            <Table id='timetable-table'>
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
                              {schedule.subjectId?.label}
                              <Details>
                                {schedule.startTime} - {schedule.endTime}
                                <br />
                                {schedule.subjectId?.type}
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
        </Layout>
      )}
    </>
  );
};

export default Schedule;
