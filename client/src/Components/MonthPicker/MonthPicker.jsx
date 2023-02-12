import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
  width: 90%;
  //margin: 10px;
`;

const MonthPicker = ({ onChange, value, onBlur, name }) => {
  //const [date, setDate] = useState(new Date() || null);

  return (
    <Container>
      <Input
        type='month'
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
      />
    </Container>
  );
};

export default MonthPicker;
