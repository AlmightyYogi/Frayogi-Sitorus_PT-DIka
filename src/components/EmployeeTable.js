import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import EmployeeModal from './EmployeeModal';
import DeleteModal from './DeleteModal';
import { getEmployees, deleteEmployee } from '../api/employeeService';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleShow = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployee(deleteId);
      fetchEmployees();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Employee</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Job Title</th>
            <th>Hire Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstname}</td>
              <td>{employee.lastname}</td>
              <td>{employee.email}</td>
              <td>{employee.department ? employee.department.name : ''}</td>
              <td>{employee.jobTitle ? employee.jobTitle.title : ''}</td>
              <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(employee)}>Show</Button>
                <Button variant="info" onClick={() => handleEdit(employee)} className="ml-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(employee.id)} className="ml-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EmployeeModal
        show={showModal}
        setShow={setShowModal}
        selectedEmployee={selectedEmployee}
        fetchEmployees={fetchEmployees}
      />

      <DeleteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default EmployeeTable;
