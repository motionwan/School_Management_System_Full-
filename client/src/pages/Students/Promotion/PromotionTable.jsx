import React from 'react';
import TextInput from '../../../Components/Input/Input';
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableContainer,
} from '../../../Components/Table/Table.styles';

const PromotionTable = ({ students, setStudents, sectionId, termId }) => {
  const handleRadioChange = (event, studentId) => {
    const newStudentState = students.map((student) => {
      if (student._id === studentId) {
        const promotionType = event.target.value;

        if (promotionType === 'promote') {
          // Update the student's section and term IDs
          return {
            ...student,
            promotionType: 'promote',
            sectionId: sectionId,
            termId: termId,
          };
        } else if (promotionType === 'repeat') {
          // Update the student's term ID
          return {
            ...student,
            promotionType: 'repeat',
            termId: termId,
          };
        }
      }
      return student;
    });

    setStudents(newStudentState);
  };

  return (
    <div style={{ width: '100%', marginTop: '40px' }}>
      <TableContainer style={{ width: '100%' }}>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Student Name</TableHeader>
              <TableHeader>Enrollment Number</TableHeader>
              <TableHeader>Program/Course</TableHeader>
              <TableHeader>Options</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {students.map((student) => {
              return (
                <TableRow key={student._id}>
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>{student.enrollmentNumber}</TableCell>
                  <TableCell>{student.enrollmentNumber}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex' }}>
                      <TextInput
                        type='radio'
                        label='Promote'
                        name={`promotion-${student._id}`}
                        value='promote'
                        checked={student.promotionType === 'promote'}
                        onChange={(event) =>
                          handleRadioChange(event, student._id)
                        }
                      />
                      <TextInput
                        type='radio'
                        label='Repeat'
                        name={`promotion-${student._id}`}
                        value='repeat'
                        checked={student.promotionType === 'repeat'}
                        onChange={(event) =>
                          handleRadioChange(event, student._id)
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PromotionTable;
