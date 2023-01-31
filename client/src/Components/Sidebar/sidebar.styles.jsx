import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { btnReset, v } from '../../Styles/variables';

export const SidebarContainer = styled.div`
  position: relative;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '10px')};
  transition: all 0.3s ease-in-out;
  overflow: auto;
  @media (max-width: 767px) {
    margin-left: 0px;
  }
`;
export const SSidebar = styled.div`
  width: ${({ isOpen }) => (!isOpen ? `auto` : v.sidebarWidth)};
  background: ${({ theme }) => theme.bg};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s ease-in-out;
  z-index: 12;
  /* hide scrollbar for all browsers */
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const SidebarButton = styled.button`
  ${btnReset}
  position:absolute;
  top: ${v.xxlSpacing};
  right: ${({ isOpen }) => (isOpen ? `-6px` : `0px`)};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  z-index: 4567;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.bg};
  box-shadow: 0 0 4px ${({ theme }) => theme.bg3} 0 0 7px
    ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};
  transition: all 0.3s ease-in-out;
`;

export const SLogo = styled.div`
  width: 52px;
  height: 192px;

  img: {
    max-width: 100%;
    height: 20px;
  }
  cursor: pointer;
  margin-bottom: ${v.lgSpacing};
`;

export const SidebarDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.bg3};
  margin: ${v.lgSpacing} 0;
`;

export const SidebarLinkContainer = styled.div`
  background: ${({ theme, isActive }) =>
    !isActive ? `transparent` : theme.bg3};
  border-radius: ${v.borderRadius};
  margin: 8px 0;
  &:hover {
    box-shadow: inset 0px 0px 0px ${({ theme }) => theme.bg3};
  }
`;

export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  padding: calc(${v.smSpacing} -2px);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarLinkIcon = styled.div`
  padding: ${v.smSpacing} ${v.mdSpacing};
  display: flex;

  svg {
    font-size: 20px;
  }
`;
export const SidebarLinkLabel = styled.span`
  display: block;
  flex: 1;
  margin-left: ${v.smSpacing};
`;

export const SidebarLinkNotification = styled.div`
  font-size: 14px;
  padding: calc(${v.smSpacing} / 2) ${v.smSpacing};
  border-radius: calc(${v.borderRadius} / 2);
  background: ${({ theme }) => theme.primary};
  color: white;
  margin-right: ${v.mdSpacing};
`;

export const SidebarTheme = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;
export const SidebarThemeLabel = styled.span`
  display: block;
  flex: 1;
  margin-left: ${v.mdSpacing};
`;
export const SidebarThemeToggler = styled.button`
  ${btnReset};
  margin: 0 10px;
  cursor: pointer;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: ${({ theme, isActive }) =>
    !isActive ? theme.bg3 : theme.primary};
  position: relative;
  margin-bottom: 50px;
`;

export const SidebarToggleThumb = styled.div`
  height: 18px;
  width: 18px;
  position: absolute;
  top: 1px;
  bottom: 1px;
  transition: all 0.3s ease-in-out;
  right: calc(100% - 18px-1px);
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
`;
