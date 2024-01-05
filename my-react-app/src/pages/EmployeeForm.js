import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    hometown: '',
    ibu: '',
    manager: '',
    quote: '',
  });

  const [formImage, setFormImage] = useState({
    image: '',
  });

  const [validationError, setValidationError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'image') {
      setFormImage((prevImage) => ({
        ...prevImage,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  const handleList = () => {
    navigate("/employee")
  }

  const onClick = async () => {
    try {
      if (!formData.name || !formData.position || !formData.ibu || !formData.manager || !formData.quote) {
        setValidationError('Please enter all the details');
        return;
      }

      const response = await axios.post('http://localhost:8080/api/employees', formData);

      const formImageData = new FormData();
      formImageData.append("image", formImage.image);
      const response2 = await axios.post('http://localhost:8080/add', formImageData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      } );

      if (response.status === 200 && response2.status === 200) {
        alert('Data submitted successfully!');
        setFormData({ id: '', name: '', position: '', hometown: '', ibu: '', image: ''});
        setValidationError(null);
      } else {
        console.error('Error submitting data. Status:', response.status);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div style={{ width: '300px', margin: 'auto', textAlign: 'center', marginTop: '50px' }}>
      <div className='p-2' />
      <h2>Employee Form</h2>
      {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
      <Form onSubmit={handleSubmit}>
      <div className='p-2' />
        <div className='p-2' />
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <div className='p-2' />
        <Form.Group controlId="formPosition">
          <Form.Label>Job Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job role"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </Form.Group>
        <div className='p-2' />
        <Form.Group controlId="formHometown">
          <Form.Label>Home Town</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your hometown"
            name="hometown"
            value={formData.hometown}
            onChange={handleChange}
          />
        </Form.Group>
        <div className='p-2' />
        <Form.Group controlId="formIBU">
          <Form.Label>IBU</Form.Label>
          <Form.Control
            type="text"
            placeholder="IBU"
            name="ibu"
            value={formData.ibu}
            onChange={handleChange}
          />
        </Form.Group>
        <div className='p-2' />
        <Form.Group controlId="formManager">
          <Form.Label>Reporting Manager</Form.Label>
          <Form.Control
            type="text"
            placeholder="Reporting Manager"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
          />
        </Form.Group>
        <div className='p-2' />
        <Form.Group controlId="formQuote">
          <Form.Label>Quote that keeps me moving</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your favorite quote"
            name="quote"
            value={formData.quote}
            onChange={handleChange}
          />
        </Form.Group>
        <div className='p-2' />
        <Form.Group controlId="formImage">
  <Form.Label>Profile Image</Form.Label>
  <Form.Control
    type="file"
    placeholder="Add profile picture"
    name="image"
    onChange={handleChange}
  />
</Form.Group>

        <div className='p-2' />

        <Button variant="primary" type="submit" onClick={onClick} style={{ width: '100px', marginTop: '10px', marginRight: '10px' }}>
          Submit
        </Button>
        <Button variant="primary btn-danger" onClick={handleList} style={{ width: '100px', marginTop: '10px' }}>
          List
        </Button>
      </Form>
    </div>
  );
};

export default EmployeeForm;




