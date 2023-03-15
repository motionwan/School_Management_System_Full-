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
import '../BulkPrintStyles/styles.css';
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
} from './StudentReportCardStyles';

const ReportCard = ({ data, onCancel }) => {
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
  const getLetterGradeAndRemark = (score) => {
    if (score >= 75) {
      return { grade: 'A1', remark: 'Excellent', numericalValue: 1 };
    } else if (score >= 70) {
      return { grade: 'B2', remark: 'Very good', numericalValue: 2 };
    } else if (score >= 65) {
      return { grade: 'B3', remark: 'Good', numericalValue: 3 };
    } else if (score >= 60) {
      return { grade: 'C4', remark: 'Credit', numericalValue: 4 };
    } else if (score >= 55) {
      return { grade: 'C5', remark: 'Credit', numericalValue: 5 };
    } else if (score >= 50) {
      return { grade: 'C6', remark: 'Credit', numericalValue: 6 };
    } else if (score >= 45) {
      return { grade: 'D7', remark: 'Pass', numericalValue: 7 };
    } else if (score >= 40) {
      return { grade: 'E8', remark: 'Pass', numericalValue: 8 };
    } else {
      return { grade: 'F9', remark: 'Fail', numericalValue: 9 };
    }
  };

  const calculateTotalGrade = (results) => {
    const coreSubjects = [];
    const electiveSubjects = [];

    results.forEach((result) => {
      const totalScore = Math.round(result.classScore + result.examScore * 0.7);
      const { numericalValue } = getLetterGradeAndRemark(totalScore);

      if (result.subject.category === 'core') {
        coreSubjects.push(numericalValue);
      } else {
        electiveSubjects.push(numericalValue);
      }
    });

    // sort the elective subjects array in ascending order and add the 4 lowest values
    const electiveTotal = electiveSubjects
      .sort((a, b) => a - b)
      .slice(0, 4)
      .reduce((a, b) => a + b, 0);

    // add the core subjects total and the elective subjects total
    const totalNumericalValue =
      coreSubjects.reduce((a, b) => a + b, 0) + electiveTotal;

    return totalNumericalValue;
  };

  return (
    <div ref={componentRef}>
      <div style={{ padding: '20px' }}>
        {data.map((exam) => (
          <div key={exam._id}>
            <SchoolDetailContainer>
              <CrestContainer></CrestContainer>
              <DetailContainer>
                <SchoolName>{exam.results[0].school.schoolName}</SchoolName>
                <SingleContainer>
                  <Label>Phone:</Label>
                  <Label>{exam.results[0].school.phone}</Label>
                </SingleContainer>
                <SingleContainer>
                  <Label>Email:</Label>
                  <Label style={{ textTransform: 'lowercase' }}>
                    {exam.results[0].school.email}
                  </Label>
                </SingleContainer>
                <SingleContainer>
                  <Label>Address:</Label>
                  <Label>{exam.results[0].school.address}</Label>
                </SingleContainer>
              </DetailContainer>
            </SchoolDetailContainer>
            <TermDetailsContainer>
              <SchoolName>
                {`Academic Report Sheet For ${exam.results[0].term.label}`}{' '}
              </SchoolName>
            </TermDetailsContainer>

            <StudentDetailContainer>
              <DetailContainer>
                <SingleContainer>
                  <Label>Student Name:</Label>
                  <Name>{exam.results[0].student.fullName}</Name>
                </SingleContainer>
                <SingleContainer>
                  <Label>Class:</Label>
                  <Name>{exam.results[0].class.label}</Name>
                </SingleContainer>
                <SingleContainer>
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
            </StudentDetailContainer>

            <TableContainer style={{ margin: '50px 0' }}>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Subject</TableHeader>
                    <TableHeader>Class Score</TableHeader>
                    <TableHeader>Exam Score</TableHeader>
                    <TableHeader>Total Score</TableHeader>
                    <TableHeader>Grade</TableHeader>
                    <TableHeader>Numerical Grade</TableHeader>
                    <TableHeader>Remark</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {exam.results.map((result) => {
                    const totalScore =
                      result.classScore + Math.round(result.examScore * 0.7);
                    const { grade, remark, numericalValue } =
                      getLetterGradeAndRemark(totalScore);

                    return (
                      <TableRow key={result.subject.label}>
                        <TableCell>{result.subject.label}</TableCell>
                        <TableCell>{result.classScore}</TableCell>
                        <TableCell>
                          {Math.round(result.examScore * 0.7)}
                        </TableCell>
                        <TableCell>{totalScore}</TableCell>
                        <TableCell>{grade}</TableCell>
                        <TableCell>{numericalValue}</TableCell>
                        <TableCell>{remark}</TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell style={{ fontWeight: 'Bold' }} colSpan={5}>
                      Total Aggregate:
                    </TableCell>
                    <TableCell style={{ fontWeight: 'Bold' }} colSpan={2}>
                      {calculateTotalGrade(exam.results)}
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </TableContainer>
          </div>
        ))}
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
    </div>
  );
};

export default ReportCard;
