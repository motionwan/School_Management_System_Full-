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
import SubjectSchema from '../../../formSchema/Subjects/SubjectSchema';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import axios from 'axios';
import { baseUrl } from '../../../helpers/baseUrl';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';

const AddSubjects = () => {
  const navigate = useNavigate();
  const { auth, currentData } = useContext(AuthContext);
  const [classSchools, setClassSchools] = useState('[]');
  const [loading, setLoading] = useState(false);
  const [errorMassage, setErrorMessage] = useState('');
  const [section, setSection] = useState(null);

  const subjectTypes = [
    { label: 'Theory', value: 'theory' },
    { label: 'Practicals', value: 'practicals' },
    { label: 'Objective', value: 'objective' },
    { label: 'Subjective', value: 'subjective' },
  ];

  const coreElective = [
    { label: 'Core', value: 'core' },
    { label: 'Elective', value: 'elective' },
  ];

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

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/subject`, {
        label: values.label,
        type: values.type,
        category: values.category,
        code: values.code,
        classSchoolId: values.classSchoolId,
        sectionId: values.sectionId,
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
        // navigate(`/client_academic/${auth?.schoolId?._id}/subjects`);
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
      label: '',
      code: '',
      type: '',
      category: '',
      classSchoolId: '',
      sectionId: '',
    },
    validationSchema: SubjectSchema,
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
    <Layout>
      <LocationLabel label={auth.schoolId.label.toUpperCase()}>
        <TermSelector />
      </LocationLabel>
      <form onSubmit={handleSubmit}>
        <MainContainer>
          <Label>Add Subject</Label>
          <div style={{ width: '100%' }}>
            {' '}
            <TextInput
              label='Subject Name'
              name='label'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.label}
            />
            {touched.label && errors.label ? (
              <ErrorContainer>
                <ErrorMessage>{errors.label}</ErrorMessage>
              </ErrorContainer>
            ) : null}
          </div>

          <div style={{ width: '100%' }}>
            {' '}
            <TextInput
              label='Subject Code'
              name='code'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.code}
            />
            {touched.code && errors.code ? (
              <ErrorContainer>
                <ErrorMessage>{errors.code}</ErrorMessage>
              </ErrorContainer>
            ) : null}
            <div style={{ width: '100%', marginTop: '50px' }}>
              <CustomSelect
                placeholder='Subject Type'
                name='type'
                label='Subject Type'
                options={subjectTypes}
                isSearchable={false}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue('type', e.value)}
              />
              {touched.type && errors.type ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.type}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
          </div>

          <div style={{ width: '100%', marginTop: '50px' }}>
            <CustomSelect
              label='Subject Category'
              placeholder='Subject Category'
              name='category'
              options={coreElective}
              isSearchable={false}
              onBlur={handleBlur}
              onChange={(e) => setFieldValue('category', e.value)}
            />
            {touched.category && errors.category ? (
              <ErrorContainer>
                <ErrorMessage>{errors.category}</ErrorMessage>
              </ErrorContainer>
            ) : null}
          </div>

          <div style={{ width: '100%' }}>
            <CustomSelect
              placeholder='Class'
              name='classSchoolId'
              label='Class'
              options={classSchools}
              isSearchable={false}
              onBlur={handleBlur}
              onChange={(e) => setFieldValue('classSchoolId', e.value)}
            />
            {touched.classSchoolId && errors.classSchoolId ? (
              <ErrorContainer>
                <ErrorMessage>{errors.classSchoolId}</ErrorMessage>
              </ErrorContainer>
            ) : null}
          </div>
          <div style={{ width: '100%' }}>
            <CustomSelect
              placeholder='Section'
              label='Section'
              name='sectionId'
              options={section}
              isSearchable={false}
              onBlur={handleBlur}
              onChange={(e) => setFieldValue('sectionId', e.value)}
            />
            {touched.sectionId && errors.sectionId ? (
              <ErrorContainer>
                <ErrorMessage>{errors.sectionId}</ErrorMessage>
              </ErrorContainer>
            ) : null}
          </div>
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

export default AddSubjects;
