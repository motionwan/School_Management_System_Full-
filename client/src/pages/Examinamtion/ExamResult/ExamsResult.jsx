import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../Components/Layout/Layout';
import { baseUrl } from '../../../helpers/baseUrl';
import Spinner from '../../../Components/Spinner/Spinner';
import Notification from '../../../Components/Notification/Notification';
import AuthContext from '../../../context/AuthContext/AuthContext';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { Link } from 'react-router-dom';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableContainer,
} from '../../../Components/Table/Table.styles';
import { format } from 'date-fns';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { auth } = useContext(AuthContext);
  // handle errors with this function
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    const getAllExamsWithDetails = async () => {
      setPageLoading(true);
      try {
        const res = await axios.get(
          `${baseUrl}/class_school_exams/${auth?.currentTermId._id}`
        );
        console.log(res.data);
        setSubjects(res.data);
        setPageLoading(false);
      } catch (err) {
        console.log(err);
        if (!err.response.ok) setErrorMessage('Network error');
        handleError(err.response.data.error);
        setPageLoading(false);
      }
    };
    getAllExamsWithDetails();
  }, [auth?.currentTermId]);

  return (
    <div>
      {pageLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <Layout>
          <LocationLabel
            label={auth?.schoolId.label.toUpperCase()}
            icon={<FaSchool />}
          >
            <TermSelector />
          </LocationLabel>
          <AddView></AddView>
          {errorMessage ? (
            <Notification message={errorMessage} type='error' />
          ) : null}

          <div>
            {subjects.length < 1 ? (
              <h1>No Subject Data to display</h1>
            ) : (
              <TableContainer>
                <Table>
                  <thead>
                    <TableRow>
                      <TableHeader>Exam</TableHeader>
                      <TableHeader>Class</TableHeader>
                      <TableHeader>Course</TableHeader>
                      <TableHeader>Exam Center</TableHeader>
                      <TableHeader>Start Date</TableHeader>
                      <TableHeader>End Date</TableHeader>
                      <TableHeader>Upload Result</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <React.Fragment key={subject._id}>
                        <TableRow data-label='Exams Label'>
                          <TableCell data-label='Exams Label'>
                            {subject.examLabel}
                          </TableCell>
                          <TableCell data-label='Class'>
                            {subject.class}
                          </TableCell>
                          <TableCell data-label='Course'>
                            {subject.section}
                          </TableCell>
                          <TableCell data-label='Exams Center'>
                            {subject.examCenter}
                          </TableCell>
                          <TableCell data-label='Start Date'>
                            {format(new Date(subject.startDate), 'do-MMM-yyyy')}
                          </TableCell>
                          <TableCell data-label='End Date'>
                            {format(new Date(subject.endDate), 'do-MMM-yyyy')}
                          </TableCell>
                          <TableCell data-label='Class'>
                            <Link to={`/exams/add_exam_result`}>
                              <PrimaryButton
                                label='Assign Results'
                                icon={<FaPlusCircle />}
                              />
                            </Link>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            )}
          </div>

          {errorMessage && <Notification message={errorMessage} type='error' />}
        </Layout>
      )}
    </div>
  );
};

export default Subjects;
