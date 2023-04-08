import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { FaSchool } from 'react-icons/fa';
import AddView from '../../../Components/AddViewComponent/AddView';
import { TertiaryButton } from '../../../Components/Buttons/TertiaryButton';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import Notification from '../../../Components/Notification/Notification';
import Spinner from '../../../Components/Spinner/Spinner';
import AuthContext from '../../../context/AuthContext/AuthContext';
import BulkPrinkSchema from '../../../formSchema/BulkPrint/BulkPrint';
import { baseUrl } from '../../../helpers/baseUrl';
import {
  ButtonContainer,
  ClassSectionHolder,
  InputContainer,
  ModalOverlay,
  TwoByTwoContainer,
} from './BulkPrintStyles/BulkPrint.styles';
import { ModalContainer } from './BulkPrintStyles/StudentReportCardStyles';
import ReportCard from './BulkPrintStyles/ReportCard';

const PrintResult = () => {
  const [classes, setClasses] = useState('[]');
  const [sections, setSections] = useState('[]');
  const [exams, setExams] = useState('[]');
  const [students, setStudents] = useState('[]');
  const [errorMessage, setErrorMessage] = useState('');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { auth } = useContext(AuthContext);

  //function for our displays
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const handleCancel = () => {
    setModal(false);
  };

  // get all the class schools for the school
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

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/exams_result/student_result/${values.examId}`,
        { studentRecordId: values.studentRecordId }
      );
      setData(res.data);
      setLoading(false);
      setModal(true);
    } catch (err) {
      handleError(err.response.data.error);
      setLoading(false);
    }
  };

  const { errors, touched, values, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        sectionId: '',
        classSchoolId: '',
        examId: '',
        studentRecordId: '',
      },
      validationSchema: BulkPrinkSchema,
      onSubmit,
    });

  // get sections for class
  useEffect(() => {
    if (values.classSchoolId) {
      const arr = [];
      const getAllClassSections = async () => {
        const res = await axios.get(
          `${baseUrl}/class_section/${values.classSchoolId}`
        );
        res.data.forEach((section) => {
          arr.push({
            label: section.label,
            value: section._id,
          });
        });
        setSections(arr);
      };
      getAllClassSections();
    }
  }, [values.classSchoolId]);

  // get all students for the selected section if selected subject's teacher id === auth.userid
  useEffect(() => {
    if (values.sectionId) {
      const getStudentsForSection = async () => {
        const arr = [];
        const res = await axios.post(
          `${baseUrl}/student_record/section/${auth?.currentTermId?._id}`,
          {
            sectionId: values.sectionId,
          }
        );
        res.data.forEach((student) => {
          arr.push({
            value: student._id,
            label: student.fullName,
          });
        });
        setStudents(arr);
      };
      getStudentsForSection();
    }
  }, [values.sectionId, auth]);

  return (
    <Layout>
      <LocationLabel
        label={auth?.schoolId.label.toUpperCase()}
        icon={<FaSchool />}
      ></LocationLabel>
      <AddView>Bulk Print Exam Results</AddView>
      <form onSubmit={handleSubmit}>
        <ClassSectionHolder>
          <TwoByTwoContainer>
            <InputContainer>
              <CustomSelect
                label='Exams'
                name='examId'
                options={exams}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('examId', e.value);
                }}
              />
              {touched.examId && errors.examId && (
                <ErrorContainer>
                  <ErrorMessage>{errors.examId}</ErrorMessage>
                </ErrorContainer>
              )}
            </InputContainer>
            <InputContainer>
              <CustomSelect
                label='Class'
                name='classSchoolId'
                options={classes}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('classSchoolId', e.value);
                }}
              />
              {touched.classSchoolId && errors.classSchoolId && (
                <ErrorContainer>
                  <ErrorMessage>{errors.classSchoolId}</ErrorMessage>
                </ErrorContainer>
              )}
            </InputContainer>
          </TwoByTwoContainer>
          <TwoByTwoContainer>
            <InputContainer>
              <CustomSelect
                label='Course/Program'
                name='sectionId'
                options={sections}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('sectionId', e.value);
                }}
              />
              {touched.sectionId && errors.sectionId && (
                <ErrorContainer>
                  <ErrorMessage>{errors.sectionId}</ErrorMessage>
                </ErrorContainer>
              )}
            </InputContainer>

            <InputContainer>
              <CustomSelect
                label='Student'
                isSearchable={true}
                name='studentRecordId'
                options={students}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('studentRecordId', e.value);
                }}
              />
              {touched.studentRecordId && errors.studentRecordId && (
                <ErrorContainer>
                  <ErrorMessage>{errors.studentRecordId}</ErrorMessage>
                </ErrorContainer>
              )}
            </InputContainer>
          </TwoByTwoContainer>
        </ClassSectionHolder>

        <ButtonContainer>
          <TertiaryButton type='submit' label='Preview' />
        </ButtonContainer>
      </form>
      {/* {data && <ReportCard data={data} />} */}
      {modal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalContainer>
              <ReportCard data={data} onCancel={handleCancel} />
            </ModalContainer>
          </ModalContainer>
        </ModalOverlay>
      )}
      {loading && <Spinner />}
      {errorMessage && <Notification message={errorMessage} type='error' />}
    </Layout>
  );
};

export default PrintResult;
