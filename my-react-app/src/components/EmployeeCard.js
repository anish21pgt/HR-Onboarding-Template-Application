import React, { useRef, useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import axios from 'axios';

const EmployeeCard = ({ selectedEmployee, cardColor, internalColor, fontColor }) => {
  const elementRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [src, setSrc] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/display?id=${selectedEmployee.id}`, {
      responseType: 'arraybuffer',
    })
    .then((response) => {
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const imageUrl = URL.createObjectURL(blob);
      setSrc(imageUrl);
    })
    .catch((error) => {
      console.error('Error loading image:', error);
      setSrc('');
    });
  }, [selectedEmployee.id]);

  const takeScreenshot = () => {
    if (imageLoaded) {
      html2canvas(elementRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'template.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <>
      <Card
        style={{
          width: 'auto',
          height: '800px',
          backgroundColor: cardColor,
          color: fontColor,
        }}
        className='employee-details'
        ref={elementRef}
      >
        <div className='p-4'></div>
        <h1 style={{ textAlign: 'center', color: fontColor }}>Welcome to ABC Group of Companies !</h1>
        <div className='p-4'></div>
        <Card.Body>

          <Row>
            <Col xs={12} md={3} style={{ marginBottom: '10px' }} className='mx-auto'>
            </Col>
            <Col xs={12} md={3} style={{ marginBottom: '10px' }} className='mx-auto'>
            {src && <img src={src} alt='Employee' style={{ width: '150px', maxHeight: '150px', display: 'block', margin: '20px auto' }} onLoad={() => setImageLoaded(true)} />}
            </Col>
            <Col xs={12} md={3} style={{ marginBottom: '10px' }} className='mx-auto'>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={3} style={{ marginBottom: '10px' }} className='mx-auto'>
              <Card style={{ backgroundColor: internalColor, color: 'white', textAlign: 'center' }}>
                <Card.Body>
                  <Card.Title style={{ color: fontColor }}>Name</Card.Title>
                  <Card.Text style={{ color: fontColor }}>{selectedEmployee.name}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3} style={{ marginBottom: '10px' }} className='mx-auto'>
              <Card style={{ backgroundColor: internalColor, color: 'white', textAlign: 'center' }}>
                <Card.Body>
                  <Card.Title style={{ color: fontColor }}>Position</Card.Title>
                  <Card.Text style={{ color: fontColor }}>{selectedEmployee.position}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3} style={{ marginBottom: '10px' }} className='mx-auto'>
              <Card style={{ backgroundColor: internalColor, color: 'white', textAlign: 'center' }}>
                <Card.Body>
                  <Card.Title style={{ color: fontColor }}>Employee ID</Card.Title>
                  <Card.Text style={{ color: fontColor }}>{selectedEmployee.id}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className='p-4'></div>
          <Row>
            <Col xs={12} md={3} style={{ marginBottom: '10px' }} className='mx-auto'>
              <Card style={{ backgroundColor: internalColor, color: 'white', textAlign: 'center' }}>
                <Card.Body>
                  <Card.Title style={{ color: fontColor }}>Hometown</Card.Title>
                  <Card.Text style={{ color: fontColor }}>{selectedEmployee.hometown}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3} style={{ marginBottom: '10px' }} className='mx-auto'>
              <Card style={{ backgroundColor: internalColor, color: 'white', textAlign: 'center' }}>
                <Card.Body>
                  <Card.Title style={{ color: fontColor }}>IBU</Card.Title>
                  <Card.Text style={{ color: fontColor }}>{selectedEmployee.ibu}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3} style={{ marginBottom: '10px' }} className='mx-auto'>
              <Card style={{ backgroundColor: internalColor, color: 'white', textAlign: 'center' }}>
                <Card.Body>
                  <Card.Title style={{ color: fontColor }}>Reporting Manager</Card.Title>
                  <Card.Text style={{ color: fontColor }}>{selectedEmployee.manager}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className='p-4'></div>
          <Row>
            <Col xs={12} md={3} style={{ marginBottom: '10px' }} className='mx-auto'>
              <Card style={{ backgroundColor: internalColor, color: 'white', textAlign: 'center' }}>
                <Card.Body>
                  <Card.Title style={{ color: fontColor }}>Favorite Quote</Card.Title>
                  <Card.Text style={{ color: fontColor }}>{selectedEmployee.quote}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </Card.Body>
      </Card>
      <div className='p-2'></div>
      {selectedEmployee && (
        <button
          className='btn btn-primary'
          variant='primary'
          onClick={takeScreenshot}
          style={{ width: '150px', margin: 'auto', display: 'block' }}
        >
          Download Image
        </button>
      )}
</>
      
  );
};

export default EmployeeCard;



