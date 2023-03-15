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
import { Link, useNavigate } from 'react-router-dom';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { format } from 'date-fns';
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

const AddAttendance = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    format(Date.now(), 'yyyy-MM-dd')
  );
  const [attendanceData, setAttendanceData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [classSchools, setClassSchools] = useState(null);
  const [section, setSection] = useState(null);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  //console.log(attendanceData);

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
    try {
      attendanceData.map(async (attendance) => {
        const res = await axios.post(`${baseUrl}/student_attendance`, {
          studentRecordId: attendance.studentId,
          attendanceDate: attendance.date,
          status: attendance.status,
          sectionId: attendance.sectionId,
        });

        // return success message if all data is sent to the database
      });
      navigate(`/client_student/students`);
    } catch (err) {
      handleError(err.response.data.error);
    }
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    setFieldValue,
    setValues,
    handleSubmit,
  } = useFormik({
    initialValues: {
      date: selectedDate,
    },
    validationSchema: AttendanceSchema,
    onSubmit: onSubmit,
  });

  const handleRadioChange = (studentId, status, sectionId) => {
    const student = attendanceData.find((s) => s.studentId === studentId);
    if (student) {
      student.status = status;
      setAttendanceData([...attendanceData]);
    } else {
      setAttendanceData([
        ...attendanceData,
        { studentId, status, date: selectedDate, sectionId },
      ]);
    }
  };

  // const handleCheckAllPresent = () => {
  //   // set the status of all students to "present"
  //   setAttendanceData(attendanceData.map((data) => ({ ...data, status: 'p' })));
  // };
  // const handleCheckAllAbsent = () => {
  //   // set the status of all students to "present"
  //   setAttendanceData(attendanceData.map((data) => ({ ...data, status: 'a' })));
  // };

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

  //console.log(values);

  useEffect(() => {
    if (values.sectionId) {
      const getAllStudents = async () => {
        setPageLoading(true);
        try {
          const res = await axios.get(
            `${baseUrl}/student_record/section/${values.sectionId}`
          );
          setStudents(res.data);
          setPageLoading(false);
        } catch (err) {
          console.log(err);
          if (!err.response.ok) setErrorMessage('Network error');
          handleError(err.response.data.error);
          setPageLoading(false);
        }
      };
      getAllStudents();
    }
  }, [values.sectionId]);

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
              <PrimaryButton label='View Attendance' icon={<FaPlusCircle />} />
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
                  type='date'
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
            <div>
              {students.length < 1 ? (
                <h1>No student Data to display</h1>
              ) : (
                <TableContainer>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableHeader data-label='Student Name'>
                          Student Name
                        </TableHeader>
                        <TableHeader data-label='Admission No.'>
                          Admission Number
                        </TableHeader>
                        <TableHeader data-label='Course'>Course</TableHeader>

                        <TableHeader>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                            }}
                          >
                            {' '}
                            Status{' '}
                            {/* <PrimaryButton
                              type='button'
                              onClick={handleCheckAllPresent}
                              label='Mark All Present'
                            />
                            <SecondaryButton
                              type='button'
                              onClick={handleCheckAllAbsent}
                              label='Mark All Absent'
                            /> */}
                          </div>
                        </TableHeader>
                      </TableRow>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <React.Fragment key={student._id}>
                          <TableRow key={student._id}>
                            <TableCell data-label='Name'>
                              {student.fullName}
                            </TableCell>
                            <TableCell data-label='Admission Number'>
                              {student.admissionNumber}
                            </TableCell>
                            <TableCell data-label='Course'>
                              {student.sectionId}
                            </TableCell>
                            <TableCell data-label='Status'>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                }}
                              >
                                <TextInput
                                  label='Present'
                                  type='radio'
                                  className='form-check-input'
                                  name={`status${student._id}`}
                                  value='p'
                                  onClick={() =>
                                    handleRadioChange(
                                      student._id,
                                      'p',
                                      student.sectionId
                                    )
                                  }
                                />
                                <TextInput
                                  label='Absent'
                                  type='radio'
                                  className='form-check-input'
                                  name={`status${student._id}`}
                                  value='a'
                                  onClick={() =>
                                    handleRadioChange(
                                      student._id,
                                      'a',
                                      student.sectionId
                                    )
                                  }
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
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
            >
              <PrimaryButton label='Take Attendance' type='submit' />
            </div>
          </form>
        </Layout>
      )}
      {errorMessage ? (
        <Notification message={errorMessage} type='error' />
      ) : null}
    </div>
  );
};

export default AddAttendance;
