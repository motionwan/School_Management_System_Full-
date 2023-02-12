import React, { useContext, useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Select from 'react-select';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import {
  Label,
  MainContainer,
} from '../../../Components/FormComponents/FormComponents';
import TextInput from '../../../Components/Input/Input';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { useFormik } from 'formik';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import axios from 'axios';
import { baseUrl } from '../../../helpers/baseUrl';
import { Store } from 'react-notifications-component';
import styled from 'styled-components';
import TimetableSchema from '../../../formSchema/Timetable/TimetableSchema';
import TimePicker from '../../../Components/TimePicker/TimePicker';

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.5em;
`;

const AddTimeTable = () => {
  const { auth, currentData } = useContext(AuthContext);
  const [classes, setClasses] = useState('[]');
  const [sections, setSections] = useState('[]');
  const [subjects, setSubjects] = useState('[]');
  const [loading, setLoading] = useState(false);
  const [errorMassage, setErrorMessage] = useState('');

  console.log(auth);

  const days = [
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
  ];

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
      setClasses(arr);
    };
    getAllClassSchoolsForSchool();
  }, [auth]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/timetable`, {
        classSchoolId: values.classSchoolId,
        sectionId: values.sectionId,
        subjectId: values.subjectId,
        startTime: values.startTime,
        endTime: values.endTime,
        day: values.day,
        roomId: values.roomId,
        staffId: '', //values.staffId,
        termId: auth?.currentTermId._id,
      });
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: 'Subject added successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
      }
      setLoading(false);
    } catch (err) {
      setErrorMessage(err.response.data.error);
      setLoading(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      classSchoolId: '',
      sectionId: '',
      subjectId: '',
      startTime: '',
      endTime: '',
      day: '',
      roomId: '',
      staffId: '',
    },
    validationSchema: TimetableSchema,
    onSubmit: onSubmit,
  });

  // get sections for the selected class

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
        setSections(arr);
      };
      getAllClassSchoolsForSchool();
    }
  }, [values.classSchoolId]);

  // get subjects for the selected class
  useEffect(() => {
    if (values.classSchoolId) {
      const arr = [];
      const getAllClassSchoolsForSchool = async () => {
        const res = await axios.get(
          `${baseUrl}/subject/class/${values?.classSchoolId}`
        );
        res.data.forEach((subject) => {
          arr.push({
            label: subject.label,
            value: subject._id,
          });
        });
        setSubjects(arr);
      };
      getAllClassSchoolsForSchool();
    }
  }, [values.classSchoolId]);

  return (
    <Layout>
      <LocationLabel label={auth.schoolId.label.toUpperCase()}>
        <TermSelector />
      </LocationLabel>
      <form onSubmit={handleSubmit}>
        <MainContainer>
          <Label>Add A New Class Routine</Label>
          <RowContainer>
            <div style={{ width: '100%' }}>
              {' '}
              <Select
                placeholder='Select a class'
                options={classes}
                name='classSchoolId'
                onChange={(e) => setFieldValue('classSchoolId', e.value)}
                onBlur={handleBlur}
              />
              {touched.classSchoolId && errors.classSchoolId ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.classSchoolId}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>

            <div style={{ width: '100%' }}>
              {' '}
              <Select
                placeholder='Select a section'
                options={sections}
                name='sectionId'
                onChange={(e) => setFieldValue('sectionId', e.value)}
                onBlur={handleBlur}
              />
              {touched.sectionId && errors.sectionId ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.sectionId}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
            <div style={{ width: '100%' }}>
              <Select
                placeholder='Select a subject'
                options={subjects}
                name='subjectId'
                isSearchable={false}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue('subjectId', e.value)}
              />
              {touched.subjectId && errors.subjectId ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.subjectId}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
          </RowContainer>
          <RowContainer>
            <div style={{ width: '100%' }}>
              {' '}
              <TimePicker
                name='startTime'
                value={values.startTime}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.startTime && errors.startTime ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.startTime}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>

            <div style={{ width: '100%' }}>
              {' '}
              <TimePicker
                placeholder='end time'
                name='endTime'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.endTime}
              />
              {touched.endTime && errors.endTime ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.endTime}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
            <div style={{ width: '100%' }}>
              <Select
                placeholder='Select Day'
                name='day'
                options={days}
                isSearchable={false}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue('day', e.value)}
              />
              {touched.day && errors.day ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.day}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
          </RowContainer>
          <RowContainer>
            <div style={{ width: '100%' }}>
              {' '}
              <Select
                placeholder='Select Teacher'
                name='staffId'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.staffId && errors.staffId ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.staffId}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>

            <div style={{ width: '100%' }}>
              {' '}
              <Select
                placeholder='Select room'
                name='roomNumber'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.roomNumber && errors.roomNumber ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.roomNumber}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
          </RowContainer>

          <PrimaryButton
            type='submit'
            label='Add New Subject'
            icon={<FaPlusCircle />}
          />
        </MainContainer>
      </form>
    </Layout>
  );
};

export default AddTimeTable;
