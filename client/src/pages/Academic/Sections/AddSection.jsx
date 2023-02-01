import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../../Components/Layout/Layout';
import styled from 'styled-components';
import AuthContext from '../../../context/AuthContext/AuthContext';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import DataTable from '../../../Components/Table/Table';
import axios from 'axios';
import { baseUrl } from '../../../helpers/baseUrl';
import TextInput from '../../../Components/Input/Input';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { useFormik } from 'formik';
import ClassSectionSchema from '../../../formSchema/SectionSchema/SectionSchema';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import Notification from '../../../Components/Notification/Notification';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  margin-top: 50px;

  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
  }
`;
const ClassSectionTableContainer = styled.div`
  width: 60%;
  margin-right: 10px;
  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
  }
`;

const AddSectionContainer = styled.div`
  width: 40%;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 50px;
  }
`;

const AddSection = () => {
  const navigate = useNavigate();
  const { currentData, auth } = useContext(AuthContext);
  const [classSections, setClassSections] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [pageLoading, setPageLoading] = useState(false);

  const columns = [
    { key: 'label', label: 'Section' },
    { key: 'total students', label: 'Total Students' },
    { key: 'class teacher', label: 'Class Teacher' },
  ];

  useEffect(() => {
    const getAllSectionsForClassSections = async () => {
      const res = await axios.get(
        `${baseUrl}/class_section/${currentData._id?._id}`
      );
      setClassSections(res.data);
    };
    getAllSectionsForClassSections();
  }, [currentData, auth]);

  const onSubmit = async () => {
    try {
      const res = await axios.post(`${baseUrl}/class_section`, {
        label: values.label,
        classSchoolId: currentData?._id._id,
      });
      setClassSections([...classSections, res.data]);
      handleSuccess('Class Section created successfully');
    } catch (err) {
      console.error(err);
      handleError(err.response.data.error);
    }
  };

  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  const handleSuccess = (success) => {
    setSuccessMessage(success);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 10000);
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        label: '',
      },
      validationSchema: ClassSectionSchema,
      onSubmit: onSubmit,
    });

  const handleDelete = async () => {
    setPageLoading(true);
    try {
      if (currentData) {
        const res = await axios.delete(
          `${baseUrl}/class_section/${currentData?._id}`
        );
        if (res)
          setClassSections(
            classSections.filter((c) => c._id !== currentData?._id)
          );
        setPageLoading(false);
        handleSuccess('School deleted successfully');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response.data.error);
      setPageLoading(false);
    }
  };

  const handleEdit = () => {
    try {
      if (currentData) {
        navigate(`/client_academic/${currentData._id}/update_class_section`);
      }
    } catch (err) {
      console.error(err);
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  return (
    <div>
      <Layout>
        <LocationLabel label={auth.schoolId.label.toUpperCase()}>
          <TermSelector />
        </LocationLabel>
        {pageLoading ? (
          <Spinner />
        ) : (
          <MainComponent>
            <ClassSectionTableContainer>
              <DataTable
                columns={columns}
                data={classSections}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </ClassSectionTableContainer>
            <AddSectionContainer>
              <form onSubmit={handleSubmit}>
                <TextInput
                  label='Add Section'
                  name='label'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.label}
                />
                <>
                  {errors.label && touched.label ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.label}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </>

                <div style={{ marginTop: '50px', marginLeft: '50px' }}>
                  <PrimaryButton label='Add Section' />
                </div>
              </form>
            </AddSectionContainer>
          </MainComponent>
        )}

        {errorMessage ? (
          <>
            <Notification message={errorMessage} type='error' />
          </>
        ) : null}
        {successMessage ? (
          <>
            <Notification message={successMessage} type='success' />
          </>
        ) : null}
      </Layout>
    </div>
  );
};

export default AddSection;
