import React, { useContext, useState } from 'react';
import {
  SidebarButton,
  SidebarDivider,
  SidebarLink,
  SidebarLinkContainer,
  SidebarLinkIcon,
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
import { AiOutlineSetting, AiOutlineLeft } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import {
  AdminSchoolArray,
  AdminStudentArray,
  AdminAdminArray,
  AdminExamArray,
  AdminAcademicArray,
  houseMasterArray,
} from './MobileNavBar/Routes/AdminRoutes';
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
import AuthContext from '../../context/AuthContext/AuthContext';

const Sidebar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const { pathname } = useLocation();
  const { auth } = useContext(AuthContext);

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

          {/* ADMIN ROUTES GOES HEREk */}
          {auth?.permissions.includes('admin') && (
            <>
              {/* // end of  school management array */}
              {AdminSchoolArray.map((links, index) => {
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
                        </>
                      )}
                    </SidebarLink>
                  </SidebarLinkContainer>
                );
              })}
              <SidebarDivider />
              {/* // end of  school management array */}
              {AdminAcademicArray.map((links, index) => {
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
                        </>
                      )}
                    </SidebarLink>
                  </SidebarLinkContainer>
                );
              })}
              <SidebarDivider />
              {/* // end of  school management array */}
              {AdminStudentArray.map((links, index) => {
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
                        </>
                      )}
                    </SidebarLink>
                  </SidebarLinkContainer>
                );
              })}
              <SidebarDivider />
              {/* // end of  school management array */}
              {AdminAdminArray.map((links, index) => {
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
                        </>
                      )}
                    </SidebarLink>
                  </SidebarLinkContainer>
                );
              })}
              <SidebarDivider />
              {/* // end of  school management array */}
              {AdminExamArray.map((links, index) => {
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
                        </>
                      )}
                    </SidebarLink>
                  </SidebarLinkContainer>
                );
              })}
              <SidebarDivider />
              {houseMasterArray.map((links, index) => {
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
                        </>
                      )}
                    </SidebarLink>
                  </SidebarLinkContainer>
                );
              })}
            </>
          )}
          {/* ADMIN ROUTES ENDS HERE  */}

          <SidebarDivider />
          {/* // end of  school management array */}
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

          {AdminSchoolArray.map((links, index) => {
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
          <SidebarDivider />
          {AdminAcademicArray.map((links, index) => {
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
          <SidebarDivider />
          {/* mobile navbar ends here */}
          {AdminStudentArray.map((links, index) => {
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
          <SidebarDivider />
          {/* mobile navbar ends here */}
          {AdminAdminArray.map((links, index) => {
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
          <SidebarDivider />
          {/* mobile navbar ends here */}
          {AdminExamArray.map((links, index) => {
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
          <SidebarDivider />
          {/* mobile navbar ends here */}
          {/* mobile navbar ends here */}
          {houseMasterArray.map((links, index) => {
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
          <SidebarDivider />
          {/* mobile navbar ends here */}
        </MobileSidebar>
      </SidebarContainer>
    </>
  );
};

const secondaryLinkArray = [
  {
    label: 'Settings',
    path: '/settings',
    icon: <AiOutlineSetting />,
  },
  {
    label: 'Logout',
    path: '/logout',
    icon: <MdLogout />,
  },
];

export default Sidebar;
