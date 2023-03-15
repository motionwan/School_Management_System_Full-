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
import TextAreaInput from '../../../Components/TextAreaInput/TextAreaInput';
import Notification from '../../../Components/Notification/Notification';
import StudentPermissionSchema from '../../../formSchema/StudentPermission/Exeat';
import { Store } from 'react-notifications-component';

const InputContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
  min-height: 140px;
  padding: 30px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 50px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
  }
`;

const AddPermission = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [classSchools, setClassSchools] = useState(null);
  const [section, setSection] = useState(null);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const onSubmit = async (values) => {
    setPageLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/exeat`, {
        startDate: values.startDate,
        endDate: values.endDate,
        reason: values.reason,
        sectionId: values.sectionId,
        isApproved: values.isApproved,
        studentRecordId: values.studentRecordId,
        classSchoolId: values.classSchoolId,
        termId: auth?.currentTermId._id,
        schoolId: auth?.schoolId?._id,
        addedBy: auth?.userId,
      });
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: 'Exeat Created successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate(`/client_academic/exeat`);
      }

      setPageLoading(false);
    } catch (err) {
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
      reason: '',
      sectionId: '',
      isApproved: false,
      studentRecordId: '',
      classSchoolId: '',
    },
    validationSchema: StudentPermissionSchema,
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

  useEffect(() => {
    if (values.sectionId) {
      const getStudentsForSection = async () => {
        const arr = [];
        const res = await axios.post(
          `${baseUrl}/student_record/section/${auth?.currentTermId?._id}`,
          {
            sectionId: values.sectionId,
          }
        );
        res.data.forEach((student) => {
          arr.push({
            value: student._id,
            label: student.fullName,
          });
        });
        setStudents(arr);
      };
      getStudentsForSection();
    }
  }, [values.sectionId, auth]);

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
            <Link to={`/client_academic/exeat`}>
              <PrimaryButton
                label='View Issued Exeat'
                icon={<FaPlusCircle />}
              />
            </Link>
          </AddView>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <InputWrapper>
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
                    name='studentRecordId'
                    label='Select Student'
                    onBlur={handleBlur}
                    options={students}
                    onChange={(e) => {
                      setFieldValue('studentRecordId', e.value);
                    }}
                  />
                  {errors.studentRecordId && touched.studentRecordId ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.studentRecordId}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
              </InputWrapper>
              <InputWrapper>
                <div style={{ width: '100%' }}>
                  <TextInput
                    type='date'
                    label='Start Date'
                    placeholder='Start Date'
                    name='startDate'
                    onChange={handleChange}
                  />
                  {errors.startDate && touched.startDate ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.startDate}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
                <div style={{ width: '100%' }}>
                  <TextInput
                    type='date'
                    label='End Date'
                    placeholder='End Date'
                    name='endDate'
                    onChange={handleChange}
                  />
                  {errors.endDate && touched.endDate ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.endDate}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
              </InputWrapper>
              <InputWrapper>
                <div
                  style={{
                    width: '100%',
                  }}
                >
                  <TextAreaInput
                    label='Reason'
                    placeholder='Select Class'
                    name='reason'
                    onChange={handleChange}
                  />
                  {errors.reason && touched.reason ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.reason}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
                <div>
                  <TextInput
                    type='radio'
                    label='Approved'
                    placeholder='Select Section'
                    name='isApproved'
                    value={1}
                    onChange={handleChange}
                    // eslint-disable-next-line eqeqeq
                    checked={values.isApproved == 1}
                  />
                  {errors.isApproved && touched.isApproved ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.isApproved}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
                <div>
                  <TextInput
                    type='radio'
                    label='Unapproved'
                    placeholder='Select Section'
                    name='isApproved'
                    onChange={handleChange}
                    value={0}
                    // eslint-disable-next-line eqeqeq
                    checked={values.isApproved == 0}
                  />
                  {errors.isApproved && touched.isApproved ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.isApproved}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
              </InputWrapper>
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
              <PrimaryButton label='Add Exeat' type='submit' />
            </div>
          </form>
          <div></div>
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

export default AddPermission;
