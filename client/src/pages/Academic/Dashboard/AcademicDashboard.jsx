import React, { useContext } from 'react';
import Layout from '../../../Components/Layout/Layout';
import {
  Card,
  Container,
  CardContainer,
  CardHeader,
  ButtonContainer,
} from '../../../Components/DashboardCard/DashboardCard';
import {
  PrimaryButton,
  PrimaryOutlineButton,
} from '../../../Components/Buttons/PrimaryButton';
import { Link } from 'react-router-dom';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';

const AcademicDashboard = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      <Layout>
        <LocationLabel label='New School'>
          <TermSelector />
        </LocationLabel>
        <Container>
          <CardContainer>
            <Card>
              <CardHeader>Class Section</CardHeader>
              <ButtonContainer>
                <Link to={`/client_academic/class_sections`}>
                  <PrimaryButton label='Class Sections' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Subjects</CardHeader>
              <ButtonContainer>
                <Link to={`/client_academic/subjects`}>
                  <PrimaryButton label='View Subjects' />
                </Link>
                <Link to='/client_school/add_subjects'>
                  <PrimaryOutlineButton label='Add Subjects' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Attendance</CardHeader>
              <ButtonContainer>
                <Link to='/client_academic/attendance'>
                  <PrimaryButton label='View Attendance' />
                </Link>
                <Link to='/client_academic/add_attendance'>
                  <PrimaryOutlineButton label='Take Attendance' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Learning Materials</CardHeader>
              <ButtonContainer>
                <Link to='/client_academic/study_materials'>
                  <PrimaryButton label='Learning Materials' />
                </Link>
                <Link to='/client_academic/add_study_materials'>
                  <PrimaryOutlineButton label='Add Learning Materials' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Homework</CardHeader>
              <ButtonContainer>
                <Link to='/client_academic/homework'>
                  <PrimaryButton label='Homework' />
                </Link>
                <Link to='/client_academic/add_homework'>
                  <PrimaryOutlineButton label='Assign Homework' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Noticeboard</CardHeader>
              <ButtonContainer>
                <Link to='/client_academic/noticeboard'>
                  <PrimaryButton label='Noticeboard' />
                </Link>
                <Link to='/client_academic/add_notice'>
                  <PrimaryOutlineButton label='Add New Notice' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Events</CardHeader>
              <ButtonContainer>
                <Link to='/client_academic/events'>
                  <PrimaryButton label='View Events' />
                </Link>
                <Link to='/client_academic/add_event'>
                  <PrimaryOutlineButton label='Add Events' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>Online Classes</Card>
          </CardContainer>
          <CardContainer>
            <Card>Staff Ratting</Card>
          </CardContainer>
        </Container>
      </Layout>
    </div>
  );
};

export default AcademicDashboard;
