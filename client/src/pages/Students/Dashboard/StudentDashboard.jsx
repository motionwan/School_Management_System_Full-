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

const StudentDashboard = () => {
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
              <CardHeader>Admission</CardHeader>
              <ButtonContainer>
                <Link to={`/client_student/${auth.schoolId._id}/admission`}>
                  <PrimaryButton label='Add New Admission' />
                </Link>
                <Link
                  to={`/client_student/${auth.schoolId._id}/bulk_admission`}
                >
                  <PrimaryOutlineButton label='Bulk Admission' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Students</CardHeader>
              <ButtonContainer>
                <Link to={`/client_student/${auth.schoolId._id}/students`}>
                  <PrimaryButton label='View Students' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>I.D Cards</CardHeader>
              <ButtonContainer>
                <Link to={`/client_student/${auth.schoolId._id}/id`}>
                  <PrimaryButton label='Print I.D Cards' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Promotions</CardHeader>
              <ButtonContainer>
                <Link to={`/client_student/${auth.schoolId._id}/promotion`}>
                  <PrimaryButton label='Promote Students' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Transfers</CardHeader>
              <ButtonContainer>
                <Link to={`/client_student/${auth.schoolId._id}/view_transfer`}>
                  <PrimaryButton label='View Transferred Students' />
                </Link>
                <Link to={`/client_student/${auth.schoolId._id}/transfer`}>
                  <PrimaryOutlineButton label='Transfer student' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Certifications</CardHeader>
              <ButtonContainer>
                <Link
                  to={`/client_student/${auth.schoolId._id}/view_certificate`}
                >
                  <PrimaryButton label='View Certificates' />
                </Link>
                <Link
                  to={`/client_student/${auth.schoolId._id}/add_certificate`}
                >
                  <PrimaryOutlineButton label='Add Certificate' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
        </Container>
      </Layout>
    </div>
  );
};

export default StudentDashboard;
