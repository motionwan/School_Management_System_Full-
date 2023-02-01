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
                <Link
                  to={`/client_academic/${auth.schoolId._id}/class_sections`}
                >
                  <PrimaryButton label='Class Sections' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Subjects</CardHeader>
              <ButtonContainer>
                <Link
                  to={`/client_academic/${auth.schoolId._id}/class_sections`}
                >
                  <PrimaryButton label='Class Sections' />
                </Link>
                <Link to='/client_academic/id/class_sections'>
                  <PrimaryOutlineButton label='Class Sections' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Attendance</CardHeader>
              <ButtonContainer>
                <Link to='/client_academic/id/class_sections'>
                  <PrimaryButton label='View Attendance' />
                </Link>
                <Link to='/client_academic/id/class_sections'>
                  <PrimaryOutlineButton label='Take Attendance' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Study Materials</CardHeader>
              <ButtonContainer>
                <Link to='/client_academic/id/class_sections'>
                  <PrimaryButton label='Study Materials' />
                </Link>
                <Link to='/client_academic/id/class_sections'>
                  <PrimaryOutlineButton label='Add Study Materials' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Homework</CardHeader>
              <ButtonContainer>
                <Link to='/client_academic/id/class_sections'>
                  <PrimaryButton label='Homework' />
                </Link>
                <Link to='/client_academic/id/class_sections'>
                  <PrimaryOutlineButton label='Assign Homework' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Noticeboard</CardHeader>
              <ButtonContainer>
                <Link to='/client_academic/id/class_sections'>
                  <PrimaryButton label='Noticeboard' />
                </Link>
                <Link to='/client_academic/id/class_sections'>
                  <PrimaryOutlineButton label='Add New Notice' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Events</CardHeader>
              <ButtonContainer>
                <Link to='/client_academic/id/class_sections'>
                  <PrimaryButton label='View Events' />
                </Link>
                <Link to='/client_academic/id/class_sections'>
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
