import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  UserCircle,
  UserCircleContainer,
  UserMenuContainer,
  UserMenuItem,
  UserMenuLink,
  UserMenuList,
} from './UserCircle.styles';
import { baseUrl } from '../../helpers/baseUrl';
import AuthContext from '../../context/AuthContext/AuthContext';
import useLogout from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { auth } = useContext(AuthContext);
  const logout = useLogout();
  const navigate = useNavigate();

  //function that will use logout
  const SignOut = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuRef]);

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <UserCircleContainer>
      <UserCircle onClick={handleUserMenuClick}>
        <img src={`${baseUrl}/${auth?.photoId}`} alt='UserProfile' />
      </UserCircle>
      {isUserMenuOpen && (
        <UserMenuContainer ref={userMenuRef}>
          <UserMenuList>
            <UserMenuItem>
              <UserMenuLink onClick={SignOut}>Log out</UserMenuLink>
            </UserMenuItem>
            <UserMenuItem>
              <UserMenuLink href='#'>Settings</UserMenuLink>
            </UserMenuItem>
          </UserMenuList>
        </UserMenuContainer>
      )}
    </UserCircleContainer>
  );
};

export default User;
