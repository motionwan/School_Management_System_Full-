import React, { useContext, useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
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
import { Link, useNavigate } from 'react-router-dom';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import AddView from '../../../Components/AddViewComponent/AddView';
import AdminAddStaffSchema from '../../../formSchema/AddStaff/AdminAddStaff';
import Notification from '../../../Components/Notification/Notification';
import Spinner from '../../../Components/Spinner/Spinner';

const AddAdmins = () => {
  const navigate = useNavigate();
  const { auth, currentData } = useContext(AuthContext);
  const [classSchools, setClassSchools] = useState('[]');
  const [roles, setRoles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [section, setSection] = useState(null);

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

  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    const arr = [];
    const getAllClassSchoolsForSchool = async () => {
      const res = await axios.get(`${baseUrl}/role`);
      console.log(res.data);
      res.data.forEach((role) => {
        arr.push({
          label: role.name,
          value: role._id,
        });
      });
      setRoles(arr);
    };
    getAllClassSchoolsForSchool();
  }, [auth]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/staff/admin_create`, {
        email: values.email,
        role: values.role,
        classSchoolId: values.classSchoolId,
        sectionId: values.sectionId,
        schoolId: auth?.schoolId._id,
      });
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: `An email has been sent to ${values.email} to continue registration`,
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 10000,
          },
        });
        // navigate(`/client_academic/${auth?.schoolId?._id}/subjects`);
      }
      setLoading(false);
    } catch (err) {
      handleError(err.response.data.error);
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
      email: '',
      role: '',
      classSchoolId: '',
      sectionId: null,
      //type: '',
    },
    validationSchema: AdminAddStaffSchema,
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
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <LocationLabel label={auth.schoolId.label.toUpperCase()}>
            <TermSelector />
          </LocationLabel>
          <AddView>
            <Link to={`/staff/${auth?.schoolId._id}/staffs`}>
              <PrimaryButton label='View Staffs' icon={<FaPlusCircle />} />
            </Link>
          </AddView>
          <form onSubmit={handleSubmit}>
            <MainContainer>
              <Label>Add New Staff</Label>
              <div style={{ width: '100%' }}>
                {' '}
                <TextInput
                  label={`New Staff's Email Address`}
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {touched.email && errors.email ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.email}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </div>

              <div style={{ width: '100%' }}>
                <h4>Assign Staff a role and class</h4>
                <div style={{ width: '100%', marginTop: '50px' }}>
                  <CustomSelect
                    placeholder='Role'
                    label='Role(required)'
                    name='role'
                    options={roles}
                    isSearchable={false}
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue('role', e.value)}
                  />
                  {touched.role && errors.role ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.role}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
              </div>
              <div style={{ width: '100%' }}>
                <CustomSelect
                  placeholder='Class'
                  label='Class(optional)'
                  name='classSchoolId'
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
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CustomSelect
                  placeholder='Section'
                  label='Section (optional)'
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
                label='Add New Staff'
                icon={<FaPlusCircle />}
              />
            </MainContainer>
          </form>
          {errorMessage && <Notification message={errorMessage} type='error' />}
        </div>
      )}
    </Layout>
  );
};

export default AddAdmins;
