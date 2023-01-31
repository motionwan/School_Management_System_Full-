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
import { BsCalendarEvent } from 'react-icons/bs';
import { MdLogout, MdSubject } from 'react-icons/md';
import { FaSuitcase, FaQuestion, FaSchool, FaHandPaper } from 'react-icons/fa';
import { IoMdSettings, IoIosSchool } from 'react-icons/io';
import { TbNewSection } from 'react-icons/tb';
import { SiGoogleclassroom } from 'react-icons/si';
import {
  AiOutlineTable,
  AiOutlineCheck,
  AiOutlineNotification,
  AiOutlineDashboard,
} from 'react-icons/ai';
import { BiIntersect, BiBook, BiBookAdd } from 'react-icons/bi';
import { HiOutlineStatusOnline } from 'react-icons/hi';

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

  const schoolArray = [
    {
      label: 'Dashboard',
      icon: <FaSchool />,
      path: `/client_school/${auth?.schoolId?._id}`,
    },
    {
      label: 'Inquiries',
      icon: <FaQuestion />,
      path: `/client_school/${auth?.schoolId?._id}/enquiries`,
    },
    {
      label: 'Settings',
      icon: <IoMdSettings />,
      path: `/client_school/${auth?.schoolId?._id}/settings`,
    },
    {
      label: 'Logs',
      icon: <FaSuitcase />,
      path: `/client_school/${auth?.schoolId?._id}/logs`,
    },
  ];

  const academicArray = [
    {
      label: 'Academic Dashboard',
      icon: <AiOutlineDashboard />,
      path: `/client_academic/${auth?.schoolId?._id}`,
    },
    {
      label: 'Class Sections',
      icon: <BiIntersect />,
      path: `/client_academic/${auth?.schoolId?._id}/class_sections`,
    },
    {
      label: 'Subjects',
      icon: <MdSubject />,
      path: `/client_academic/${auth?.schoolId?._id}/subjects`,
    },
    {
      label: 'Timetable',
      icon: <AiOutlineTable />,
      path: `#/client_academic/${auth?.schoolId?._id}/timetable`,
    },
    {
      label: 'Attendance',
      icon: <AiOutlineCheck />,
      path: `/client_academic/${auth?.schoolId?._id}`,
    },
    {
      label: 'Student Permissions',
      icon: <FaHandPaper />,
      path: `/client_academic/${auth?.schoolId?._id}`,
    },
    {
      label: 'Study Materials',
      icon: <BiBook />,
      path: `/client_academic/${auth?.schoolId?._id}`,
    },
    {
      label: 'Homework',
      icon: <BiBookAdd />,
      path: `/client_school/${auth?.schoolId?._id}`,
    },
    {
      label: 'Noticeboard',
      icon: <AiOutlineNotification />,
      path: `/client_academic/${auth?.schoolId?._id}`,
    },
    {
      label: 'Events',
      icon: <BsCalendarEvent />,
      path: `/client_academic/${auth?.schoolId?._id}`,
    },
    {
      label: 'Online Classes',
      icon: <HiOutlineStatusOnline />,
      path: `/client_academic/${auth?.schoolId?._id}`,
    },
  ];

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

          {schoolManagementArray.map((links, index) => {
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
          {schoolArray.map((links, index) => {
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
          {academicArray.map((links, index) => {
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
          {schoolManagementArray.map((links, index) => {
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
          {schoolArray.map((links, index) => {
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
          {academicArray.map((links, index) => {
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
    path: '/#settings',
    icon: <AiOutlineSetting />,
  },
  {
    label: 'Logout',
    path: '#/staff/logout',
    icon: <MdLogout />,
  },
];

export default Sidebar;

const schoolManagementArray = [
  {
    label: 'School Management',
    icon: <FaSchool />,
    path: '/school_management',
  },
  {
    label: 'Schools',
    icon: <IoIosSchool />,
    path: '/school_management/schools',
  },
  {
    label: 'Classes',
    icon: <SiGoogleclassroom />,
    path: '/school_management/classes',
  },
  {
    label: 'Terms/Semester',
    icon: <TbNewSection />,
    path: '/school_management/terms',
  },
];
