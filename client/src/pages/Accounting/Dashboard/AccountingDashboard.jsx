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

const AccountingDashboard = () => {
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
              <CardHeader>Manage Invoice</CardHeader>
              <ButtonContainer>
                <Link to={`/account/invoice`}>
                  <PrimaryButton label='Manage Invoice' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
          <CardContainer>
            <Card>
              <CardHeader>Print Invoices</CardHeader>
              <ButtonContainer>
                <Link to={`/account/invoice/print`}>
                  <PrimaryButton label='Print Invoice' />
                </Link>
              </ButtonContainer>
            </Card>
          </CardContainer>
        </Container>
      </Layout>
    </div>
  );
};

export default AccountingDashboard;
