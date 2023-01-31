import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const CardContainer = styled.div`
  width: 40%;
  min-height: 10rem;
  display: flex;
  flex-wrap: wrap;
  margin: 50px 0;
  justify-content: flex-start;

  @media (max-width: 1080px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 720px) {
    width: calc(100% - 20px);
    margin: 20px 20px;
  }
`;

export const Card = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px;
  padding: 5px;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  text-align: left;
  cursor: pointer;

  @media (max-width: 1080px) {
    width: calc(100% - 20px);
    padding: 15px;
  }
  @media (max-width: 720px) {
    width: calc(100% - 20px);
    margin: 20px 20px;
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
export const ButtonContainer = styled.div`
  display: flex;
  padding: 0 10px;
  margin-top: 50px;
  flex-direction: row;
  gap: 30px;

  @media (max-width: 1080px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }
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
