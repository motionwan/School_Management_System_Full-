import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { FaSchool } from 'react-icons/fa';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import Spinner from '../../../Components/Spinner/Spinner';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { baseUrl } from '../../../helpers/baseUrl';
import Schedule from './Schedule';

const ViewTimetable = () => {
  const { auth, currentData } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(currentData);
  console.log(data);

  useEffect(() => {
    setLoading(true);
    const getAllTimeTableData = async () => {
      const res = await axios.post(`${baseUrl}/timetable/class`, {
        sectionId: currentData?.sectionId,
        termId: auth?.currentTermId._id,
      });
      setData(res.data);

      setLoading(false);
    };
    getAllTimeTableData();
  }, [currentData, auth.currentTermId._id]);

  return (
    <div>
      <LocationLabel
        label={auth?.schoolId.label.toUpperCase()}
        icon={<FaSchool />}
      >
        <TermSelector />
      </LocationLabel>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <Layout>
          <Schedule data={data} />
        </Layout>
      )}
    </div>
  );
};

export default ViewTimetable;
