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
import Select from 'react-select';
import { useFormik } from 'formik';
import { format, parse, parseISO } from 'date-fns';
import AttendanceSchema from '../../../formSchema/Attendance/AttendanceShema';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import MonthPicker from '../../../Components/MonthPicker/MonthPicker';

const InputContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
  min-height: 140px;
  display: flex;
  gap: 20px;
  padding: 10px;
`;

const ViewAttendance = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [attendances, setAttendances] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [classSchools, setClassSchools] = useState(null);
  const [section, setSection] = useState(null);
  const { auth } = useContext(AuthContext);

  console.log(attendances);

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
    const getAllClassSchoolsForSchool = async () => {
      const res = await axios.get(
        `${baseUrl}/class_school/class/${auth.schoolId?._id}`
      );
      res.data.forEach((classSchool) => {
        arr.push({
          label: classSchool.classId.label,
          value: classSchool._id,
        });
      });
      setClassSchools(arr);
    };
    getAllClassSchoolsForSchool();
  }, [auth]);

  useEffect(() => {
    const getAllSubjects = async () => {
      setPageLoading(true);
      try {
        const res = await axios.get(
          `${baseUrl}/student_attendance/${auth?.currentTermId?._id}`
        );
        setAttendances(res.data);
        setPageLoading(false);
      } catch (err) {
        console.log(err);
        if (!err.response.ok) setErrorMessage('Network error');
        handleError(err.response.data.error);
        setPageLoading(false);
      }
    };
    getAllSubjects();
  }, [auth?.currentTermId._id]);

  const onSubmit = async () => {};

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      date: format(Date.now(), 'yyyy-MM'),
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

  console.log(values);

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
            <Link to={`/client_academic/${auth.schoolId._id}/add_attendance `}>
              <PrimaryButton label='Take Attendance' icon={<FaPlusCircle />} />
            </Link>
          </AddView>
          <div>
            {attendances.length < 1 ? (
              <h1>No Subject Data to display</h1>
            ) : (
              <form onSubmit={handleSubmit}>
                <InputContainer>
                  <div style={{ width: '100%' }}>
                    <label htmlFor='classSchoolId'>Class School ID</label>
                    <Select placeholder='Select Class' name='classSchoolId' />
                    {errors.classSchoolId && touched.classSchoolId ? (
                      <ErrorContainer>
                        <ErrorMessage>{errors.classSchoolId}</ErrorMessage>
                      </ErrorContainer>
                    ) : null}
                  </div>
                  <div style={{ width: '100%' }}>
                    <label htmlFor='classSchoolId'>Class School ID</label>
                    <Select placeholder='Select Section' name='sectionId' />
                    {errors.sectionId && touched.sectionId ? (
                      <ErrorContainer>
                        <ErrorMessage>{errors.sectionId}</ErrorMessage>
                      </ErrorContainer>
                    ) : null}
                  </div>
                  <div style={{ width: '100%' }}>
                    <label htmlFor='classSchoolId'>Class School ID</label>
                    <MonthPicker
                      name='date'
                      id='date'
                      value={values.date}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                    alignItem: 'center',
                    justifyContent: 'center',
                    margin: '5px',
                  }}
                >
                  <PrimaryButton label='View Attendance' type='submit' />
                </div>
              </form>
            )}
          </div>
        </Layout>
      )}
    </div>
  );
};

export default ViewAttendance;
