import styled from 'styled-components';

export const TableContainer = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  display: block;
  position: relative;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: scroll;

  @media only screen and (max-width: 767px) {
    thead {
      display: none;
    }
    tbody {
      display: block;
      overflow-y: scroll;
    }
    tbody tr {
      display: block;
      margin-bottom: 20px;
    }
    td {
      display: block;
      text-align: right;
      padding: 10px 5px;
    }
    td:before {
      content: attr(data-label);
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
`;

export const TableRow = styled.tr`
  background: ${({ theme }) => theme.bg3};
  &:hover {
    color: inherit;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background: ${({ theme }) => theme.bg3};
  color: inherit;
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 16px;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  background: ${({ theme }) => theme.bg3};
`;

export const TableExpandableRow = styled.tr`
  display: ${({ showExpandedRow }) => (showExpandedRow ? 'table-row' : 'none')};
`;

export const TableExpandableCell = styled.td`
  padding: 8px;
  text-align: left;
  // border: 1px solid #ddd;
  background: ${({ theme }) => theme.bg3};
  colspan: ${({ colSpan }) => colSpan};
`;

export const Action = styled.button`
  background: ${({ theme }) => theme.bg3};
  border: 1px solid green;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  letter-spacing: 0.9px;
  color: inherit;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background: ${({ theme }) => theme.bg3};
    color: inherit;
    transform: translateY(-3px);
  }
`;
