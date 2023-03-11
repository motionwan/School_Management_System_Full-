import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { TertiaryButton } from '../../../Components/Buttons/TertiaryButton';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import TextInput from '../../../Components/Input/Input';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import examResultSchema from '../../../formSchema/ExamsResult/ExamsResult';
import { baseUrl } from '../../../helpers/baseUrl';
import {
  ButtonContainer,
  ClassSectionHolder,
  InputContainer,
  MarksContainer,
  MarksTableContainer,
  NameLabel,
  TwoByTwoContainer,
} from './ExamResultStyle/ExamsResultStyles';
import * as yup from 'yup';
import Notification from '../../../Components/Notification/Notification';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import { Store } from 'react-notifications-component';

const AddExamResult = () => {
  const [classes, setClasses] = useState('[]');
  const [sections, setSections] = useState('[]');
  const [examPapers, setExamPapers] = useState('[]');
  const [exams, setExams] = useState('[]');
  const [examPaperId, setExamPaperId] = useState('');
  const [examId, setExamId] = useState('');
  const [classSchoolId, setClassSchoolId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);

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
  // find all exams
  useEffect(() => {
    const arr = [];
    const getAllExams = async () => {
      const res = await axios.get(`${baseUrl}/exams/`);
      res.data.forEach((exams) => {
        arr.push({
          label: exams.title,
          value: exams._id,
        });
      });
      setExams(arr);
    };
    getAllExams();
  }, [auth]);
  const initialValues = students.reduce((acc, student) => {
    acc[student._id] = { examScore: 0, classScore: 0 };
    return acc;
  }, {});
  const validationSchema = yup.object().shape({
    // We dynamically generate the schema using the student IDs
    ...students.reduce((acc, student) => {
      acc[student._id] = yup.object({
        examScore: yup
          .number()
          .required('Exam score is required')
          .positive('Exam score must be positive')
          .min(0, 'Exam score cannot be lower that 1'),
        classScore: yup
          .number()
          .positive('Class score must be positive')
          .required('Class score is required')
          .min(0, 'Class score cannot be lower that 1')
          .max(30, 'Class score must not be more than 30'),
      });
      return acc;
    }, {}),
  });

  const handleError = (error) => {
    setError(error);

    setTimeout(() => {
      setError(null);
    }, 10000);
  };

  const onSubmit = async (values) => {
    if (!classSchoolId || !sectionId || !examId || !examPaperId) {
      handleError(
        'Please select the Class, Section, Exam, and Exam Paper before submitting the form.'
      );
      return;
    }

    const payload = Object.entries(values).map(([studentId, scores]) => ({
      studentId,
      ...scores,
      // examId: 34,
      // sectionId: 65,
    }));

    const requests = payload.map((payLoad) =>
      axios.post(`${baseUrl}/exams_result`, {
        examScore: payLoad.examScore,
        classScore: payLoad.classScore,
        studentRecordId: payLoad.studentId,
        examPaperId: examPaperId,
        uploadedBy: auth?.userId,
        termId: auth?.currentTermId?._id,
      })
    );

    try {
      const results = await Promise.all(requests);
      //console.log(results);
      if (results) {
        Store.addNotification({
          title: 'Success!',
          message: 'Results uploaded successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 8000,
          },
        });
      }
    } catch (err) {
      handleError(err.response.data.error);
    }
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  //find sections for selected class
  useEffect(() => {
    if (classSchoolId) {
      const arr = [];
      const getAllClassSchoolsForSchool = async () => {
        const res = await axios.get(
          `${baseUrl}/class_section/${classSchoolId}`
        );
        res.data.forEach((section) => {
          arr.push({
            label: section.label,
            value: section._id,
          });
        });
        setSections(arr);
      };
      getAllClassSchoolsForSchool();
    }
  }, [classSchoolId]);

  //find subjects for the selected section
  useEffect(() => {
    if (examId) {
      const arr = [];
      const getAllClassSchoolsForSchool = async () => {
        const res = await axios.post(`${baseUrl}/exams_paper/${examId}`, {
          teacherId: auth?.userId,
        });
        res.data.forEach((examPaper) => {
          arr.push({
            label: examPaper.label,
            value: examPaper._id,
          });
        });
        setExamPapers(arr);
      };
      getAllClassSchoolsForSchool();
    }
  }, [examId, auth]);
  // get all students for the selected section if selected subject's teacher id === auth.userid
  useEffect(() => {
    if (sectionId) {
      const getStudentsForSection = async () => {
        const res = await axios.post(
          `${baseUrl}/student_record/section/${auth?.currentTermId?._id}`,
          {
            sectionId: sectionId,
          }
        );
        setStudents(res.data);
      };
      getStudentsForSection();
    }
  }, [sectionId, auth]);

  //console.log(students);

  return (
    <Layout>
      <LocationLabel
        label={auth?.schoolId.label.toUpperCase()}
        icon={<FaSchool />}
      >
        <TermSelector />
      </LocationLabel>
      <AddView>
        {/* <Link to={`/exams/add_exam_result `}>
          <PrimaryButton label='Upload Exam Results' icon={<FaPlusCircle />} />
        </Link> */}
      </AddView>

      <ClassSectionHolder>
        <TwoByTwoContainer>
          <CustomSelect
            label='Exams'
            options={exams}
            onBlur={handleBlur}
            onChange={(e) => {
              setExamId(e.value);
            }}
          />
          <CustomSelect
            label='Exam Paper'
            options={examPapers}
            onBlur={handleBlur}
            onChange={(e) => {
              setExamPaperId(e.value);
            }}
          />
        </TwoByTwoContainer>

        <TwoByTwoContainer>
          <CustomSelect
            label='Class'
            options={classes}
            onBlur={handleBlur}
            onChange={(e) => {
              setClassSchoolId(e.value);
            }}
          />
          <CustomSelect
            label='Course/Program'
            options={sections}
            onBlur={handleBlur}
            onChange={(e) => {
              setSectionId(e.value);
            }}
          />
        </TwoByTwoContainer>
      </ClassSectionHolder>
      {/* if student array is greater than 0, load students else spinner */}
      <p>
        Note: You cannot leave the input for class or exam score empty.
        <strong>A minimum or 1 mark is required</strong>
      </p>
      <form onSubmit={handleSubmit}>
        {students.map((student) => {
          return (
            <MarksTableContainer key={student._id}>
              <MarksContainer>
                <NameLabel>{student.fullName}</NameLabel>
                <InputContainer>
                  <TextInput
                    label='Exam Score (Minimum(1))'
                    type='number'
                    id={`examScore_${student._id}`}
                    name={`${student._id}.examScore`}
                    value={values[student._id]?.examScore || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched[student._id]?.examScore &&
                    errors[student._id]?.examScore && (
                      <ErrorContainer>
                        <ErrorMessage>
                          {errors[student._id]?.examScore}
                        </ErrorMessage>
                      </ErrorContainer>
                    )}
                </InputContainer>
                <InputContainer>
                  <TextInput
                    label='Class Score(Minimum (1)'
                    type='number'
                    id={`classScore_${student._id}`}
                    name={`${student._id}.classScore`}
                    value={values[student._id]?.classScore || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched[student._id]?.classScore &&
                    errors[student._id]?.classScore && (
                      <ErrorContainer>
                        <ErrorMessage>
                          {errors[student._id]?.classScore}
                        </ErrorMessage>
                      </ErrorContainer>
                    )}
                </InputContainer>
              </MarksContainer>
            </MarksTableContainer>
          );
        })}

        <ButtonContainer>
          <TertiaryButton type='submit' label='Upload Results' />
        </ButtonContainer>
      </form>
      {error && <Notification type='error' message={error} />}
    </Layout>
  );
};

export default AddExamResult;
