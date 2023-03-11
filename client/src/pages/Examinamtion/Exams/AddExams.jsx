import React, { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import TextInput from '../../../Components/Input/Input';
import { FaPlusCircle } from 'react-icons/fa';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';

import axios from 'axios';
import { baseUrl } from '../../../helpers/baseUrl';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import styled from 'styled-components';
import { TertiaryButton } from '../../../Components/Buttons/TertiaryButton';
import DateInput from '../../../Components/DateInput/DateInput';
import Notification from '../../../Components/Notification/Notification';
import Spinner from '../../../Components/Spinner/Spinner';

const MainPage = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;
const ExamDetailsContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  min-height: 10rem;
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;

  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;

const TwoByTwoContainer = styled.div`
  display: flex;
  width: 90%;
  gap: 30px;
  padding: 20px;
  margin: 5px;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-left: 8px;
  width: 20px;
  height: 20px;
  padding: 20px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
`;

const PaperContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  min-height: 10rem;
  width: 100%;
  flex-direction: column;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.bg3};
  position: relative;

  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
  }
`;

const SingleInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const InputContainer = styled.div`
  width: 90%;
  gap: 30px;
  align-items: center;
  margin: 30px 40px;
  display: flex;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  margin-bottom: 16px;
`;

const AddExams = () => {
  const [classSchools, setClassSchools] = useState('[]');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sections, setSections] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      examsInfo: {
        sectionId: '',
        classSchoolId: '',
        startDate: new Date(),
        endDate: new Date(),
        title: '',
        examCenter: '',
      },
      paperInfo: [
        {
          subjectId: '',
          paperDate: new Date(),
          maximumMark: '',
          startTime: '',
          endTime: '',
          roomNumber: '',
        },
      ],
    },
    // resolver: yupResolver(ExamSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'paperInfo',
  });

  const classSchoolId = watch('examsInfo.classSchoolId');
  // console.log('classSchoolId:', classSchoolId);
  const sectionId = watch('examsInfo.sectionId');

  useEffect(() => {
    const arr = [];
    const getAllClassSchoolsForSchool = async () => {
      const res = await axios.get(
        `${baseUrl}/class_school/class/${auth.schoolId?._id}`
      );
      //console.log(res.data);
      res.data.forEach((classSchool) => {
        arr.push({
          label: classSchool.classId.label,
          value: classSchool._id,
        });
      });
      setClassSchools(arr);
    };
    getAllClassSchoolsForSchool();
  }, [auth]);

  // get all the subject sections for a class
  useEffect(() => {
    if (sectionId) {
      const arr = [];
      const getAllSectionSubjects = async () => {
        const res = await axios.get(`${baseUrl}/subject/section/${sectionId}`);
        res.data.forEach((subject) => {
          arr.push({
            value: subject._id,
            label: `${subject.label} (${subject.type})`,
          });
        });
        setSubjects(arr);
      };
      getAllSectionSubjects();
    }
  }, [sectionId]); // end of getAllSectionSubjects

  //get all the sections for the selected class
  useEffect(() => {
    if (classSchoolId) {
      const arr = [];
      const getSections = async () => {
        const res = await axios.get(
          `${baseUrl}/class_section/${classSchoolId}`
        );
        // console.log(res.data);
        res.data.forEach((sectionSubject) => {
          arr.push({
            label: sectionSubject.label,
            value: sectionSubject._id,
          });
        });
        setSections(arr);
      };
      getSections();
    }
  }, [classSchoolId]);

  //handle error
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  // my onsubmit function
  const onSubmit = async (data) => {
    setLoading(true);
    const { examsInfo, paperInfo } = data;
    try {
      // Send examInfo to the exams table
      const examResult = await axios.post(`${baseUrl}/exams`, {
        title: examsInfo.title,
        sectionId: examsInfo.sectionId,
        classSchoolId: examsInfo.classSchoolId,
        startDate: examsInfo.startDate,
        endDate: examsInfo.endDate,
        examCenter: examsInfo.examCenter,
        termId: auth?.currentTermId._id,
      });
      const examId = examResult.data._id;

      // Loop through paperInfo and send each paper to the papers table
      const paperPromises = paperInfo.map(async (paper) => {
        const paperResult = await axios.post(`${baseUrl}/exams_paper`, {
          subjectId: paper.subjectId,
          paperDate: paper.paperDate,
          maximumMark: paper.maximumMark,
          startTime: paper.startTime,
          endTime: paper.endTime,
          roomNumber: paper.roomNumber,
          examId: examId,
          termId: auth?.currentTermId._id,
        });
        return paperResult;
      });
      if (paperPromises && examResult) {
        Store.addNotification({
          title: 'Success!',
          message: 'Examination created successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate(`/exams/${auth?.schoolId?._id}/exam`);
        setLoading(false);
      }
    } catch (err) {
      handleError(err.response.data.error);
      setLoading(false);
    }
  };

  return (
    <div>
      {errorMessage && <Notification message={errorMessage} type='error' />}
      {loading && <Spinner />}
      <Layout>
        <LocationLabel label={auth.schoolId.label.toUpperCase()}>
          <TermSelector />
        </LocationLabel>
        <MainPage>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ExamDetailsContainer>
              <div style={{ margin: '2px 10px' }}>
                <h2>Examination Details</h2>
              </div>
              {/* Exams information goes here */}
              <TwoByTwoContainer>
                <SingleInputContainer>
                  <TextInput
                    label='Exam Title'
                    {...register('examsInfo.title')}
                  />
                </SingleInputContainer>

                <SingleInputContainer>
                  <TextInput
                    label='Exam Center'
                    {...register('examsInfo.examCenter')}
                  />
                </SingleInputContainer>
              </TwoByTwoContainer>

              <TwoByTwoContainer>
                <SingleInputContainer>
                  <DateInput
                    label='Start Date'
                    {...register('examsInfo.startDate')}
                    selected={watch(`examsInfo.startDate`)}
                    onChange={(e) => setValue(`examsInfo.startDate`, e)}
                  />
                </SingleInputContainer>

                <SingleInputContainer>
                  {' '}
                  <DateInput
                    label='End Date'
                    {...register('examsInfo.endDate')}
                    selected={watch(`examsInfo.endDate`)}
                    onChange={(e) => setValue(`examsInfo.endDate`, e)}
                  />
                </SingleInputContainer>
              </TwoByTwoContainer>

              <TwoByTwoContainer>
                <SingleInputContainer>
                  <CustomSelect
                    label='Class'
                    {...register('examsInfo.classSchoolId')}
                    onChange={(e) =>
                      setValue('examsInfo.classSchoolId', e.value)
                    }
                    options={classSchools}
                  />
                </SingleInputContainer>

                <SingleInputContainer>
                  <CustomSelect
                    options={sections}
                    label='Course/Program'
                    {...register('examsInfo.sectionId')}
                    onChange={(e) => setValue('examsInfo.sectionId', e.value)}
                  />
                </SingleInputContainer>
              </TwoByTwoContainer>
            </ExamDetailsContainer>
            {fields.map((field, index) => (
              <Container key={field.id}>
                <PaperContainer>
                  <InputContainer>
                    <SingleInputContainer>
                      <CustomSelect
                        options={subjects}
                        label='Subject'
                        {...register(`paperInfo[${index}].subjectId`)}
                        onChange={(e) =>
                          setValue(`paperInfo[${index}].subjectId`, e.value)
                        }
                      />
                    </SingleInputContainer>
                    <SingleInputContainer>
                      <TextInput
                        label='Maximum Marks'
                        {...register(`paperInfo[${index}].maximumMarks`)}
                      />
                    </SingleInputContainer>
                    <SingleInputContainer>
                      <DateInput
                        dateFormat='dd-MM-yyyy'
                        label='Paper Date'
                        {...register(`paperInfo[${index}].paperDate`)}
                        selected={watch(`paperInfo[${index}].paperDate`)}
                        onChange={(e) =>
                          setValue(`paperInfo[${index}].paperDate`, e)
                        }
                      />
                    </SingleInputContainer>
                  </InputContainer>

                  <InputContainer>
                    <SingleInputContainer>
                      <TextInput
                        type='time'
                        label='Start Time'
                        {...register(`paperInfo[${index}].startTime`)}
                      />
                    </SingleInputContainer>
                    <SingleInputContainer>
                      <TextInput
                        type='time'
                        label='End Time'
                        {...register(`paperInfo[${index}].endTime`)}
                      />
                    </SingleInputContainer>
                    <SingleInputContainer>
                      <TextInput
                        label='Room Number'
                        {...register(`paperInfo[${index}].roomNumber`)}
                      />
                    </SingleInputContainer>
                  </InputContainer>
                  {fields.length > 1 && (
                    <RemoveButton type='button' onClick={() => remove(index)}>
                      X
                    </RemoveButton>
                  )}
                </PaperContainer>
              </Container>
            ))}
            <ButtonContainer>
              <PrimaryButton
                label='Add More Subjects'
                type='button'
                onClick={() => append({})}
              />
            </ButtonContainer>

            <ButtonContainer style={{ marginTop: '50px' }}>
              <TertiaryButton
                label='Create New Exams'
                icon={<FaPlusCircle />}
                type='submit'
              />
            </ButtonContainer>
          </form>
        </MainPage>
      </Layout>
    </div>
  );
};

export default AddExams;
