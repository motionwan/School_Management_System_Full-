import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const Card = styled.div`
  width: 30%;
  margin: 10px;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  text-align: left;
  cursor: pointer;

  @media (max-width: 1080px) {
    width: 45%;
  }
  @media (max-width: 900px) {
    width: 60%;
  }
  @media (max-width: 720px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 20px 0;
  }
`;

export const CardContent = styled.div`
  padding: 1rem;
`;

export const CardHeader = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
`;

export const CardText = styled.p`
  font-size: 1.25rem;
`;

// export const DashboardCard = ({ cardHeader, cardText }) => {
//   return (
//     <CardContainer>
//       <Card>
//         <CardContent>
//           <CardHeader>{cardHeader}</CardHeader>
//           <CardText>{cardText}</CardText>
//         </CardContent>
//       </Card>
//     </CardContainer>
//   );
// };

// export default DashboardCard;
