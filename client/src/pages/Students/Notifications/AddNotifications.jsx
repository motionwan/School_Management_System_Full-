import React, { useContext, useEffect, useState } from 'react';
import { FaSchool } from 'react-icons/fa';
import AddView from '../../../Components/AddViewComponent/AddView';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';

import styled from 'styled-components';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import { ButtonContainer } from '../Promotion/Promotion.styles';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { useFormik } from 'formik';
import TextAreaInput from '../../../Components/TextAreaInput/TextAreaInput';
import TextInput from '../../../Components/Input/Input';
import axios from 'axios';
import { baseUrl } from '../../../helpers/baseUrl';
import {
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '../../../Components/Table/Table.styles';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 10rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
`;

const AddNotifications = () => {
  const [classes, setClasses] = useState(null);
  const [sections, setSections] = useState([]);
  // const [students, setClStudents] = useState(null);
  const [students, setStudents] = useState([]);
  const { auth } = useContext(AuthContext);
  const selectedStudents = [];
  //console.log(selectedStudents);

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

  students.map((student) => {
    if (student.isChecked === true) {
      selectedStudents.push(student);
    }
  });
  const onSubmit = async () => {};

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
    },
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
        const res = await axios.post(
          `${baseUrl}/student_record/section/${auth?.currentTermId?._id}`,
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

  return (
    <div>
      <Layout>
        <LocationLabel
          label={auth?.schoolId.label.toUpperCase()}
          icon={<FaSchool />}
        >
          <TermSelector />
        </LocationLabel>
        <AddView>Send Notification</AddView>
        <form onSubmit={handleSubmit}>
          <MainContainer>
            <CustomSelect
              name='classSchoolId'
              options={classes}
              label='Select Class'
              onChange={(e) => {
                setFieldValue('classSchoolId', e.value);
              }}
            />
            <CustomSelect
              name='sectionId'
              options={sections}
              label='Select Program/Course'
              onChange={(e) => {
                setFieldValue('sectionId', e.value);
              }}
            />
          </MainContainer>
          <MainContainer>
            <TextInput type='radio' label='Send Email' />
            <TextInput type='radio' label='Send Text Message' />
          </MainContainer>
          <TableContainer style={{ margin: '50px 0' }}>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader style={{ display: 'flex', width: '100%' }}>
                    <label htmlFor='all'>Select All</label>
                    <div style={{ marginLeft: '20px' }}>
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
                    </div>
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
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          <div style={{ width: '100%', marginTop: '20px' }}>
            <TextAreaInput label='Notification' row='300' col='500' />
          </div>
          <ButtonContainer>
            <PrimaryButton type='submit' label='Send Notification' />
          </ButtonContainer>
        </form>
      </Layout>
    </div>
  );
};

export default AddNotifications;
