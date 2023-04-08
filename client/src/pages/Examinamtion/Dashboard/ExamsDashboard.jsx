import React, { useContext } from 'react';
import Layout from '../../../Components/Layout/Layout';
import {
  Card,
  Container,
  CardContainer,
  CardHeader,
  ButtonContainer,
} from '../../../Components/DashboardCard/DashboardCard';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { Link } from 'react-router-dom';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';

const ExamsDashboard = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      <Layout>
        <LocationLabel label={auth?.schoolId?.label.toUpperCase()}>
          <TermSelector />
        </LocationLabel>
        <Container>
          <CardContainer>
            <Card>
              <CardHeader>Terminal Exams</CardHeader>
              <ButtonContainer>
                <Link to={`/exams/exam`}>
                  <PrimaryButton label='Manage Exams' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Exam Results</CardHeader>
              <ButtonContainer>
                <Link to={`/exams/exam_results`}>
                  <PrimaryButton label='Manage Exam Results' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Print Result For Student</CardHeader>
              <ButtonContainer>
                <Link to={`/exams/print_result`}>
                  <PrimaryButton label='Print Result' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
        </Container>
      </Layout>
    </div>
  );
};

export default ExamsDashboard;
