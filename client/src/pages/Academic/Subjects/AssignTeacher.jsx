import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Store } from 'react-notifications-component';
import { Link, useNavigate } from 'react-router-dom';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import Notification from '../../../Components/Notification/Notification';
import Spinner from '../../../Components/Spinner/Spinner';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import AssignTeacherSchema from '../../../formSchema/Subjects/AssignTeacherSchema';
import { baseUrl } from '../../../helpers/baseUrl';

const AssignTeacher = () => {
  const { auth, currentData } = useContext(AuthContext);
  const [teachers, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    const getAllTeachers = async () => {
      const arr = [];
      const res = await axios.get(`${baseUrl}/staff/${auth?.schoolId._id}`);
      res?.data.forEach((teacher) => {
        arr.push({
          label: teacher.fullName,
          value: teacher._id,
        });
        setTeacher(arr);
      });
    };
    getAllTeachers();
  }, [auth]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const teacherRes = await axios.put(
        `${baseUrl}/staff/${values.teacherId}`,
        {
          subjectId: [currentData?._id],
        }
      );
      // update subject too
      const subjectRes = await axios.put(
        `${baseUrl}/subject/${currentData?._id}`,
        {
          teacherId: values.teacherId,
        }
      );
      if (teacherRes && subjectRes) {
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
        setLoading(false);
        navigate('/client_academic/subjects');
      }
    } catch (err) {
      handleError(err.response.data.error);
      setLoading(false);
    }
  };

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues: {
        teacherId: '',
      },
      validationSchema: AssignTeacherSchema,
      onSubmit,
    });
  // console.log(values);
  console.log(currentData);

  return (
    <div>
      <Layout>
        <LocationLabel
          label={auth?.schoolId.label.toUpperCase()}
          icon={<FaSchool />}
        >
          <TermSelector />
        </LocationLabel>
        {/* <AddView>
          <Link to={`/client_school/${auth.schoolId._id}/add_subjects `}>
            <PrimaryButton label='Add Subject' icon={<FaPlusCircle />} />
          </Link>
        </AddView> */}
        <form onSubmit={handleSubmit}>
          <CustomSelect
            label='Teacher'
            name='teacherId'
            onBlur={handleBlur}
            isMulti={false}
            isSearchable={true}
            options={teachers}
            onChange={(e) => {
              setFieldValue('teacherId', e.value);
            }}
          />
          {touched.teacherId && errors.teacherId && (
            <ErrorContainer>
              <ErrorMessage>{errors.teacherId}</ErrorMessage>
            </ErrorContainer>
          )}

          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '30px 0',
            }}
          >
            <PrimaryButton
              type='submit'
              label='Assign Teacher'
              icon={<FaPlusCircle />}
            />
          </div>
        </form>
        {errorMessage && <Notification type='error' message={errorMessage} />}
        {loading && <Spinner />}
      </Layout>
    </div>
  );
};

export default AssignTeacher;
