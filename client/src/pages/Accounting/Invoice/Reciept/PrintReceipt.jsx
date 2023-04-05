import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Receipt from './Receipt';

const PrintReceipt = (data) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef}>
        <Receipt data={data} ref={componentRef} />
      </div>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default PrintReceipt;
