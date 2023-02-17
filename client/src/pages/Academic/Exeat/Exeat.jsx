import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../Components/Layout/Layout';
import { baseUrl } from '../../../helpers/baseUrl';
import Spinner from '../../../Components/Spinner/Spinner';
import AuthContext from '../../../context/AuthContext/AuthContext';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import Notification from '../../../Components/Notification/Notification';
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableContainer,
  Action,
  TableExpandableRow,
  TableExpandableCell,
} from '../../../Components/Table/Table.styles';
import { format } from 'date-fns';
import DeleteEdit from '../../../Components/DeleteAndEdit/DeleteEdit';
import DialogModal from '../../../Components/Dialog/Dialog';

const Exeat = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [exeats, setExeats] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [dialog, setDialog] = useState({ loading: false, message: '' });
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [notification, setNotification] = useState('');
  const { auth, setCurrentData, currentData } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle errors with this function
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  // find all classes
  useEffect(() => {
    setPageLoading(true);
    try {
      const getAllExeat = async () => {
        const res = await axios.get(
          `${baseUrl}/exeat/${auth?.currentTermId._id}`
        );
        setExeats(res.data);
        setPageLoading(false);
      };
      getAllExeat();
    } catch (err) {
      handleError(err.response.data.error);
    }
  }, [auth]);

  const handleExpand = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  //handle edit
  const handleEdit = (exeat) => {
    try {
      setCurrentData(exeat);
      if (currentData) {
        navigate(`/client_academic/${auth.schoolId._id}/update_exeat`);
      }
    } catch (err) {
      console.error(err);
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  const handleDelete = async (exeat) => {
    setCurrentData(exeat);
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
        const res = await axios.delete(`${baseUrl}/exeat/${currentData?._id}`);
        setExeats(exeats.filter((c) => c._id !== currentData?._id));
        setPageLoading(false);
        if (res) {
          setDialog({ loading: false, message: '' });
          setNotification('Exeat deleted successfully');
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
            <Link to={`/client_academic/${auth.schoolId._id}/add_exeat`}>
              <PrimaryButton label='Issue Exeat' icon={<FaPlusCircle />} />
            </Link>
          </AddView>
          {exeats.length < 1 ? (
            <h2>No Exeats Requests</h2>
          ) : (
            <TableContainer>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Action</TableHeader>
                    <TableHeader>Student Name</TableHeader>
                    <TableHeader>Admission Number</TableHeader>
                    <TableHeader>Class</TableHeader>
                    <TableHeader>Section</TableHeader>
                    <TableHeader>Reason</TableHeader>
                    <TableHeader>Leave Date</TableHeader>
                    <TableHeader>Return Date</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {exeats.map((exeat) => {
                    return (
                      <React.Fragment key={exeat._id}>
                        <TableRow key={exeat._id}>
                          <TableCell data-label='Actions'>
                            <Action onClick={() => handleExpand(exeat._id)}>
                              Actions
                            </Action>
                          </TableCell>
                          <TableCell data-label='Name'>
                            {exeat?.studentName}
                          </TableCell>
                          <TableCell data-label='Admission number'>
                            {exeat?.admissionNumber}
                          </TableCell>
                          <TableCell data-label='Class'>
                            {exeat.class}
                          </TableCell>
                          <TableCell data-label='Section'>
                            {exeat?.section}
                          </TableCell>
                          <TableCell data-label='Reason'>
                            {exeat.reason}
                          </TableCell>
                          <TableCell data-label='Start Date'>
                            {format(new Date(exeat.startDate), 'dd-MM-yyyy')}
                          </TableCell>
                          <TableCell data-label='End Date'>
                            {format(new Date(exeat.endDate), 'dd-MM-yyyy')}
                          </TableCell>
                          <TableCell data-label='Status'>
                            {exeat.isApproved ? (
                              <div style={{ color: 'green' }}>approved </div>
                            ) : (
                              <div style={{ color: 'red' }}>unapproved</div>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableExpandableRow
                          showExpandedRow={expandedRowId === exeat._id}
                        >
                          <TableExpandableCell colSpan={9}>
                            <DeleteEdit
                              deleteRecord={() => handleDelete(exeat)}
                              editRecord={() => handleEdit(exeat)}
                            />
                          </TableExpandableCell>
                        </TableExpandableRow>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </TableContainer>
          )}
        </Layout>
      )}
      {dialog.loading && (
        <DialogModal onDialog={deleteRecord} message={dialog.message} />
      )}
      {errorMessage && <Notification message={errorMessage} type='error' />}
      {notification && <Notification message={notification} type='success' />}
    </div>
  );
};

export default Exeat;
