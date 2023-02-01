import React, { useContext } from 'react';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';

const UpdateSubject = () => {
  const { auth, currentData } = useContext(AuthContext);
  return (
    <Layout>
      <LocationLabel label={auth.schoolId.label.toUpperCase()}>
        <TermSelector />
      </LocationLabel>
    </Layout>
  );
};

export default UpdateSubject;
