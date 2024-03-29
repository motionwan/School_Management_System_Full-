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
import { Link, useNavigate } from 'react-router-dom';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import {
  Action,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableExpandableRow,
  TableExpandableCell,
  TableContainer,
} from '../../../Components/Table/Table.styles';
import DialogModal from '../../../Components/Dialog/Dialog';
import ViewDelete from '../../../Components/ViewDelete/ViewDelete';

const Timetable = () => {
  const [classSchools, setClassSchools] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');
  const [expandedRowId, setExpandedRowId] = useState(null);
  const { currentData, setCurrentData, auth } = useContext(AuthContext);
  const [dialog, setDialog] = useState({ loading: false, message: '' });
  const navigate = useNavigate();

  // handle errors with this function
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    const getAllClassSchools = async () => {
      setPageLoading(true);
      try {
        const res = await axios.get(
          `${baseUrl}/timetable/group/${auth?.currentTermId?._id}`
        );
        setClassSchools(res.data);
        setPageLoading(false);
      } catch (err) {
        console.log(err);
        if (!err.response.ok) setErrorMessage('Network error');
        handleError(err.response.data.error);
        setPageLoading(false);
      }
    };
    getAllClassSchools();
  }, [auth]);

  const handleDelete = async (subject) => {
    setCurrentData(subject);
    setDialog({
      loading: true,
      message:
        'Are you sure you want to delete? This action will delete the timetable for this section',
    });
  };

  const deleteRecord = async (choice) => {
    setPageLoading(true);
    try {
      if (choice) {
        const res = await axios.get(
          `${baseUrl}/timetable/${currentData?.sectionId}`
        );
        setClassSchools(classSchools.filter((c) => c._id !== currentData?._id));
        setPageLoading(false);
        if (res) {
          setDialog({ loading: false, message: '' });
          setNotification('Subject deleted successfully');
          setPageLoading(false);
        }
      } else {
        setDialog({ loading: false, message: '' });
        setPageLoading(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response.data.error);
    }
  };

  const handleView = (subject) => {
    try {
      setCurrentData(subject);
      if (currentData) {
        navigate(`/client_academic/view_timetable`);
      }
    } catch (err) {
      console.error(err);
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  const handleExpand = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

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
          <AddView>
            <Link to={`/client_academic/add_timetable `}>
              <PrimaryButton
                label='Add New Timetable Routine'
                icon={<FaPlusCircle />}
              />
            </Link>
          </AddView>
          {errorMessage ? (
            <Notification message={errorMessage} type='error' />
          ) : null}
          {notification ? (
            <Notification message={notification} type='success' />
          ) : null}
          <div>
            {classSchools.length < 1 ? (
              <h1>No Timetable routine Data to display</h1>
            ) : (
              <TableContainer>
                <Table>
                  <thead>
                    <TableRow>
                      <TableHeader>Actions</TableHeader>
                      <TableHeader>Class</TableHeader>
                      <TableHeader>Section</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {classSchools.map((classSchool, index) => (
                      <React.Fragment key={index}>
                        <TableRow data-label='Actions'>
                          <TableCell data-label='Actions'>
                            <Action onClick={() => handleExpand(index)}>
                              Actions
                            </Action>
                          </TableCell>
                          <TableCell data-label='Label'>
                            {classSchool.classLabel}
                          </TableCell>
                          <TableCell data-label='Type'>
                            {classSchool.sectionLabel}
                          </TableCell>
                        </TableRow>
                        <TableExpandableRow
                          showExpandedRow={expandedRowId === index}
                        >
                          <TableExpandableCell colSpan={6}>
                            <ViewDelete
                              deleteRecord={() => handleDelete(classSchool)}
                              viewRecord={() => handleView(classSchool)}
                            />
                          </TableExpandableCell>
                        </TableExpandableRow>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            )}
          </div>
          {dialog.loading && (
            <DialogModal onDialog={deleteRecord} message={dialog.message} />
          )}
          {errorMessage && <Notification message={errorMessage} type='error' />}
          {notification && (
            <Notification message={notification} type='success' />
          )}
        </Layout>
      )}
    </div>
  );
};

export default Timetable;
