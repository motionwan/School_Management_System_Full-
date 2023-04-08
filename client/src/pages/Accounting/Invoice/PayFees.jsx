import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthContext/AuthContext';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import { FaSchool } from 'react-icons/fa';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AddView from '../../../Components/AddViewComponent/AddView';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import styled from 'styled-components';
import { ButtonContainer } from '../../Students/Promotion/Promotion.styles';
import { useFormik } from 'formik';
import TextInput from '../../../Components/Input/Input';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import PayFeesSchema from '../../../formSchema/PayFeesSchema/PayFeesSchema';
import axios from 'axios';
import { baseUrl } from '../../../helpers/baseUrl';
import { Store } from 'react-notifications-component';
import Spinner from '../../../Components/Spinner/Spinner';
import {
  Label,
  MajorContainer,
} from '../../../Components/FormComponents/FormComponents';
import {
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '../../../Components/Table/Table.styles';
import { format } from 'date-fns';
import { TertiaryButton } from '../../../Components/Buttons/TertiaryButton';
import {
  ModalContainer,
  ModalOverlay,
} from '../../Examinamtion/BulkPrint/BulkPrintStyles/BulkPrint.styles';
import Receipt from './Reciept/Receipt';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 10rem;
  padding: 0.5rem;
`;

const PayFees = () => {
  const { auth, currentData } = useContext(AuthContext);
  const [pageLoading, setPageLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [data, setData] = useState([]);

  const handleCancel = () => {
    setModal(false);
  };

  // get payment history of the current student
  useEffect(() => {
    const getPaymentHistory = async () => {
      const res = await axios(
        `${baseUrl}/payments/${currentData?.admissionNumber}`
      );
      setPaymentHistory(res.data);
      console.log(res.data);
    };
    getPaymentHistory();
  }, [currentData]);

  const onSubmit = async (choice) => {
    try {
      if (choice) {
        const res = await axios.post(`${baseUrl}/fees/pay`, {
          admissionNumber: values.admissionNumber,
          amount: values.amount,
        });
        if (res) {
          Store.addNotification({
            title: 'Success!',
            message: `Fee Paid successfully to student with admission number ${values.admissionNumber}`,
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__bounceIn'],
            animationOut: ['animate__animated', 'animate__bounceOut'],
            dismiss: {
              duration: 7000,
            },
          });

          setPageLoading(false);

          onSubmitPrint(values.admissionNumber);
        }
      } else {
      }
    } catch (err) {
      console.log(err);
      setPageLoading(false);
    }
  };
  // handle print
  const onSubmitPrint = async (admissionNumber) => {
    try {
      const res = await axios.get(
        `${baseUrl}/fees/payment-history/${admissionNumber}/${auth?.currentTermId?._id}`
      );
      setData(res.data);
      console.log(res.data);
      setModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        admissionNumber: currentData?.admissionNumber,
        amount: 0,
      },
      validationSchema: PayFeesSchema,
      onSubmit,
    });
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
          <Link to='/account/invoice'>
            <PrimaryButton label='View Invoice' />
          </Link>
        </AddView>
        <form onSubmit={handleSubmit}>
          <MainContainer>
            <div style={{ width: '100%' }}>
              <TextInput
                label='Admission Number'
                name='admissionNumber'
                value={values.admissionNumber}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.admissionNumber && touched.admissionNumber && (
                <ErrorContainer>
                  <ErrorMessage>{errors.admissionNumber}</ErrorMessage>
                </ErrorContainer>
              )}
            </div>
            <div style={{ width: '100%' }}>
              <TextInput
                label='Amount'
                type='number'
                name='amount'
                value={values.amount}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.amount && touched.amount && (
                <ErrorContainer>
                  <ErrorMessage>{errors.amount}</ErrorMessage>
                </ErrorContainer>
              )}
            </div>
          </MainContainer>
          <ButtonContainer style={{ marginTop: '-20px' }}>
            <PrimaryButton label='Pay Fees' type='submit' />
          </ButtonContainer>
        </form>
        <MajorContainer style={{ margin: '30px 0' }}>
          <Label style={{ margin: '10px 0' }}>Payment History</Label>
          <TableContainer style={{ width: '100%' }}>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Amount Paid</TableHeader>
                  <TableHeader>Print</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {paymentHistory.map((history) => {
                  return (
                    <React.Fragment key={history._id}>
                      <TableRow>
                        <TableCell>
                          {format(new Date(history.date), 'do MMMM yyyy')}
                        </TableCell>
                        <TableCell>{history.amount}</TableCell>
                        <TableCell>
                          <TertiaryButton
                            label='print'
                            onClick={() => {
                              onSubmitPrint(history.admissionNumber);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </Table>
          </TableContainer>
        </MajorContainer>
      </Layout>
      {pageLoading && <Spinner />}
      {modal && (
        <ModalOverlay>
          <ModalContainer>
            <Receipt data={data} onCancel={handleCancel} />
          </ModalContainer>
        </ModalOverlay>
      )}
    </div>
  );
};

export default PayFees;
