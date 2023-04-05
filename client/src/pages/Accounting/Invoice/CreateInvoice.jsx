import React, { useContext, useEffect, useState } from 'react';
import { FaSchool } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import styled from 'styled-components';
import {
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '../../../Components/Table/Table.styles';
import { useFormik } from 'formik';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import TextInput from '../../../Components/Input/Input';
import { ButtonContainer } from '../../UserSettings/Settings.styles';
import axios from 'axios';
import { baseUrl } from '../../../helpers/baseUrl';
import {
  Label,
  MajorContainer,
} from '../../../Components/FormComponents/FormComponents';
import invoiceSchema from '../../../formSchema/InvoiceSchema/InvoiceSchema';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import { Store } from 'react-notifications-component';
import Notification from '../../../Components/Notification/Notification';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 10rem;
  padding: 0.5rem;
`;

const CreateInvoice = () => {
  const [classes, setClasses] = useState(null);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [terms, setTerms] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const { auth } = useContext(AuthContext);
  const selectedStudents = [];
  const selectedFees = [];

  useEffect(() => {
    const arr = [];
    const getAllClassSchoolsForSchool = async () => {
      const res = await axios.get(
        `${baseUrl}/class_school/class/${auth.schoolId?._id}`
      );
      res.data.forEach((classSchool) => {
        arr.push({
          label: classSchool.classId.label,
          value: classSchool._id,
        });
      });
      setClasses(arr);
    };
    getAllClassSchoolsForSchool();
  }, [auth]);

  // select terms
  useEffect(() => {
    const arr = [];
    const getAllTerms = async () => {
      const res = await axios.get(`${baseUrl}/term`);
      res.data.forEach((term) => {
        arr.push({
          label: term.label,
          value: term._id,
        });
      });
      setTerms(arr);
    };
    getAllTerms();
  }, []);

  // handle fee selection
  const handleFeeSelect = (e) => {
    const { name, checked } = e.target;
    if (name === 'all') {
      let tempFeeType = feeTypes.map((feeType) => {
        return {
          ...feeType,
          isChecked: checked,
        };
      });
      setFeeTypes(tempFeeType);
    } else {
      let tempFeeType = feeTypes.map((feeType) =>
        feeType._id === name ? { ...feeType, isChecked: checked } : feeType
      );
      setFeeTypes(tempFeeType);
    }
  };

  // eslint-disable-next-line array-callback-return
  feeTypes.map((feeType) => {
    if (feeType.isChecked === true) {
      selectedFees.push(feeType._id);
    }
  });

  // handle Error
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  //  handle student selection
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name === 'all') {
      let tempStudent = students.map((student) => {
        return {
          ...student,
          isChecked: checked,
        };
      });
      setStudents(tempStudent);
    } else {
      let tempStudent = students.map((student) =>
        student._id === name ? { ...student, isChecked: checked } : student
      );
      setStudents(tempStudent);
    }
  };

  // eslint-disable-next-line array-callback-return
  students.map((student) => {
    if (student.isChecked === true) {
      selectedStudents.push(student);
    }
  });

  useEffect(() => {
    const getFeeTypes = async () => {
      const res = await axios.get(`${baseUrl}/fee-types`);
      console.log(res.data);
      setFeeTypes(res.data);
    };
    getFeeTypes();
  }, []);

  const onSubmit = async (values) => {
    try {
      if (selectedStudents.length < 1) {
        handleError('Please select at least one student');
      } else if (selectedFees < 1) {
        handleError('Please select at least one fee structure');
      } else {
        const res = await Promise.all(
          selectedStudents.map((student) =>
            axios.post(`${baseUrl}/fees`, {
              title: values.title,
              admissionNumber: student.admissionNumber,
              sectionId: student.sectionId?._id,
              fees: selectedFees,
              classSchoolId: values.classSchoolId,
              termId: values.termId,
              dueDate: values.dueDate,
            })
          )
        );
        if (res) {
          Store.addNotification({
            title: 'Success!',
            message: 'Invoice created successfully',
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__bounceIn'],
            animationOut: ['animate__animated', 'animate__bounceOut'],
            dismiss: {
              duration: 5000,
            },
          });
          // navigate('/school_management/schools');
        }
      }
    } catch (err) {
      handleError(err.response.error);
    }
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      classSchoolId: '',
      sectionId: '',
      termId: '',
      title: '',
      dueDate: '',
    },
    validationSchema: invoiceSchema,
    onSubmit,
  });

  useEffect(() => {
    if (values?.classSchoolId) {
      const arr = [{ label: 'Select all', value: 'all' }];
      const getAllClassSchoolsForSchool = async () => {
        const res = await axios.get(
          `${baseUrl}/class_section/${values?.classSchoolId}`
        );
        // console.log(res.data);
        res.data.forEach((section) => {
          arr.push({
            ...arr,
            label: section.label,
            value: section._id,
          });
        });
        setSections(arr);
      };
      getAllClassSchoolsForSchool();
    }
  }, [values?.classSchoolId]);

  useEffect(() => {
    if (values.sectionId && values?.sectionId === 'all') {
      const getClassStudentsForSection = async () => {
        const res = await axios.get(
          `${baseUrl}/student_record/class-school/${auth?.currentTermId?._id}`,
          {
            classSchoolId: values?.classSchoolId,
          }
        );
        setStudents(res.data);
      };
      getClassStudentsForSection();
    } else if (values?.sectionId) {
      const getClassStudentsForSection = async () => {
        const res = await axios.post(
          `${baseUrl}/student_record/section/${auth?.currentTermId?._id}`,
          {
            sectionId: values?.sectionId,
          }
        );
        setStudents(res.data);
      };
      getClassStudentsForSection();
    }
  }, [values?.sectionId, values?.classSchoolId, auth]);
  console.log(selectedStudents);

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
          <Link to='#'>
            <PrimaryButton label='Create New Invoice' />
          </Link>
          <Link to='#'>
            <PrimaryButton label='Create New Invoice' />
          </Link>
          <Link to='#'>
            <PrimaryButton label='Create New Invoice' />
          </Link>
        </AddView>

        <form onSubmit={handleSubmit}>
          <MainContainer>
            <div style={{ width: '100%' }}>
              <CustomSelect
                name='classSchoolId'
                options={classes}
                label='Select Class'
                onChange={(e) => {
                  setFieldValue('classSchoolId', e.value);
                }}
              />
              {errors.classSchoolId && touched.classSchoolId && (
                <ErrorContainer>
                  <ErrorMessage>{errors.classSchoolId}</ErrorMessage>
                </ErrorContainer>
              )}
            </div>
            <div style={{ width: '100%' }}>
              <CustomSelect
                name='sectionId'
                options={sections}
                label='Select Program/Course'
                onChange={(e) => {
                  setFieldValue('sectionId', e.value);
                }}
              />
              {errors.sectionId && touched.sectionId && (
                <ErrorContainer>
                  <ErrorMessage>{errors.sectionId}</ErrorMessage>
                </ErrorContainer>
              )}
            </div>
            <div style={{ width: '100%' }}>
              <CustomSelect
                name='termId'
                options={terms}
                label='Select Term/Semester'
                onChange={(e) => {
                  setFieldValue('termId', e.value);
                }}
              />
              {errors.termId && touched.termId && (
                <ErrorContainer>
                  <ErrorMessage>{errors.termId}</ErrorMessage>
                </ErrorContainer>
              )}
            </div>
          </MainContainer>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <MajorContainer>
              <Label>Invoice Information</Label>
              <MainContainer>
                <div style={{ width: '100%' }}>
                  <TextInput
                    label='Invoice Label'
                    placeholder='e.g First Term School Fees'
                    name='title'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title && (
                    <ErrorContainer>
                      <ErrorMessage>{errors.title}</ErrorMessage>
                    </ErrorContainer>
                  )}
                </div>
                <div style={{ width: '100%' }}>
                  <TextInput
                    type='Date'
                    label='Due Date'
                    name='dueDate'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.dueDate && touched.dueDate && (
                    <ErrorContainer>
                      <ErrorMessage>{errors.dueDate}</ErrorMessage>
                    </ErrorContainer>
                  )}
                </div>
              </MainContainer>
            </MajorContainer>
          </div>

          {/* apply fees */}
          <MajorContainer>
            <Label>Select Fees that apply</Label>
            <MainContainer>
              <div style={{ width: '100%' }}>
                <Table>
                  <thead>
                    <TableRow>
                      <TableHeader>
                        <TextInput
                          type='checkbox'
                          name='all'
                          onChange={handleFeeSelect}
                          checked={
                            feeTypes.filter(
                              (feeType) => feeType?.isChecked !== true
                            ).length < 1
                          }
                        />
                      </TableHeader>
                      <TableHeader>Fee label</TableHeader>
                      <TableHeader>Amount</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {feeTypes.map((feeType) => {
                      return (
                        <React.Fragment key={feeType._id}>
                          <TableRow>
                            <TableCell>
                              <TextInput
                                type='checkbox'
                                name={feeType._id}
                                checked={feeType?.isChecked || false}
                                onChange={handleFeeSelect}
                              />
                            </TableCell>
                            <TableCell>{feeType.name}</TableCell>
                            <TableCell>{`GHC ${feeType.amount}`}</TableCell>
                          </TableRow>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </MainContainer>
          </MajorContainer>

          <TableContainer style={{ margin: '50px 0' }}>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>
                    <TextInput
                      type='checkbox'
                      name='all'
                      onChange={handleCheck}
                      checked={
                        students.filter(
                          (student) => student?.isChecked !== true
                        ).length < 1
                      }
                    />
                  </TableHeader>
                  <TableHeader>Student Name</TableHeader>
                  <TableHeader>Class</TableHeader>
                  <TableHeader>Course/Program</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {students.map((student) => (
                  <React.Fragment key={student._id}>
                    <TableRow>
                      <TableCell>
                        <TextInput
                          type='checkbox'
                          name={student._id}
                          checked={student?.isChecked || false}
                          onChange={handleCheck}
                        />
                      </TableCell>
                      <TableCell>{student.fullName}</TableCell>
                      <TableCell>
                        {student.sectionId?.classSchoolId?.classId?.label}
                      </TableCell>
                      <TableCell>{student.sectionId?.label}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </TableContainer>

          <ButtonContainer>
            <PrimaryButton type='submit' label='Generate Invoice' />
          </ButtonContainer>
        </form>
      </Layout>
      {errorMessage && <Notification type='error' message={errorMessage} />}
    </div>
  );
};

export default CreateInvoice;
