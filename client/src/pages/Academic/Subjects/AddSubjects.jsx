import React, { useContext } from 'react';
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

const AddSubjects = () => {
  const { auth, currentData } = useContext(AuthContext);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        label: '',
        code: '',
        type: '',
        class: '',
      },
    });
  return (
    <Layout>
      <LocationLabel label={auth.schoolId.label.toUpperCase()}>
        <TermSelector />
      </LocationLabel>
      <form>
        <MainContainer>
          <Label>Add Subject</Label>
          <TextInput label='Subject Name' />
          <TextInput label='Subject Code' />
          <div style={{ width: '100%' }}>
            <Select placeholder='Subject Type' />
          </div>
          <div style={{ width: '100%' }}>
            <Select placeholder='Class' />
          </div>
          <PrimaryButton label='Add New Subject' icon={<FaPlusCircle />} />
        </MainContainer>
      </form>
    </Layout>
  );
};

export default AddSubjects;
