import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { FaSchool } from 'react-icons/fa';
import { Store } from 'react-notifications-component';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import Spinner from '../../../Components/Spinner/Spinner';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import StudentPromotionSchema from '../../../formSchema/StudentPromotion/StudentPromotionSchema';
import { baseUrl } from '../../../helpers/baseUrl';
import {
  Container,
  Note,
  NoteContainer,
  ButtonContainer,
  OneByTwoContainer,
} from './Promotion.styles';
import PromotionTable from './PromotionTable';

const Promotion = () => {
  const [promotionFrom, setPromotionFrom] = useState(null);
  const [promotionTo, setPromotionTo] = useState(null);
  const [promotionFromSection, setPromotionFromSection] = useState('[]');
  const [promotionToSection, setPromotionToSection] = useState('[]');
  const [students, setStudents] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const arr = [];
    const getAllClassSchoolsForSchool = async () => {
      const res = await axios.get(
        `${baseUrl}/class_school/class/${auth.schoolId?._id}`
      );
      res.data.forEach((classSchool) => {
        arr.push({
          label: classSchool?.classId?.label,
          value: classSchool?._id,
        });
      });
      setPromotionFrom(arr);
      setPromotionTo(arr);
    };
    getAllClassSchoolsForSchool();
  }, [auth]);

  useEffect(() => {
    const arr = [];
    const getAllClassSchoolsForSchool = async () => {
      const res = await axios.get(`${baseUrl}/term`);
      const nextTermIndex =
        res.data.findIndex((term) => term._id === auth?.currentTermId?._id) + 1;
      if (nextTermIndex < res.data.length) {
        // check if there is a next session
        arr.push({
          label: res.data[nextTermIndex].label,
          value: res.data[nextTermIndex]._id,
        });
        setSessions(arr);
      } else {
        setSessions(null); // no next session available, set sessions to null
      }
    };
    getAllClassSchoolsForSchool();
  }, [auth]);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const promises = students.map((student) =>
        axios.post(`${baseUrl}/student_record`, {
          fullName: student.fullName,
          gender: student.gender,
          dateOfBirth: student.dateOfBirth,
          phoneNumber: student.phoneNumber,
          email: student.email,
          address: student.address,
          admissionDate: student.admissionDate,
          bloodGroup: student.bloodGroup,
          guardianName: student.guardianName,
          guardianPhoneNumber: student.guardianPhoneNumber,
          guardianOccupation: student.guardianOccupation,
          photoId: student.photoId,
          sectionId: student.sectionId,
          sessionId: student.sessionId,
          city: student.city,
          username: student.username,
          termId: student.termId,
        })
      );

      const responses = await Promise.all(promises);

      if (responses.every((response) => response)) {
        Store.addNotification({
          title: 'Success!',
          message: 'Operation was successful',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 7000,
          },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const { values, errors, touched, handleSubmit, handleBlur, setFieldValue } =
    useFormik({
      initialValues: {
        promotionTerm: '',
        promotionFromClass: '',
        promotionToClass: '',
        promotionFromSection: '',
        promotionToSection: '',
      },
      validationSchema: StudentPromotionSchema,
      onSubmit,
    });

  // get sections of the class we are promoting from

  useEffect(() => {
    if (values.promotionFromClass) {
      const arr = [];
      const getAllClassSections = async () => {
        const res = await axios.get(
          `${baseUrl}/class_section/${values.promotionFromClass}`
        );
        res.data.forEach((section) => {
          arr.push({
            label: section.label,
            value: section._id,
          });
        });
        setPromotionFromSection(arr);
      };
      getAllClassSections();
    }
  }, [values.promotionFromClass]);

  useEffect(() => {
    if (values.promotionToClass) {
      const arr = [];
      const getAllClassSections = async () => {
        const res = await axios.get(
          `${baseUrl}/class_section/${values.promotionToClass}`
        );
        res.data.forEach((section) => {
          arr.push({
            label: section.label,
            value: section._id,
          });
        });
        setPromotionToSection(arr);
      };
      getAllClassSections();
    }
  }, [values.promotionToClass]);

  //get students with sectionId of the class we are promoting from

  useEffect(() => {
    if (values.promotionFromSection) {
      const getAllStudents = async () => {
        const res = await axios.post(
          `${baseUrl}/student_record/section/${auth?.currentTermId?._id}`,
          {
            sectionId: values?.promotionFromSection,
          }
        );

        setStudents(res.data);
      };
      getAllStudents();
    }
  }, [values.promotionFromSection, auth]);

  //console.log(students);

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
          <h3>Student Promotion</h3>
        </AddView>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <Container>
              <NoteContainer>
                <Note>
                  <strong>Note:</strong> Promoting students from the present
                  class to the next class will create an enrollment of that
                  student for the next <strong>session/Term/Semester</strong>
                </Note>
              </NoteContainer>
              <OneByTwoContainer>
                <div style={{ width: '50%', marginTop: '-20px' }}>
                  <span style={{ margin: '-40px' }}>
                    <h4>Current Term:</h4>
                    <h4>{auth?.currentTermId.label}</h4>
                  </span>
                </div>
                <div style={{ width: '50%' }}>
                  <CustomSelect
                    label='Promote to (Term/Semester)'
                    options={sessions}
                    name='promotionTerm'
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue('promotionTerm', e.value)}
                  />
                  {touched.promotionTerm && errors.promotionTerm && (
                    <ErrorContainer>
                      <ErrorMessage>{errors.promotionTerm}</ErrorMessage>
                    </ErrorContainer>
                  )}
                </div>
              </OneByTwoContainer>

              <OneByTwoContainer>
                <div style={{ width: '100%' }}>
                  <CustomSelect
                    label='Promote From (class)'
                    options={promotionFrom}
                    onBlur={handleBlur}
                    name='promotionFromClass'
                    onChange={(e) =>
                      setFieldValue('promotionFromClass', e.value)
                    }
                  />
                  {touched.promotionFromClass && errors.promotionFromClass && (
                    <ErrorContainer>
                      <ErrorMessage>{errors.promotionFromClass}</ErrorMessage>
                    </ErrorContainer>
                  )}
                </div>
                <div style={{ width: '100%' }}>
                  <CustomSelect
                    label='Promote To (Class)'
                    options={promotionTo}
                    onBlur={handleBlur}
                    name='promotionToClass'
                    onChange={(e) => setFieldValue('promotionToClass', e.value)}
                  />
                  {touched.promotionToClass && errors.promotionToClass && (
                    <ErrorContainer>
                      <ErrorMessage>{errors.promotionToClass}</ErrorMessage>
                    </ErrorContainer>
                  )}
                </div>
              </OneByTwoContainer>

              <OneByTwoContainer>
                <div style={{ width: '100%' }}>
                  <CustomSelect
                    label='Promote From (Program/Course)'
                    options={promotionFromSection}
                    onBlur={handleBlur}
                    name='promotionFromSection'
                    onChange={(e) =>
                      setFieldValue('promotionFromSection', e.value)
                    }
                  />
                  {touched.promotionFromSection &&
                    errors.promotionFromSection && (
                      <ErrorContainer>
                        <ErrorMessage>
                          {errors.promotionFromSection}
                        </ErrorMessage>
                      </ErrorContainer>
                    )}
                </div>
                <div style={{ width: '100%' }}>
                  <CustomSelect
                    label='Promote To (Program/Course)'
                    options={promotionToSection}
                    onBlur={handleBlur}
                    name='promotionToSection'
                    onChange={(e) =>
                      setFieldValue('promotionToSection', e.value)
                    }
                  />
                  {touched.promotionToSection && errors.promotionToSection && (
                    <ErrorContainer>
                      <ErrorMessage>{errors.promotionToSection}</ErrorMessage>
                    </ErrorContainer>
                  )}
                </div>
              </OneByTwoContainer>
            </Container>
            {students && (
              <PromotionTable
                students={students}
                setStudents={setStudents}
                sectionId={values.promotionToSection}
                termId={values.promotionTerm}
              />
            )}
            {students && (
              <ButtonContainer>
                <PrimaryButton type='submit' label='Manage Promotion' />
              </ButtonContainer>
            )}
          </form>
        )}
      </Layout>
    </div>
  );
};

export default Promotion;
