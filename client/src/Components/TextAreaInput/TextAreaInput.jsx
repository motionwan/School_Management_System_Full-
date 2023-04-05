import React from 'react';
import styled from 'styled-components';

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 150px;
    font-size: 20px;
    margin: 15px;
    padding: 10px;
  }
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  background: transparent;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text};
  resize: none;
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    width: 100%;
    min-height: 150px;
    font-size: 20px;
  }
`;

const TextAreaInput = ({
  name,
  id,
  onChange,
  value,
  label,
  placeholder,
  ...rest
}) => (
  <TextAreaContainer>
    <Label htmlFor={id}>{label}</Label>
    <TextArea
      name={name}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      {...rest}
    />
  </TextAreaContainer>
);

export default TextAreaInput;
