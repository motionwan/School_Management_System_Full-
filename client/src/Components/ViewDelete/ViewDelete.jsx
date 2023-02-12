import React from 'react';
import styled from 'styled-components';
import { FaSearchPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const ActionContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 5px 8px;
`;
const Edit = styled.button`
  background: ${({ theme }) => theme.bg3};
  border: 1px solid #3483eb;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  letter-spacing: 0.9px;
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transform: translateY(-3px);
  }
`;
const Delete = styled.button`
  background: ${({ theme }) => theme.bg3};
  border: 1px solid red;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  letter-spacing: 0.9px;
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transform: translateY(-3px);
  }
`;
const Icon = styled.span`
  padding-right: 5px;
  svg: {
    font-size: 20px;
  }
`;

const ViewDelete = ({ viewRecord, deleteRecord }) => {
  return (
    <ActionContainer>
      <Edit onClick={viewRecord}>
        <Icon>
          <FaSearchPlus />
        </Icon>
        View
      </Edit>
      <Delete onClick={deleteRecord}>
        <Icon>
          <MdDelete />
          Delete
        </Icon>
      </Delete>
    </ActionContainer>
  );
};

export default ViewDelete;
