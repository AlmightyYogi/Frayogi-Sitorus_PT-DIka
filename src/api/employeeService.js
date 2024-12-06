import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees';

export const getEmployees = () => axios.get(API_URL);
export const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);
export const createEmployee = async (employeeData) => {
    try {
      const response = await axios.post(API_URL, employeeData);
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  export const updateEmployee = async (id, employeeData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, employeeData);
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);