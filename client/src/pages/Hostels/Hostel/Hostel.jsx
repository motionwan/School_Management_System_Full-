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
import DeleteEdit from '../../../Components/DeleteAndEdit/DeleteEdit';
import DialogModal from '../../../Components/Dialog/Dialog';

const Subjects = () => {
  const [hostel, setHostel] = useState([]);
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
    const getAllHostels = async () => {
      setPageLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/hostel`);
        setHostel(res.data);
        setPageLoading(false);
      } catch (err) {
        console.log(err);
        if (!err.response.ok) setErrorMessage('Network error');
        handleError(err.response.data.error);
        setPageLoading(false);
      }
    };
    getAllHostels();
  }, []);

  const handleDelete = async (subject) => {
    setCurrentData(subject);
    setDialog({
      loading: true,
      message:
        'Are you sure you want to delete? This action is irreversible and may affect your school',
    });
  };

  const deleteRecord = async (choice) => {
    setPageLoading(true);
    try {
      if (choice) {
        const res = await axios.delete(
          `${baseUrl}/subject/${currentData?._id}`
        );
        setHostel(hostel.filter((c) => c._id !== currentData?._id));
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

  const handleEdit = (subject) => {
    try {
      setCurrentData(subject);
      if (currentData) {
        navigate(`/client_academic/update_subject`);
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
            <Link to={`/hostel/add-hostels`}>
              <PrimaryButton label='Add Hostel/House' icon={<FaPlusCircle />} />
            </Link>
          </AddView>
          {errorMessage ? (
            <Notification message={errorMessage} type='error' />
          ) : null}
          {notification ? (
            <Notification message={notification} type='success' />
          ) : null}
          <div>
            {hostel.length < 1 ? (
              <h1>No Subject Data to display</h1>
            ) : (
              <TableContainer>
                <Table>
                  <thead>
                    <TableRow>
                      <TableHeader>Actions</TableHeader>
                      <TableHeader>Hostel/House Name</TableHeader>
                      <TableHeader>Address</TableHeader>
                      {/* <TableHeader>Type</TableHeader>
                      <TableHeader>Capacity</TableHeader> */}
                    </TableRow>
                  </thead>
                  <tbody>
                    {hostel.map((h) => (
                      <React.Fragment key={h._id}>
                        <TableRow data-label='Actions'>
                          <TableCell data-label='Actions'>
                            <Action onClick={() => handleExpand(h._id)}>
                              Actions
                            </Action>
                          </TableCell>
                          <TableCell data-label='Label'>
                            {h.hostelName}
                          </TableCell>
                          <TableCell data-label='Code'>{h.address}</TableCell>
                          {/* <TableCell data-label='Type'>{h.type}</TableCell> */}
                          {/* <TableCell data-label='Class'>{h.intake}</TableCell> */}
                        </TableRow>
                        <TableExpandableRow
                          showExpandedRow={expandedRowId === h._id}
                        >
                          <TableExpandableCell colSpan={6}>
                            <DeleteEdit
                              deleteRecord={() => handleDelete(h)}
                              editRecord={() => handleEdit(h)}
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

export default Subjects;
