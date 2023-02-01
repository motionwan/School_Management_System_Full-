import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TertiaryButton } from '../../../Components/Buttons/TertiaryButton';
import DialogModal from '../../../Components/Dialog/Dialog';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { baseUrl } from '../../../helpers/baseUrl';
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
  background: #f9f9f9;
  &:hover {
    color: inherit;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background: #f9f9f9;
  color: inherit;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 16px;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  background: #ddd;
`;

const TableExpandableRow = styled.tr`
  display: ${({ showExpandedRow }) => (showExpandedRow ? 'table-row' : 'none')};
`;

const TableExpandableCell = styled.td`
  padding: 8px;
  text-align: left;
  // border: 1px solid #ddd;
  background: #ddd;
  colspan: ${({ colSpan }) => colSpan};
`;

const Action = styled.button`
  background: #f9f9f9;
  border: 1px solid green;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  letter-spacing: 0.9px;
  color: green;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background: green;
    color: #f9f9f9;
    transform: translateY(-3px);
  }
`;

const ClassSections = () => {
  const [classSchools, setClassSchools] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});
  const { userData, auth, setCurrentData } = useContext(AuthContext);

  useEffect(() => {
    const fetchClassSchools = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/class_section/count/63d95aa8cbdcf350e3fdef12`
        );
        setClassSchools(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClassSchools();
  }, []);

  const handleExpand = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const handleEdit = (section) => {
    setSelectedSection(section);
    setShowModal(true);
  };

  return (
    <Layout>
      <LocationLabel label={auth.schoolId.label.toUpperCase()}>
        <TermSelector />
      </LocationLabel>
      <TableContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Actions</TableHeader>
              <TableHeader>Class</TableHeader>
              <TableHeader>Number Of Sections</TableHeader>
              <TableHeader>Number Of Students</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {classSchools.map((classSchool) => (
              <React.Fragment key={classSchool._id._id}>
                <TableRow>
                  <TableCell data-label='Actions'>
                    <Action onClick={() => handleExpand(classSchool._id)}>
                      Expand
                    </Action>
                  </TableCell>
                  <TableCell data-label='Class'>
                    <div style={{ fontWeight: 'bold' }}>
                      {classSchool.class.label}
                    </div>
                  </TableCell>
                  <TableCell data-label='Number of sections'>
                    <div
                      style={{
                        display: 'flex ',
                        alignItems: 'center',
                        gap: '20px',
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>
                        {classSchool.count}
                      </div>
                      <Link
                        to={`/client_academic/${auth.schoolId._id}/add_class_sections`}
                      >
                        <TertiaryButton
                          onClick={() => {
                            setCurrentData(classSchool);
                          }}
                          label='manage'
                        />
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell data-label='Number of students'>
                    {/* {classSchool.className} */}0
                  </TableCell>
                </TableRow>
                <TableExpandableRow
                  showExpandedRow={expandedRowId === classSchool._id}
                >
                  <TableExpandableCell colSpan={4}>
                    <p>Teacher's name</p>
                    {/* <p>
                    <strong>Students: </strong>
                    {classSchool.students.map((student) => (
                      <span key={student._id}>
                        {student.firstName} {student.lastName},{' '}
                      </span>
                    ))}
                  </p> */}
                  </TableExpandableCell>
                </TableExpandableRow>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
        {/* <DialogModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      /> */}
      </TableContainer>
    </Layout>
  );
};

export default ClassSections;
