import React, { useContext } from 'react';
import { FaSchool } from 'react-icons/fa';
import AddView from '../../../Components/AddViewComponent/AddView';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';

const Promotion = () => {
  const { auth } = useContext(AuthContext);
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
          <h3>Student Promotion</h3>
        </AddView>
      </Layout>
    </div>
  );
};

export default Promotion;
