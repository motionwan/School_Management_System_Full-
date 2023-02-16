import React, { useContext, useState } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';

const StudyMaterials = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [students, setStudents] = useState([]);
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
          <Link
            to={`/client_academic/${auth.schoolId._id}/add_study_materials `}
          >
            <PrimaryButton label='Add Study Material' icon={<FaPlusCircle />} />
          </Link>
        </AddView>
      </Layout>
    </div>
  );
};

export default StudyMaterials;
