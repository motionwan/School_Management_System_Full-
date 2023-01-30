import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin-top: -40px;

  @media (max-width: 768px) {
  }
`;
export const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 700px;
  height: 500px;
  background: ${({ theme }) => theme.bg3};
  gap: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const InputWrapper = styled.div`
  width: 300px;
  padding: 5px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 120px;
    width: 500px;
  }
`;
export const LoginButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
