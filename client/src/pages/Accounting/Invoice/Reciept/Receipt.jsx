import React, { useContext, useRef } from 'react';
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
//import '../../../Examinamtion/BulkPrint/BulkPrintStyles/BulkPrint.styles.css';
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
import AuthContext from '../../../../context/AuthContext/AuthContext';

const Receipt = ({
  fullName,
  AdmissionNumber,
  phone,
  email,
  date,
  amount,
  data,
  onCancel,
}) => {
  const componentRef = useRef();
  const { auth } = useContext(AuthContext);

  const handleCancel = () => {
    onCancel();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // if (!data || data.length === 0) {
  //   return <div>No data to display</div>;
  // }

  return (
    <div ref={componentRef}>
      <div style={{ padding: '20px' }}>
        <div>
          <SchoolDetailContainer>
            <CrestContainer></CrestContainer>
            <DetailContainer>
              <SchoolName>{auth?.schoolId.schoolName}</SchoolName>
              <SingleContainer>
                <Label>Phone:</Label>
                <Label>{auth?.schoolId.phone}</Label>
              </SingleContainer>
              <SingleContainer>
                <Label>Email:</Label>
                <Label style={{ textTransform: 'lowercase' }}>
                  {auth?.schoolId.email}
                </Label>
              </SingleContainer>
              <SingleContainer>
                <Label>Address:</Label>
                <Label>{auth?.schoolId.address}</Label>
              </SingleContainer>
            </DetailContainer>
          </SchoolDetailContainer>
          {/* <TermDetailsContainer>
              <SchoolName>
                {`Academic Report Sheet For ${exam.results[0].term.label}`}{' '}
              </SchoolName>
            </TermDetailsContainer> */}

          <StudentDetailContainer>
            <DetailContainer>
              <SingleContainer>
                <Label>Student Name:</Label>
                <Name>{fullName}</Name>
              </SingleContainer>
              {/* <SingleContainer>
                  <Label>Class:</Label>
                  <Name>{exam.results[0].class.label}</Name>
                </SingleContainer> */}
              {/* <SingleContainer>
                  <Label>Section/Course:</Label>
                  <Name>{exam.results[0].section.section}</Name>
                </SingleContainer>
              </DetailContainer>

              <DetailContainer>
                <SingleContainer>
                  <Label>Admission Number:</Label>
                  <Name>{exam.results[0].student.admissionNumber}</Name>
                </SingleContainer>
                <SingleContainer>
                  <Label>Phone Number:</Label>
                  <Name>{exam.results[0].student.phone}</Name>
                </SingleContainer>
                <SingleContainer>
                  <Label>Guardian's Name:</Label>
                  <Name>{exam.results[0].student.guardian}</Name>
                </SingleContainer>
              </DetailContainer>
              <StudentProfileContainer></StudentProfileContainer>
            </StudentDetailContainer> */}

              <TableContainer style={{ margin: '50px 0' }}>
                <Table>
                  <thead>
                    <TableRow>
                      {/* <TableHeader>Subject</TableHeader>
                    <TableHeader>Class Score</TableHeader>
                    <TableHeader>Exam Score</TableHeader>
                    <TableHeader>Total Score</TableHeader>
                    <TableHeader>Grade</TableHeader>
                    <TableHeader>Numerical Grade</TableHeader>
                    <TableHeader>Remark</TableHeader> */}
                    </TableRow>
                  </thead>
                  <tbody>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'Bold' }} colSpan={5}>
                        Invoice Title
                      </TableCell>
                      <TableCell colSpan={2}>title</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'Bold' }} colSpan={5}>
                        Amount
                      </TableCell>
                      <TableCell colSpan={2}>{amount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'Bold' }} colSpan={5}>
                        Date
                      </TableCell>
                      <TableCell colSpan={2}>{date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'Bold' }} colSpan={5}>
                        Phone
                      </TableCell>
                      <TableCell colSpan={2}>{phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'Bold' }} colSpan={5}>
                        Email
                      </TableCell>
                      <TableCell colSpan={2}>{email}</TableCell>
                    </TableRow>
                  </tbody>
                </Table>
              </TableContainer>
            </DetailContainer>
          </StudentDetailContainer>
        </div>
      </div>

      <ButtonContainer
        style={{ display: 'flex', justifyContent: 'space-between' }}
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
  );
};

export default Receipt;
