import React, { useContext } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';

const ExamsResult = () => {
  const { auth } = useContext(AuthContext);
  return (
    <Layout>
      <LocationLabel
        label={auth?.schoolId.label.toUpperCase()}
        icon={<FaSchool />}
      >
        <TermSelector />
      </LocationLabel>
      <AddView>
        <Link to={`/exams/add_exam_result `}>
          <PrimaryButton label='Upload Exam Results' icon={<FaPlusCircle />} />
        </Link>
      </AddView>
    </Layout>
  );
};

export default ExamsResult;
