import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  //align-items: center;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  display: block;
  color: ${({ theme }) => theme.text};
  pointer-events: none;
  margin-bottom: 5px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Input = styled(DatePicker)`
  width: 100%;
  height: 20px;
  background: transparent;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text};
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 50px;
    font-size: 20px;
  }
`;

const DateInput = React.forwardRef(
  ({ name, id, selected, onChange, label, ...rest }, ref) => (
    <InputContainer>
      <Label>{label}</Label>
      <Input
        name={name}
        id={id}
        showIcon
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
        selected={selected}
        onChange={onChange}
        ref={ref}
        {...rest}
      />
    </InputContainer>
  )
);

export default DateInput;
