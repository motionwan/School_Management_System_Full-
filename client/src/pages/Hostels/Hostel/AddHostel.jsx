import React, { useContext } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import TextInput from '../../../Components/Input/Input';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import {
  Label,
  MainContainer,
} from '../../../Components/FormComponents/FormComponents';
import { useFormik } from 'formik';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import HostelSchema from '../../../formSchema/AddHostel/HostelSchema';
import { baseUrl } from '../../../helpers/baseUrl';
import axios from 'axios';
import { Store } from 'react-notifications-component';

const AddHostel = () => {
  const { auth } = useContext(AuthContext);

  const typeOptions = [
    { label: 'Boys', value: 'boys' },
    { label: 'Girls', value: 'girls' },
  ];

  const onSubmit = async () => {
    try {
      const res = await axios.post(`${baseUrl}/hostel`, {
        hostelName: values.hostelName,
        intake: values.intake,
        address: values.address,
        type: values.type,
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
      }
    } catch (err) {}
  };

  const {
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      hostelName: '',
      address: '',
      // intake: '',
      // type: '',
    },
    validationSchema: HostelSchema,
    onSubmit,
  });

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
          <Link to={`/hostel/manage-hostels`}>
            <PrimaryButton
              label='View Hostels/Houses'
              icon={<FaPlusCircle />}
            />
          </Link>
        </AddView>
        <form onSubmit={handleSubmit}>
          <MainContainer>
            <Label>Add Subject</Label>
            <div style={{ width: '100%' }}>
              {' '}
              <TextInput
                label='Hostel/House Name'
                name='hostelName'
                value={values.hostelName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.hostelName && errors.hostelName ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.hostelName}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>

            {/* <div style={{ width: '100%' }}>
              {' '}
              <TextInput
                type='number'
                label='Hostel/House Capacity'
                name='intake'
                value={values.intake}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.intake && errors.intake ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.intake}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div> */}
            <div style={{ width: '100%' }}>
              {' '}
              <TextInput
                label='Hostel Address'
                placeholder='e.g School Premises'
                name='address'
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.address && errors.address ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.address}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>

            {/* <div style={{ width: '100%' }}>
              <CustomSelect
                placeholder='e.g Boys'
                label='Type'
                name='type'
                options={typeOptions}
                isSearchable={false}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue('type', e.value)}
              />
              {touched.type && errors.type ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.type}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div> */}
            <PrimaryButton
              type='submit'
              label='Add Hostel/House'
              icon={<FaPlusCircle />}
            />
          </MainContainer>
        </form>
      </Layout>
    </div>
  );
};

export default AddHostel;
