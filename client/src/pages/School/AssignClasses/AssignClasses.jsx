import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../../Components/Layout/Layout';
import DataTable from '../../../Components/Table/Table';
import { baseUrl } from '../../../helpers/baseUrl';
import styled from 'styled-components';
import Select from 'react-select';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { useFormik } from 'formik';
import classSchoolSchema from '../../../formSchema/ClassSchool/ClassSchoolSchema';
import Notification from '../../../Components/Notification/Notification';
import Spinner from '../../../Components/Spinner/Spinner';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import { Store } from 'react-notifications-component';

const PageContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 50px;
  min-width: 30rem;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    justify-content: center;
    margin: 0 auto;
  }
`;

const SelectContainer = styled.div`
  width: 95%;
  margin: 20px;
  padding: 10px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 20px;
`;

const AssignClasses = () => {
  const { auth } = useContext(AuthContext);
  const [classes, setClasses] = useState(['']);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentData } = useContext(AuthContext);

  console.log(currentData);

  const onSubmit = async (values) => {
    setLoading(true);
    const promises = values.classId.forEach(async (id) => {
      try {
        const res = await axios.post(`${baseUrl}/class_school/`, {
          classId: id,
          schoolId: auth.schoolId._id,
        });

        const assignedClass = {
          _id: res.data._id,
          label: res.data.classId?.label,
          value: res.data.classId?._id,
        };
        setAssignedClasses([...assignedClasses, assignedClass]);
        setLoading(false);
        Store.addNotification({
          title: 'Success!',
          message: 'Classes assigned successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
      } catch (err) {
        handleError(err.response.data.error);
        setLoading(false);
      }
    });
    try {
      await Promise.all(promises);
      setLoading(false);
      Store.addNotification({
        title: 'Success!',
        message: 'School added successfully',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__bounceIn'],
        animationOut: ['animate__animated', 'animate__bounceOut'],
        dismiss: {
          duration: 5000,
        },
      });
    } catch (err) {}
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${baseUrl}/class_school/${currentData._id}`
      );
      if (res.status === 200) {
        Store.addNotification({
          title: 'Success!',
          message: 'Class unassigned successfully',
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
      setAssignedClasses(
        assignedClasses.filter((c) => c._id !== currentData?._id)
      );
    } catch (err) {
      handleError(err.response.data.error);
    }
  };

  useEffect(() => {
    const getAllClasses = async () => {
      const arr = [];
      const res = await axios.get(
        `${baseUrl}/class_school/school/class/${auth.schoolId?._id}`
      );
      res.data?.forEach((data) =>
        arr.push({
          _id: data._id,
          label: data.classId?.label,
          value: data.classId?._id,
        })
      );
      setAssignedClasses(arr);
    };
    getAllClasses();
  }, [auth]);

  console.log(assignedClasses);

  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    const arr = [];
    const getAllClasses = async () => {
      const res = await axios.get(`${baseUrl}/classes`);
      res.data.forEach((classSchool) => {
        arr.push({ label: classSchool.label, value: classSchool._id });
      });
      setClasses(arr);
    };
    getAllClasses();
  }, []);

  const { errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      classId: [],
    },
    validationSchema: classSchoolSchema,
    onSubmit: onSubmit,
  });

  const columns = [{ key: 'label', label: 'Class Name' }];
  return (
    <Layout>
      <PageContainer>
        {loading ? (
          <>
            <Spinner />
          </>
        ) : null}
        <form onSubmit={handleSubmit}>
          <SelectContainer>
            {errorMessage ? (
              <>
                <Notification type='error' message={errorMessage} />
              </>
            ) : null}
            <h4>Select the class or classes you want to assign:</h4>
            <Select
              name='classId'
              options={classes}
              //value={values.class}
              onChange={(e) =>
                setFieldValue(
                  'classId',
                  e.map((value) => value.value)
                )
              }
              isMulti
              isClearable
            />
            {touched.classId && errors.classId ? (
              <ErrorContainer>
                <ErrorMessage>{errors.classId}</ErrorMessage>
              </ErrorContainer>
            ) : null}
          </SelectContainer>
          <ButtonContainer>
            <PrimaryButton label='Assign classes' type='submit' />
          </ButtonContainer>
        </form>

        <h3>Assigned classes</h3>
        {classes.length < 0 ? (
          <h5>No class assigned yet</h5>
        ) : (
          <div>
            {' '}
            <DataTable
              data={assignedClasses}
              columns={columns}
              onDelete={handleDelete}
            />
          </div>
        )}
      </PageContainer>
    </Layout>
  );
};

export default AssignClasses;
