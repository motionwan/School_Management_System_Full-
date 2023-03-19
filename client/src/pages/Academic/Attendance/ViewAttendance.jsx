import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../Components/Layout/Layout';
import { baseUrl } from '../../../helpers/baseUrl';
import Spinner from '../../../Components/Spinner/Spinner';
import AuthContext from '../../../context/AuthContext/AuthContext';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { Link } from 'react-router-dom';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import styled from 'styled-components';
import { useFormik } from 'formik';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parseISO,
  parse,
} from 'date-fns';
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableContainer,
} from '../../../Components/Table/Table.styles';
import AttendanceSchema from '../../../formSchema/Attendance/AttendanceShema';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import TextInput from '../../../Components/Input/Input';
import Notification from '../../../Components/Notification/Notification';

const InputContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
  min-height: 140px;
  display: flex;
  gap: 20px;
  padding: 10px;

  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
  }
`;

const ViewAttendance = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    format(Date.now(), 'yyyy-MM')
  );
  const [attendanceData, setAttendanceData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [classSchools, setClassSchools] = useState(null);
  const [section, setSection] = useState(null);
  const { auth } = useContext(AuthContext);

  const parsedDate = parse(selectedDate, 'yyyy-MM', new Date());
  // const month = getMonth(parsedDate);

  const monthStart = startOfMonth(parsedDate);
  const monthEnd = endOfMonth(parsedDate);
  const datesArray = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const groupedAttendance = attendanceData.reduce((acc, curr) => {
    const name = curr.student.name;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(curr.attendance);
    return acc;
  }, {});

  // handle errors with this function
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  // find all classes
  useEffect(() => {
    const arr = [];
    const getAllClassSchools = async () => {
      const res = await axios.get(`${baseUrl}/class_school`);
      res.data.forEach((classSchool) => {
        arr.push({
          label: classSchool.classId.label,
          value: classSchool._id,
        });
      });
      setClassSchools(arr);
    };
    getAllClassSchools();
  }, [auth]);

  const onSubmit = async () => {
    setPageLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/student_attendance/monthly`, {
        sectionId: values.sectionId,
        date: values.date,
      });
      setAttendanceData(res.data);
      setPageLoading(false);
    } catch (err) {
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  const {
    values,
    errors,
    setValues,
    handleBlur,
    touched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      date: selectedDate,
      classSchoolId: '',
      sectionId: '',
    },
    validationSchema: AttendanceSchema,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (values.classSchoolId) {
      const arr = [];
      const getAllClassSchoolsForSchool = async () => {
        const res = await axios.get(
          `${baseUrl}/class_section/${values.classSchoolId}`
        );
        res.data.forEach((classSchool) => {
          arr.push({
            label: classSchool.label,
            value: classSchool._id,
          });
        });
        setSection(arr);
      };
      getAllClassSchoolsForSchool();
    }
  }, [values.classSchoolId]);

  return (
    <div>
      {pageLoading ? (
        <>
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
            <Link to={`/client_academic/add_attendance `}>
              <PrimaryButton label='Take Attendance' icon={<FaPlusCircle />} />
            </Link>
          </AddView>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <div style={{ width: '100%' }}>
                <CustomSelect
                  label='class'
                  placeholder='Select Class'
                  name='classSchoolId'
                  options={classSchools}
                  onChange={(e) => {
                    setFieldValue('classSchoolId', e.value);
                  }}
                />
                {errors.classSchoolId && touched.classSchoolId ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.classSchoolId}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </div>
              <div style={{ width: '100%' }}>
                <CustomSelect
                  label='Section'
                  placeholder='Select Section'
                  name='sectionId'
                  options={section}
                  onChange={(e) => {
                    setFieldValue('sectionId', e.value);
                  }}
                />
                {errors.sectionId && touched.sectionId ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.sectionId}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </div>
              <div style={{ width: '100%' }}>
                <TextInput
                  name='date'
                  type='month'
                  label='Attendance Month'
                  onBlur={handleBlur}
                  value={selectedDate}
                  onChange={(e) => {
                    const { value } = e.target;
                    setSelectedDate(value);
                    setValues({ ...values, date: value });
                  }}
                />
                {errors.date && touched.date ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.date}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </div>
            </InputContainer>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px 0',
              }}
            >
              {' '}
              <PrimaryButton label='View Attendance' type='submit' />
            </div>
          </form>
          <div>
            {attendanceData.length < 1 ? (
              <h1>No Attendance Data to display</h1>
            ) : (
              <TableContainer>
                <Table>
                  <thead>
                    <TableRow>
                      <TableHeader>Name</TableHeader>
                      {datesArray.map((day) => (
                        <TableHeader key={day}>{format(day, 'd')}</TableHeader>
                      ))}
                    </TableRow>
                  </thead>
                  <tbody>
                    {Object.keys(groupedAttendance).map((name, id) => (
                      <TableRow key={id}>
                        <TableCell>{name}</TableCell>
                        {datesArray.map((date) => {
                          const attendance = groupedAttendance[name].find(
                            (item) =>
                              format(
                                parseISO(item.attendanceDate),
                                'yyyy-MM-dd'
                              ) === format(date, 'yyyy-MM-dd')
                          );
                          return (
                            <TableCell key={date}>
                              {attendance ? attendance.status : ''}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            )}
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItem: 'center',
              justifyContent: 'center',
              margin: '5px',
            }}
          ></div>
        </Layout>
      )}
      {errorMessage ? (
        <Notification message={errorMessage} type='error' />
      ) : null}
    </div>
  );
};

export default ViewAttendance;
