import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PrimaryButton } from '../../../../Components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../../../Components/Buttons/SecondaryButton';
import { ButtonContainer } from '../../../../Components/DashboardCard/DashboardCard';
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableContainer,
} from '../../../../Components/Table/Table.styles';
import '../../../Examinamtion/BulkPrint/BulkPrintStyles/styles.css';
import {
  SchoolDetailContainer,
  SchoolName,
  Label,
  DetailContainer,
  SingleContainer,
  Name,
  CrestContainer,
  StudentDetailContainer,
  StudentProfileContainer,
  TermDetailsContainer,
} from '../../../Examinamtion/BulkPrint/BulkPrintStyles/StudentReportCardStyles';
import { format } from 'date-fns';

const Receipt = ({ data, onCancel }) => {
  const componentRef = useRef();

  const handleCancel = () => {
    onCancel();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  return (
    <div ref={componentRef}>
      <div style={{ padding: '20px' }}>
        {data.map((history) => (
          <div key={history._id}>
            <SchoolDetailContainer>
              <CrestContainer></CrestContainer>
              <DetailContainer>
                <SchoolName>{history.school.schoolName}</SchoolName>
                <SingleContainer>
                  <Label>Phone:</Label>
                  <Label>{history.school.phone}</Label>
                </SingleContainer>
                <SingleContainer>
                  <Label>Email:</Label>
                  <Label style={{ textTransform: 'lowercase' }}>
                    {history?.school.email}
                  </Label>
                </SingleContainer>
                <SingleContainer>
                  <Label>Address:</Label>
                  <Label>{history?.school.address}</Label>
                </SingleContainer>
              </DetailContainer>
            </SchoolDetailContainer>
            <TermDetailsContainer>
              <SchoolName>
                {`Fee Payment Receipt ${history?.term.label}`}{' '}
              </SchoolName>
            </TermDetailsContainer>

            <StudentDetailContainer>
              <DetailContainer>
                <SingleContainer>
                  <Label>Student Name:</Label>
                  <Name>{history?.student.fullName}</Name>
                </SingleContainer>
                <SingleContainer>
                  <Label>Class:</Label>
                  <Name>{history?.class.label}</Name>
                </SingleContainer>
                <SingleContainer>
                  <Label>Section/Course:</Label>
                  <Name>{history?.section.section}</Name>
                </SingleContainer>
              </DetailContainer>

              <DetailContainer>
                <SingleContainer>
                  <Label>Admission Number:</Label>
                  <Name>{history?.student.admissionNumber}</Name>
                </SingleContainer>
                <SingleContainer>
                  <Label>Phone Number:</Label>
                  <Name>{history?.student.phone}</Name>
                </SingleContainer>
                <SingleContainer>
                  <Label>Guardian's Name:</Label>
                  <Name>{history?.student.guardian}</Name>
                </SingleContainer>
              </DetailContainer>
              <StudentProfileContainer></StudentProfileContainer>
            </StudentDetailContainer>

            <TableContainer style={{ margin: '50px 0' }}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '-20px',
                }}
              >
                <h3>{`Payment History for ${data[0].term.label}`}</h3>
              </div>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Amount Paid</TableHeader>
                    <TableHeader>Date </TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {data[0].paymentHistory.map((payHistory) => {
                    return (
                      <TableRow key={payHistory._id}>
                        <TableCell style={{ fontWeight: 'bold' }}>
                          {`GHC ${payHistory.amount}`}{' '}
                        </TableCell>
                        <TableCell>
                          {format(new Date(payHistory.date), 'do MMMM yyyy')}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </tbody>
              </Table>
            </TableContainer>

            <TableContainer style={{ margin: '50px 0' }}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '-10px',
                }}
              >
                <h3>{`Last Payment for ${data[0].term.label}`}</h3>
              </div>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Amount Paid</TableHeader>
                    <TableHeader>Date</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      {`GHC ${data[0]?.lastPayment.amount}`}{' '}
                    </TableCell>
                    <TableCell>
                      {format(
                        new Date(data[0].lastPayment?.date),
                        'do MMMM yyyy'
                      )}
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
            <div style={{ marginTop: '-10px' }}>
              <h4>{`BALANCE : GHC ${data[0].balance}`} </h4>{' '}
              <h4>{`ARREARS: ${data[0].arrears}`}</h4>
            </div>
          </div>
        ))}
        <ButtonContainer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '-10px',
          }}
        >
          <PrimaryButton
            className='print-button'
            label='Print'
            onClick={handlePrint}
          />
          <SecondaryButton
            className='print-button'
            label='Cancel'
            onClick={handleCancel}
          />
        </ButtonContainer>
      </div>
    </div>
  );
};

export default Receipt;
