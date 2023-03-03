import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { baseUrl } from '../../../helpers/baseUrl';
import styled from 'styled-components';
import { useFormik } from 'formik';
import RolesSchema from '../../../formSchema/Roles/RolesSchema';
import TextInput from '../../../Components/Input/Input';
import CheckboxInput from '../../../Components/CheckBoxInput/CheckBoxInput';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import { Store } from 'react-notifications-component';

const MainContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const AddRoles = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  //console.log(permissions);

  useEffect(() => {
    const getAllPermissions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/permission`);
        setPermissions(res.data);
      } catch (err) {}
    };
    getAllPermissions();
  }, []);

  const onSubmit = async (values) => {
    const res = await axios.post(`${baseUrl}/role`, {
      name: values.name,
      permissions: values.selectedPermissions,
      schoolId: auth?.schoolId._id,
    });
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
      navigate(`/staff/${auth?.schoolId?._id}/roles`);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      selectedPermissions: [],
    },
    validationSchema: RolesSchema,
    onSubmit,
  });
  console.log(values);
  return (
    <div style={{ padding: '10px' }}>
      <Layout>
        <LocationLabel
          label={auth?.schoolId.label.toUpperCase()}
          icon={<FaSchool />}
        >
          <TermSelector />
        </LocationLabel>
        <AddView>
          <Link to={`/staff/${auth.schoolId._id}/roles `}>
            <PrimaryButton label='View All Roles' icon={<FaPlusCircle />} />
          </Link>
        </AddView>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '30px 0' }}>
            <TextInput
              label='Role Name'
              name='name'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <ErrorContainer>
                <ErrorMessage>{errors.name}</ErrorMessage>
              </ErrorContainer>
            ) : null}
          </div>
          <MainContainer>
            {' '}
            {permissions.map((permission) => {
              return (
                <div key={permission._id}>
                  <CheckboxInput
                    name={permission._id}
                    value={permission.name}
                    checked={values.selectedPermissions.includes(
                      permission._id
                    )}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setFieldValue('selectedPermissions', [
                          ...values.selectedPermissions,
                          permission._id,
                        ]);
                      } else {
                        setFieldValue(
                          'selectedPermissions',
                          values.selectedPermissions.filter(
                            (id) => id !== permission._id
                          )
                        );
                      }
                    }}
                    type='checkbox'
                    label={permission.name}
                  />
                </div>
              );
            })}
          </MainContainer>
          {errors.selectedPermissions && touched.selectedPermissions ? (
            <ErrorContainer>
              <ErrorMessage>{errors.selectedPermissions}</ErrorMessage>
            </ErrorContainer>
          ) : null}
          <div
            style={{
              width: '100%',
              margin: '30px 0',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <PrimaryButton
              label='Add Role'
              type='submit'
              icon={<FaPlusCircle />}
            />
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default AddRoles;
