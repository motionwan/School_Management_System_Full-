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
import styled from 'styled-components';
import CheckboxInput from '../../../Components/CheckBoxInput/CheckBoxInput';

const FieldSet = styled.fieldset`
  width: 100%;
  min-height: 5rem;
  display: flex;
`;
const Legend = styled.legend`
  font-size: 18px;
  font-weight: bold;
`;

const AddStaff = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [classSchools, setClassSchools] = useState('[]');
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

  const roles = [
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'Teacher',
      value: 'teacher',
    },
    {
      label: 'Accountant',
      value: 'accountant',
    },
    {
      label: 'Librarian',
      value: 'librarian',
    },
    {
      label: 'House Master/House Mistress',
      value: 'housemaster',
    },
  ];

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/staff/admin_create`, {
        email: values.email,
        role: values.role,
        classSchoolId: values.classSchoolId,
        sectionId: values.sectionId,
        schoolId: auth?.schoolId?._id,
        // phoneNumber: values.phoneNumber,
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
        navigate(`/staff/staffs`);
      }
      setLoading(false);
    } catch (err) {
      handleError(err.response.data.error);
      setLoading(false);
    }
  };

  const additionalRoles = [
    { value: 'housemaster', label: 'House Master' },
    { value: 'accountant', label: 'Accountant' },
  ];

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
      role: [],
      classSchoolId: '',
      //phoneNumber: '',
      sectionId: null,
      additionalRole: '',
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

  //console.log(values);

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

              {/* <div style={{ width: '100%' }}>
                {' '}
                <TextInput
                  label={`New Staff's Phone Number (required)`}
                  name='phoneNumber'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                />
                {touched.phoneNumber && errors.phoneNumber ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </div> */}

              <div style={{ width: '100%' }}>
                <h4>Assign Staff role(s) and class (for Class Teachers)</h4>
                <div style={{ width: '100%', marginTop: '50px' }}>
                  <CustomSelect
                    placeholder='Role'
                    label='Role(required)'
                    name='role'
                    options={roles}
                    isSearchable={false}
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue('role', [e.value])}
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
                  placeholder='Course'
                  label='Course (optional)'
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
              <div style={{ width: '100%', display: 'flex' }}>
                <FieldSet>
                  <Legend>Additional Responsibility</Legend>

                  {additionalRoles.map((role) => {
                    return (
                      <React.Fragment key={role.value}>
                        <div style={{ padding: '20px 10px' }}>
                          <CheckboxInput
                            label={role.label}
                            type='checkbox'
                            id={role.value}
                            name='role'
                            value={role.value}
                            checked={values.role.includes(role.value)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const value = e.target.value;

                              if (checked) {
                                setFieldValue('role', [...values.role, value]);
                              } else {
                                setFieldValue(
                                  'role',
                                  values.role.filter(
                                    (roleValue) => roleValue !== value
                                  )
                                );
                              }
                            }}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </FieldSet>
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

export default AddStaff;
