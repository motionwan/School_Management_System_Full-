import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../Components/Layout/Layout';
import { baseUrl } from '../../../helpers/baseUrl';
import Spinner from '../../../Components/Spinner/Spinner';
import Notification from '../../../Components/Notification/Notification';
import AuthContext from '../../../context/AuthContext/AuthContext';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import { FaSchool } from 'react-icons/fa';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';
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
import styled from 'styled-components';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import TextInput from '../../../Components/Input/Input';
import { useFormik } from 'formik';

const SearchContainer = styled.div`
  width: 98%;
  height: 100px;
  margin: 100px 0;
  border: 1px solid ${({ theme }) => theme.bg3};
`;
const InputContainer = styled.div`
  display: flex;
  padding: 0 60px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');
  const [expandedRowId, setExpandedRowId] = useState(null);
  const { currentData, setCurrentData, auth } = useContext(AuthContext);
  const [dialog, setDialog] = useState({ loading: false, message: '' });
  const navigate = useNavigate();

  const searchArray = [
    { value: 'fullName', label: 'Full Name' },
    { value: 'admissionNumber', label: 'Admission Number' },
    { value: 'email', label: 'Student Email' },
    { value: 'phoneNumber', label: 'Student Phone Number' },
    { value: 'guardianName', label: 'Guardian Name' },
    { value: 'guardianPhoneNumber', label: 'Guardian Phone Number' },
  ];

  // handle errors with this function
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    const getAllStudents = async () => {
      setPageLoading(true);
      try {
        const res = await axios.get(
          `${baseUrl}/student_record/${auth?.currentTermId?._id}`
        );
        setStudents(res.data);
        setPageLoading(false);
      } catch (err) {
        console.log(err);
        if (!err.response.ok) setErrorMessage('Network error');
        handleError(err.response.data.error);
        setPageLoading(false);
      }
    };
    getAllStudents();
  }, [auth]);

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
        setStudents(students.filter((c) => c._id !== currentData?._id));
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
        navigate(`/client_academic/${auth.schoolId._id}/update_subject`);
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

  const onSubmit = async () => {
    const res = await axios.post(`${baseUrl}/student_record/search`, {
      searchBy: values.searchBy,
      searchValue: values.searchValue,
    });
    setStudents(res.data);
  };

  const { values, setFieldValue, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        searchBy: null,
        searchValue: '',
      },
      onSubmit,
    });
  //console.log(values);

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
          <form onSubmit={handleSubmit}>
            <SearchContainer>
              <InputContainer>
                <CustomSelect
                  label='Search Student by:'
                  name='searchBy'
                  options={searchArray}
                  onChange={(e) => setFieldValue('searchBy', e.value)}
                />
                <TextInput
                  label='Search Value'
                  placeholder='e.g Benjamin Mordedzi'
                  name='searchValue'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div style={{ marginTop: '13px' }}>
                  <PrimaryButton label='Search' />
                </div>
              </InputContainer>
            </SearchContainer>
          </form>

          {errorMessage ? (
            <Notification message={errorMessage} type='error' />
          ) : null}
          {notification ? (
            <Notification message={notification} type='success' />
          ) : null}
          <div>
            {students.length < 1 ? (
              <h1>No Student Data to display</h1>
            ) : (
              <TableContainer>
                <Table>
                  <thead>
                    <TableRow>
                      <TableHeader>Actions</TableHeader>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Admission Number</TableHeader>
                      <TableHeader>Phone Number</TableHeader>
                      <TableHeader>Email</TableHeader>
                      <TableHeader>Class</TableHeader>
                      <TableHeader>Course</TableHeader>
                      <TableHeader>Guardian Name</TableHeader>
                      <TableHeader>Guardian Number</TableHeader>
                      <TableHeader>username</TableHeader>
                      <TableHeader>Status</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <React.Fragment key={student._id}>
                        <TableRow data-label='Actions'>
                          <TableCell data-label='Actions'>
                            <Action onClick={() => handleExpand(student._id)}>
                              Actions
                            </Action>
                          </TableCell>
                          <TableCell data-label='Label'>
                            {student.fullName}
                          </TableCell>
                          <TableCell data-label='Type'>
                            {student.admissionNumber}
                          </TableCell>
                          <TableCell data-label='Code'>
                            {student.phoneNumber}
                          </TableCell>
                          <TableCell data-label='Class'>
                            {student.email}
                          </TableCell>
                          <TableCell data-label='Teacher'>
                            {student.sectionId?.classSchoolId?.classId.label}
                          </TableCell>
                          <TableCell data-label='Teacher'>
                            {student.sectionId.label}
                          </TableCell>
                          <TableCell data-label='Teacher'>
                            {student.guardianName}
                          </TableCell>
                          <TableCell data-label='Teacher'>
                            {student.guardianNumber}
                          </TableCell>
                          <TableCell data-label='Teacher'>
                            {student.username}
                          </TableCell>
                          <TableCell data-label='Teacher'>
                            {student.status ? 'Active' : 'Inactive'}
                          </TableCell>
                        </TableRow>
                        <TableExpandableRow
                          showExpandedRow={expandedRowId === student._id}
                        >
                          <TableExpandableCell colSpan={6}>
                            <DeleteEdit
                              deleteRecord={() => handleDelete(student)}
                              editRecord={() => handleEdit(student)}
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

export default ViewStudents;
