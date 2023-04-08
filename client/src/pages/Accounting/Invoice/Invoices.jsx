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
import { useFormik } from 'formik';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import { ButtonContainer } from '../../UserSettings/Settings.styles';
import {
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '../../../Components/Table/Table.styles';
import { TertiaryButton } from '../../../Components/Buttons/TertiaryButton';
import axios from 'axios';
import { baseUrl } from '../../../helpers/baseUrl';
import searchInvoiceSchema from '../../../formSchema/searchInvoiceSchema/SearchInvoiceSchema';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 10rem;
  padding: 0.5rem;
`;

const Invoices = () => {
  const { auth, setCurrentData } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [fees, setFees] = useState([]);

  const handlePayNow = (admissionNumber, fullName) => {
    setCurrentData({ admissionNumber, fullName });
  };

  // get fees by termId
  useEffect(() => {
    const getFeeTypes = async () => {
      const res = await axios.get(`${baseUrl}/fees/latest-fees`);

      setFees(res.data);
    };
    getFeeTypes();
  }, [auth.currentTermId._id]);

  // get classes for school
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

  // filter the invoices on display further
  const onSubmit = async (values) => {
    try {
      const res = await axios.get(
        `${baseUrl}/fees/detailed-fees/${values.sectionId}`
      );
      //use filter instead of submit
      setFees(res.data);
    } catch (err) {}
  };

  const { values, touched, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      classSchoolId: '',
      sectionId: '',
    },
    validationSchema: searchInvoiceSchema,
    onSubmit,
  });

  //console.log(values);

  // get sections with classSchoolId
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
          <Link to='/account/add-invoice'>
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
          </MainContainer>
          <ButtonContainer style={{ marginTop: '-20px' }}>
            <PrimaryButton label='Search invoice' type='submit' />
          </ButtonContainer>
        </form>
        <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Admission Number</TableHeader>
                <TableHeader>Amount Owed</TableHeader>
                <TableHeader>Pay Now</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {fees.map((fee) => {
                return (
                  <React.Fragment key={fee._id}>
                    <TableRow>
                      <TableCell>{fee.student.fullName}</TableCell>
                      <TableCell>{fee.admissionNumber}</TableCell>
                      <TableCell>{`GHS ${fee.totalFeePayable}`}</TableCell>
                      <TableCell>
                        <div>
                          <Link to={`/account/pay-invoice`}>
                            <TertiaryButton
                              label='Pay Now'
                              onClick={() =>
                                handlePayNow(
                                  fee.admissionNumber,
                                  fee.student?.fullName
                                )
                              }
                            />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
        </TableContainer>
      </Layout>
    </div>
  );
};

export default Invoices;
