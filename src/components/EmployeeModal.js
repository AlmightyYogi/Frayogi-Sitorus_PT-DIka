import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createEmployee, updateEmployee } from '../api/employeeService';

const EmployeeModal = ({ show, setShow, selectedEmployee, fetchEmployees }) => {
  const [employee, setEmployee] = useState({
    nik: '',
    firstname: '',
    lastname: '',
    address: '',
    gender: '',
    email: '',
    placeOfBirth: '',
    phone: '',
    departmentId: '',
    jobTitleId: '',
  });

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee({
        nik: selectedEmployee.nik,
        firstname: selectedEmployee.firstname,
        lastname: selectedEmployee.lastname,
        address: selectedEmployee.address,
        gender: selectedEmployee.gender,
        email: selectedEmployee.email,
        placeOfBirth: selectedEmployee.placeOfBirth,
        phone: selectedEmployee.phone,
        departmentId: selectedEmployee.department ? selectedEmployee.department.id : '',
        jobTitleId: selectedEmployee.jobTitle ? selectedEmployee.jobTitle.id : '',
      });
    }
  }, [selectedEmployee]);

  const handleSubmit = async () => {
    try {
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee.id, employee);
      } else {
        await createEmployee(employee);
      }
      fetchEmployees();
      setShow(false);
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>NIK</Form.Label>
            <Form.Control
              type="text"
              value={employee.nik}
              onChange={(e) => setEmployee({ ...employee, nik: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={employee.firstname}
              onChange={(e) => setEmployee({ ...employee, firstname: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={employee.lastname}
              onChange={(e) => setEmployee({ ...employee, lastname: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={employee.address}
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={employee.gender}
              onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Place of Birth</Form.Label>
            <Form.Control
              type="text"
              value={employee.placeOfBirth}
              onChange={(e) => setEmployee({ ...employee, placeOfBirth: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={employee.phone}
              onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              value={employee.departmentId}
              onChange={(e) => setEmployee({ ...employee, departmentId: e.target.value })}
            >
              <option value="">Select Department</option>
              <option value="1">HR</option>
              <option value="2">Finance</option>
              <option value="3">IT</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              as="select"
              value={employee.jobTitleId}
              onChange={(e) => setEmployee({ ...employee, jobTitleId: e.target.value })}
            >
              <option value="">Select Job Title</option>
              <option value="1">Manager</option>
              <option value="2">Developer</option>
              <option value="3">HR Specialist</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeModal;
