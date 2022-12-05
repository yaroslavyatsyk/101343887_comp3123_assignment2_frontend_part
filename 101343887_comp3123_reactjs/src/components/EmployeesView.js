import React from 'react'
import Axios from "axios"
import Endpoints from '../constants/url'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import {Link} from "react-router-dom";
import EmployeeBtnForAdd from './EmployeeBtnAdd';

export default
    function EmployeeList(props) {

    const [employees, setEmployeeList] = React.useState([])

    React.useEffect(() => {
        getAllEmployees()
    }, [employees])

    const getAllEmployees = () => {
        const employeeListEndpoint = `${Endpoints.base}${Endpoints.employees.base}${Endpoints.employees.readAll}`

        Axios.get(employeeListEndpoint)
            .then((response) => setEmployeeList(response.data))
    }

    const getEmployeeById = (empId) => {
        const empByIdEndpoint = `${Endpoints.base}${Endpoints.employees.base}/${empId}`

        Axios.get(empByIdEndpoint)
            .then(response => console.log(response.data))
    }
    
    const deleteEmployeeById = (empId) => {
        const endPoint = `${Endpoints.base}${Endpoints.employees.base}?eid=${empId}`
        Axios.delete(endPoint)
            .then(() => console.log(`Deleted employee ${empId} from database`))
        
        getAllEmployees()
    }

    return (
        <Container>
            <h1 className="text-center mt-4 mb-4">Employee List</h1>
            <EmployeeBtnForAdd />
            <Table striped bordered hover className="text-left">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => {
                        
                        const _passEmpToLocalStorage = () => {
                            console.log(employee)
                            localStorage.setItem('EmpId', employee._id)
                            localStorage.setItem('EmpFirstName', employee.first_name)
                            localStorage.setItem('EmpLastName', employee.last_name)
                            localStorage.setItem('EmpEmail', employee.email)
                            localStorage.setItem('EmpGender', employee.gender)
                            localStorage.setItem('EmpSalary', employee.salary)
                        }
                        
                        const _confirmAndDelete = () => {
                            if (window.confirm('Are you sure you wish to delete?')) {
                                deleteEmployeeById(employee._id)
                            }
                        }
    
                        return (
                            <tr key={employee._id}>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.gender}</td>
                                <td>
                                    <Link to={`${Endpoints.employees.base}${Endpoints.employees.view}`}>
                                        <Button
                                            variant='primary'
                                            size="sm"
                                            className="mr-2"
                                            onClick={(e) => _passEmpToLocalStorage()}
                                        >
                                            View
                                        </Button>
                                    </Link>
                                    <Link to={`${Endpoints.employees.base}${Endpoints.employees.update}`}>
                                        <Button
                                            variant='secondary'
                                            size="sm"
                                            className="mr-2"
                                            onClick={() => _passEmpToLocalStorage()}
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        variant='danger'
                                        size="sm"
                                        className="mr-2"
                                        onClick={() => {
                                            _confirmAndDelete();
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </Container>
    )
}