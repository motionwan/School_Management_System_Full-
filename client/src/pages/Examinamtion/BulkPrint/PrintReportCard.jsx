import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ReportCard from './BulkPrintStyles/StudentResultTable';

const PrintableReportCard = (data) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef}>
        <ReportCard data={data} ref={componentRef} />
      </div>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default PrintableReportCard;
