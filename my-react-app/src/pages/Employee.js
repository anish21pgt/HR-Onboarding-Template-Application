import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Dropdown } from 'react-bootstrap';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeCard2 from '../components/EmployeeCard2';
import EmployeeCard3 from '../components/EmployeeCard3';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [profile, setProfile] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [cardColor, setCardColor] = useState('rgb(0,230,250)');
  const [internalColor, setInternalColor] = useState('red');
  const [fontColor, setFontColor] = useState('black');
  const [selectedLayout, setSelectedLayout] = useState('Style 1');
  const [selectedColorOption, setSelectedColorOption] = useState('Color 1');
  const [selectedLayoutOption, setSelectedLayoutOption] = useState('Layout 1');

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees/getAll');
      setEmployees(response.data);
      const response2 = await axios.get('http://localhost:8080/api/employees/display', {
        params: { id: selectedEmployee?.id } 
      });
      setProfile(response2.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [selectedEmployee]); 
  const handleCardClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleColorChange = (color1, color2, color3, option) => {
    setCardColor(color1);
    setInternalColor(color2);
    setFontColor(color3);
    setSelectedColorOption(option);
  };

  const handleLayoutChange = (layout, option) => {
    setSelectedLayout(layout);
    setSelectedLayoutOption(option);
  };

  const handleList = () => {
    navigate('/');
  };


  const renderSelectedLayout = () => {
    switch (selectedLayout) {
      case 'Style 1':
        return <EmployeeCard selectedEmployee={selectedEmployee} cardColor={cardColor} internalColor={internalColor} fontColor={fontColor} />;
      case 'Style 2':
        return <EmployeeCard2 selectedEmployee={selectedEmployee} cardColor={cardColor} internalColor={internalColor} fontColor={fontColor} />;
      case 'Style 3':
        return <EmployeeCard3 selectedEmployee={selectedEmployee} cardColor={cardColor} internalColor={internalColor} fontColor={fontColor} />;
      default:
        return null;
    }
  };

  return (
    <Container fluid>
      <h2 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '50px' }}>Employee Names</h2>
      <Row className="text-center">
        <Col className="mx-2">
          <Dropdown className="d-inline-block" style={{ marginRight: '15px' }}>
            <Dropdown.Toggle variant="success" id="dropdown-color">
              {selectedColorOption}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleColorChange('rgb(0,230,250)', 'red', 'black', 'Color 1')}>Color 1</Dropdown.Item>
              <Dropdown.Item onClick={() => handleColorChange('blue', 'gray', 'white', 'Color 2')}>Color 2</Dropdown.Item>
              <Dropdown.Item onClick={() => handleColorChange('green', 'salmon', 'yellow', 'Color 3')}>Color 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="d-inline-block">
            <Dropdown.Toggle variant="success" id="dropdown-layout">
              {selectedLayoutOption}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleLayoutChange('Style 1', 'Layout 1')}>Layout 1</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLayoutChange('Style 2', 'Layout 2')}>Layout 2</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLayoutChange('Style 3', 'Layout 3')}>Layout 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <div className='p-2'></div>

      <Row className="text-center">
        {employees.map((employee) => (
          <Col key={employee.id} xs={12} md={3} style={{ marginBottom: '10px' }}>
            <Button
              onClick={() => handleCardClick(employee)}
              style={{ width: 'auto', textAlign: 'left' }}
            >
              {employee.name}
            </Button>
            <div className='p-2'></div>
          </Col>
        ))}
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <Button variant="primary btn-danger" onClick={handleList} style={{ width: '100px', marginTop: '10px', marginBottom: '20px' }}>
            Form
          </Button>
        </Col>
      </Row>

      {selectedEmployee && renderSelectedLayout()}

      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
        </Col>
      </Row>
    </Container>
  );
};

export default Employee;


