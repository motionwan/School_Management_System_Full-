import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { v } from '../../../Styles/variables';

export const MobileSidebarSettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
export const MobileSidebar = styled.div`
  position: fixed;
  width: 100%;
  height: ${({ smallNavOpen }) => (smallNavOpen ? '100%' : '60px')};
  top: 0;
  left: 0;
  display: none;
  margin-bottom: 100px;
  background: ${({ theme }) => theme.bg};
  transition: all 0.2s ease-in-out;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileNavLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    display: none;
  }
`;
export const MobileNavBarLinks = styled(Link)`
  color: inherit;
  align-items: center;
  text-decoration: none;
  font-size: 26px;
  padding: calc(${v.smSpacing} -2px);
`;

export const MobileNavBarLabel = styled.span`
  display: block;
  flex: 1;
  margin-left: ${v.smSpacing};
`;

export const Hamburger = styled.button`
  font-size: 20px;
  color: inherit;
  font-weight: bold;
  background: ${({ theme }) => theme.bg3};
`;
