import React from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components';

const Container = styled.div`
  position: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  display: block;
  color: ${({ theme }) => theme.text};
  pointer-events: none;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SelectContainer = styled(ReactSelect)`
  width: 100%;
  background: transparent;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text};
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    width: 80%;
    font-size: 20px;
  }
`;
const CustomSelect = React.forwardRef(
  (
    { options, onChange, value, initialValue, label, placeholder, ...rest },
    ref
  ) => (
    <Container>
      <Label>{label}</Label>
      <SelectContainer
        ref={ref}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: `${({ theme }) => theme.text}`,
          }),
        }}
        options={options}
        onChange={onChange}
        value={value}
        initialValue={initialValue}
        placeholder={placeholder}
        classNamePrefix={null}
        {...rest}
      />
    </Container>
  )
);

export default CustomSelect;
