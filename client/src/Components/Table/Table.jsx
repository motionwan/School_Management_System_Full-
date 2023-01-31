import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import DeleteEdit from '../DeleteAndEdit/DeleteEdit';
import DialogModal from '../Dialog/Dialog';
import AuthContext from '../../context/AuthContext/AuthContext';

const TableContainer = styled.div`
  overflow-x: auto;
  display: block;
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

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

const TableRow = styled.tr`
  background: ${({ index, theme }) => (index % 2 === 0 ? theme.bg3 : theme.bg)};
  &:hover {
    color: inherit;
  }
`;

const TableCell = styled.td`
  border: 1px solid ${({ theme }) => theme.text};
  padding: 8px;
  text-align: left;
  background: ${({ theme }) => theme.bg3};
  color: inherit;
`;

const TableHeader = styled.th`
  border: 1px solid ${({ theme }) => theme.text};
  padding: 16px;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  background: ${({ theme }) => theme.bg2};
`;

const TableExpandableRow = styled.tr`
  display: ${({ showExpandedRow }) => (showExpandedRow ? 'table-row' : 'none')};
`;

const TableExpandableCell = styled.td`
  padding: 8px;
  text-align: left;
  // border: 1px solid #ddd;
  background: ${({ theme }) => theme.bg2};
  colspan: ${({ colSpan }) => colSpan};
`;

const Action = styled.button`
  background: ${({ theme }) => theme.bg3};
  border: 1px solid green;
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

const DataTable = ({ data, columns, onDelete, onEdit }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);
  const { setCurrentData } = useContext(AuthContext);
  const [dialog, setDialog] = useState({
    message: '',
    loading: false,
  });

  //delete here
  const handleDelete = (row) => {
    setCurrentData(row);
    setDialog({
      loading: true,
      message:
        'Are you sure you want to delete? This action is irreversible and may affect Students and Staff data',
    });
  };

  const deleteRecord = (choice) => {
    if (!choice) {
      setDialog({ loading: false, message: '' });
    } else {
      onDelete();
      setDialog({ loading: false, message: '' });
    }
  };

  const handleRowClick = (id) => {
    setExpandedRowId(id === expandedRowId ? null : id);
  };

  const handleEdit = (item) => {
    setCurrentData(item);
    onEdit();
  };

  return (
    <TableContainer>
      {dialog.loading && (
        <DialogModal onDialog={deleteRecord} message={dialog.message} />
      )}
      <Table>
        <thead>
          <tr>
            <TableHeader data-label='Action'>Actions</TableHeader>
            {columns.map((column) => (
              <TableHeader key={column.key}>{column.label}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <React.Fragment key={row._id}>
              <TableRow index={index}>
                <TableCell>
                  <Action onClick={() => handleRowClick(row._id)}>
                    {expandedRowId === row._id ? 'Hide' : 'Show'}
                  </Action>
                </TableCell>
                {columns.map((column) => (
                  <TableCell data-label={column.label} key={column.key}>
                    {row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
              <TableExpandableRow showExpandedRow={expandedRowId === row._id}>
                <TableExpandableCell colSpan={columns.length + 1}>
                  <DeleteEdit
                    deleteRecord={() => handleDelete(row)}
                    editRecord={() => {
                      handleEdit(row);
                    }}
                  />
                </TableExpandableCell>
              </TableExpandableRow>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;
