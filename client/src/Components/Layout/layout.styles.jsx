import styled from 'styled-components';
import { v } from '../../Styles/variables';

export const SLayout = styled.div`
  display: flex;
`;

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SMain = styled.main`
  padding: calc(${v.smSpacing} * 10);
  width: 100%;
  h1 {
    font-size: 14px;
  }
  @media (max-width: 767px) {
    margin-top: 90px;
    padding: 5px;
    width: 100%;
  }
`;
