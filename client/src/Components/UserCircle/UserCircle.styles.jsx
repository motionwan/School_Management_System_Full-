import styled from 'styled-components';

export const UserCircleContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin: 20px;
  z-index: 100;
`;

export const UserCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserMenuContainer = styled.div`
  position: relative;
`;

export const UserMenuList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
`;

export const UserMenuItem = styled.li`
  list-style: none;
  margin-bottom: 10px;
`;

export const UserMenuLink = styled.a`
  color: #333;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #000;
    background-color: ${({ theme }) => theme.bg3};
  }
`;
