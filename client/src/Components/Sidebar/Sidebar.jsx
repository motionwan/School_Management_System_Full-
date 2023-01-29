import React, { useContext, useState } from 'react';
import {
  SidebarButton,
  SidebarDivider,
  SidebarLink,
  SidebarLinkContainer,
  SidebarLinkIcon,
  SidebarLinkNotification,
  SidebarTheme,
  SidebarThemeLabel,
  SidebarThemeToggler,
  SidebarToggleThumb,
  SidebarContainer,
  SidebarLinkLabel,
  SLogo,
  SSidebar,
} from './sidebar.styles';

import { logoPNG } from '../../assets';
import {
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
  AiOutlineLeft,
} from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { MdOutlineAnalytics, MdLogout } from 'react-icons/md';
import { ThemeContext } from '../../App';
import { useLocation } from 'react-router-dom';
import {
  Hamburger,
  MobileNavBarLabel,
  MobileNavBarLinks,
  MobileNavLinksContainer,
  MobileSidebar,
  MobileSidebarSettingsContainer,
} from './MobileNavBar/MobileNavBar.styles';

const Sidebar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <SidebarContainer isOpen={sidebarOpen}>
        <SSidebar isOpen={sidebarOpen}>
          <SidebarButton
            isOpen={sidebarOpen}
            onClick={() => setSidebarOpen((p) => !p)}
          >
            <AiOutlineLeft />
          </SidebarButton>
          <SLogo>
            <img
              src={logoPNG}
              alt='logo'
              style={sidebarOpen ? {} : { display: 'none' }}
            />
          </SLogo>
          <SidebarDivider />

          {linksArray.map((links, index) => {
            return (
              <SidebarLinkContainer
                isActive={pathname === links.path}
                key={index}
              >
                <SidebarLink
                  style={!sidebarOpen ? { width: `fit-content` } : {}}
                  to={links.path}
                >
                  <SidebarLinkIcon>{links.icon}</SidebarLinkIcon>
                  {sidebarOpen && (
                    <>
                      <SidebarLinkLabel>{links.label}</SidebarLinkLabel>
                      <SidebarLinkNotification>0</SidebarLinkNotification>
                    </>
                  )}
                </SidebarLink>
              </SidebarLinkContainer>
            );
          })}
          <SidebarDivider />
          {secondaryLinkArray.map((links, index) => {
            return (
              <SidebarLinkContainer key={index}>
                <SidebarLink
                  style={!sidebarOpen ? { width: `fit-content` } : {}}
                  to={links.path}
                >
                  <SidebarLinkIcon>{links.icon}</SidebarLinkIcon>
                  {sidebarOpen && (
                    <SidebarLinkLabel>{links.label}</SidebarLinkLabel>
                  )}
                </SidebarLink>
              </SidebarLinkContainer>
            );
          })}
          <SidebarDivider />
          <SidebarTheme>
            {sidebarOpen && (
              <SidebarThemeLabel>
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </SidebarThemeLabel>
            )}
            <SidebarThemeToggler
              isActive={theme === 'dark'}
              onClick={() =>
                setTheme((p) => (p === 'light' ? 'dark' : 'light'))
              }
            >
              <SidebarToggleThumb
                style={theme === 'dark' ? { right: '1px' } : {}}
              />
            </SidebarThemeToggler>
          </SidebarTheme>
        </SSidebar>
        {/* mobile nave */}
        <MobileSidebar smallNavOpen={openMobileNav}>
          <MobileSidebarSettingsContainer>
            <Hamburger
              onClick={() => {
                setOpenMobileNav((p) => !p);
              }}
            >
              {openMobileNav ? <>&#10005;</> : <>&#8801;</>}
            </Hamburger>
            <SidebarTheme>
              {sidebarOpen && (
                <SidebarThemeLabel>
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </SidebarThemeLabel>
              )}
              <SidebarThemeToggler
                isActive={theme === 'dark'}
                onClick={() =>
                  setTheme((p) => (p === 'light' ? 'dark' : 'light'))
                }
              >
                <SidebarToggleThumb
                  style={theme === 'dark' ? { right: '1px' } : {}}
                />
              </SidebarThemeToggler>
            </SidebarTheme>
          </MobileSidebarSettingsContainer>
          {/*sidebar links here*/}
          {linksArray.map((links, index) => {
            return (
              <MobileNavLinksContainer
                isActive={pathname === links.path}
                key={index}
              >
                <MobileNavBarLinks
                  style={!sidebarOpen ? { width: `fit-content` } : {}}
                  to={links.path}
                >
                  {openMobileNav && (
                    <>
                      <MobileNavBarLabel
                        onClick={() => {
                          setOpenMobileNav((p) => !p);
                        }}
                      >
                        {links.label}
                      </MobileNavBarLabel>
                    </>
                  )}
                </MobileNavBarLinks>
              </MobileNavLinksContainer>
            );
          })}
        </MobileSidebar>
      </SidebarContainer>
    </>
  );
};

const linksArray = [
  {
    label: 'Home',
    icon: <AiOutlineHome />,
    path: '/',
    notification: 0,
  },
  {
    label: 'Statistics',
    icon: <MdOutlineAnalytics />,
    path: '/statistics',
    notification: 0,
  },
  {
    label: 'Customers',
    icon: <BsPeople />,
    path: '/customers',
    notification: 0,
  },
  {
    label: 'Diagrams',
    icon: <AiOutlineApartment />,
    path: '/diagrams',
    notification: 0,
  },
];

const secondaryLinkArray = [
  {
    label: 'Settings',
    path: '/#settings',
    icon: <AiOutlineSetting />,
  },
  {
    label: 'Logout',
    path: '/#logout',
    icon: <MdLogout />,
  },
];

export default Sidebar;
