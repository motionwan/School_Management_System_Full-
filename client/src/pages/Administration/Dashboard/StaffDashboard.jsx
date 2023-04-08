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

const StaffDashboard = () => {
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
              <CardHeader>Staff List</CardHeader>
              <ButtonContainer>
                <Link to={`/staff/staffs`}>
                  <PrimaryButton label='View Staff List' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>

          <CardContainer>
            <Card>
              <CardHeader>Staff Attendance</CardHeader>
              <ButtonContainer>
                <Link to={`/staff/attendance`}>
                  <PrimaryButton label='View Staff Attendance' />
                </Link>
                <Link to={`/staff/take-attendance`}>
                  <PrimaryOutlineButton label='Take Staff Attendance' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Staff Exeats</CardHeader>
              <ButtonContainer>
                <Link to={`/staff/exeat`}>
                  <PrimaryButton label='Staff Exeats' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
        </Container>
      </Layout>
    </div>
  );
};

export default StaffDashboard;
