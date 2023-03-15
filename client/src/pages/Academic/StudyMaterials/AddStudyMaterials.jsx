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
import LearningMaterialSchema from '../../../formSchema/LearningMaterials/LearningMaterialSchema';
import { Store } from 'react-notifications-component';

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

const AddStudyMaterials = () => {
  const [pageLoading, setPageLoading] = useState(false);
  //const [attendanceData, setAttendanceData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [classSchools, setClassSchools] = useState(null);
  const [subjects, setSubjects] = useState(null);
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
    const data = new FormData();
    data.append('sectionId', values.sectionId);
    data.append('label', values.label);
    data.append('description', values.description);
    data.append('classSchoolId', values.classSchoolId);
    data.append('subjectId', values.subjectId);
    data.append('url', values.url);
    data.append('addedBy', auth?.userId);
    data.append('attachment', values.attachment);
    data.append('termId', auth?.currentTermId._id);
    try {
      setPageLoading(true);
      const res = await axios.post(
        `${baseUrl}/class_school_study_materials`,
        data
      );
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: 'School Updated successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate(`/client_academic/study_materials`);
      }
      setPageLoading(false);
    } catch (err) {
      console.error(err);
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      classSchoolId: '',
      sectionId: '',
      subjectId: '',
      label: '',
      description: '',
      attachment: null,
      url: '',
      addedBy: '',
    },
    validationSchema: LearningMaterialSchema,
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
      const arr = [];
      const getAllClassSchoolsForSchool = async () => {
        const res = await axios.get(
          `${baseUrl}/subject/section/${values.sectionId}`
        );
        res.data.forEach((classSchool) => {
          arr.push({
            label: classSchool.label,
            value: classSchool._id,
          });
        });
        setSubjects(arr);
      };
      getAllClassSchoolsForSchool();
    }
  }, [values.sectionId]);

  return (
    <div>
      <Layout>
        <LocationLabel
          label={auth?.schoolId.label.toUpperCase()}
          icon={<FaSchool />}
        >
          <TermSelector />
        </LocationLabel>
        <AddView>
          <Link to={`/client_academic/add_attendance `}>
            <PrimaryButton
              label='View Learning Materials'
              icon={<FaPlusCircle />}
            />
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
              <CustomSelect
                name='subjectId'
                label='Subject'
                options={subjects}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('subjectId', e.value);
                }}
              />
              {errors.subjectId && touched.subjectId ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.subjectId}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
          </InputContainer>

          <SecondaryInputContainer>
            <div
              style={{
                width: '100%',
                margin: '20px 0',
              }}
            >
              <TextInput
                label='Title'
                name='label'
                value={values.label}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.label && touched.label ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.label}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>

            <div
              style={{
                width: '100%',
                margin: '20px 0',
              }}
            >
              <TextAreaInput
                label='Description'
                name='description'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              />
              {errors.description && touched.description ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.description}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
            <div
              style={{
                width: '100%',
                margin: '20px 0',
              }}
            >
              <TextInput
                label='URL/Link'
                name='url'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.url}
              />
              {errors.url && touched.url ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.url}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
            <div
              style={{
                width: '100%',
                margin: '20px 0',
              }}
            >
              <TextInput
                label='Attachment'
                type='file'
                name='attachment'
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('attachment', e.currentTarget.files[0]);
                }}
                // value={values.attachment}
              />
              {errors.attachment && touched.attachment ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.attachment}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
          </SecondaryInputContainer>
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
            <PrimaryButton label='Add Learning Material' type='submit' />
          </div>
        </form>
        {pageLoading && <Spinner />}
        {errorMessage && <Notification message={errorMessage} type='error' />}
      </Layout>
    </div>
  );
};

export default AddStudyMaterials;
