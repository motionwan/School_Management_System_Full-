import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const DatePicker = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Container>
      <Input
        type='date'
        value={format(date, 'yyyy-MM-dd')}
        onChange={(e) => setDate(new Date(e.target.value))}
      />
    </Container>
  );
};

export default DatePicker;
