import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin-top: -40px;

  @media (max-width: 700px) {
    justify-content: flex-start;
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

  @media (max-width: 1024px) {
    min-width: 100%;
    height: auto;
    gap: 30px;
    padding: 30px;
    justify-content: flex-start;
  }

  @media (max-width: 700px) {
    min-width: 100%;
    height: auto;
    gap: 30px;
    padding: 30px;
    justify-content: flex-start;
  }
`;
export const InputWrapper = styled.div`
  width: 300px;
  padding: 5px;
`;
export const LoginButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
