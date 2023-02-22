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
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import TextInput from '../../../Components/Input/Input';
import Notification from '../../../Components/Notification/Notification';
import TextAreaInput from '../../../Components/TextAreaInput/TextAreaInput';
import { Store } from 'react-notifications-component';
import DateInput from '../../../Components/DateInput/DateInput';
import HomeworkSchema from '../../../formSchema/Homework/HomeworkSchema';
import StudentIDCard from '../../../Components/StudentId/StudentId';

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

const SecondaryInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
  }
`;

const StudentId = () => {
  const [pageLoading, setPageLoading] = useState(false);
  //const [attendanceData, setAttendanceData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [classSchools, setClassSchools] = useState(null);
  const [students, setStudents] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [detailedStudents, setDetailedStudents] = useState([]);
  const [section, setSection] = useState(null);
  const { auth } = useContext(AuthContext);
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();

  // handle errors with this function
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  //console.log(detailedStudents);
  console.log(selectedStudents);

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

  const onSubmit = async (values) => {
    const data = new FormData();
    data.append('classSchoolId', values.classSchoolId);
    data.append('sectionId', values.sectionId);
    data.append('subjectId', values.subjectId);
    data.append('title', values.title);
    data.append('description', values.description);
    data.append('submissionDate', values.submissionDate);
    data.append('attachment', values.attachment);
    data.append('setBy', auth?.userId);
    data.append('termId', auth?.currentTermId._id);
    data.append('schoolId', auth?.schoolId?._id);
    try {
      setPageLoading(true);
      const res = await axios.post(`${baseUrl}/homework_section`, data);
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: 'Homework uploaded successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate(`/client_academic/${auth?.schoolId?._id}/homework`);
      }
      setPageLoading(false);
    } catch (err) {
      console.error(err);
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  const handleStudentSelect = (selectedIds) => {
    const selectedStudents = detailedStudents.filter((student) =>
      selectedIds.includes(student._id)
    );
    setSelectedStudents(selectedStudents);
  };

  const { values, errors, handleBlur, touched, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        classSchoolId: '',
        sectionId: '',
        subjectId: '',
        title: '',
        description: '',
        attachment: null,
        submissionDate: Date.now(), //format(addDays(new Date(), 3), 'dd-MM-yyyy'),
        addedBy: '',
      },
      validationSchema: HomeworkSchema,
      onSubmit: onSubmit,
    });

  const handleId = () => {
    selectedStudents.map((student) => {
      setShowCard(true);
    });
  };

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

  useEffect(() => {
    if (values.sectionId) {
      const arr = [];
      const getAllClassSchoolsForSchool = async () => {
        const res = await axios.post(
          `${baseUrl}/student_record/section/${auth?.currentTermId?._id}`,
          {
            sectionId: values.sectionId,
          }
        );
        setDetailedStudents(res.data);
        res.data.forEach((student) => {
          arr.push({
            label: student.fullName,
            value: student._id,
          });
        });
        setStudents(arr);
      };
      getAllClassSchoolsForSchool();
    }
  }, [values.sectionId, auth]);

  return (
    <div>
      <Layout>
        <LocationLabel
          label={auth?.schoolId.label.toUpperCase()}
          icon={<FaSchool />}
        >
          <TermSelector />
        </LocationLabel>
        <AddView>ID Cards</AddView>
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
              <CustomSelect
                name='studentId'
                label='Students'
                isMulti
                options={students}
                onBlur={handleBlur}
                onChange={(selectedOptions) => {
                  const selectedIds = selectedOptions.map(
                    (option) => option.value
                  );
                  handleStudentSelect(selectedIds);
                }}
              />

              {errors.studentId && touched.studentId ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.studentId}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
          </InputContainer>
        </form>
        <StudentIDCard cards={selectedStudents} />
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
          <PrimaryButton
            onClick={handleId}
            label='Get I.D Cards'
            type='button'
          />
        </div>
        {pageLoading && <Spinner />}
        {errorMessage && <Notification message={errorMessage} type='error' />}
      </Layout>
    </div>
  );
};

export default StudentId;
