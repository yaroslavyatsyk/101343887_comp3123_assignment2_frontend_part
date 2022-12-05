import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/esm/Button'

import { Link } from 'react-router-dom'
import Endpoints from '../constants/url'

import React from 'react'
import Table from "react-bootstrap/Table";


export default
function ReadEmployee() {
	const [employee, setEmployee] = React.useState({})
	
	React.useEffect(() => {
		setEmployee({
			id: localStorage.getItem('EmpId'),
			firstName: localStorage.getItem('EmpFirstName'),
			lastName: localStorage.getItem('EmpLastName'),
			email: localStorage.getItem('EmpEmail'),
			gender: localStorage.getItem('EmpGender'),
			salary: localStorage.getItem('EmpSalary')
		})
	}, [])
	
	return (
		<>
			<h1 className="text-center mt-4 mb-4">View Employee</h1>
			<Container>
				<Table striped bordered hover className="text-left">
					<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Gender</th>
						<th>Salary</th>
					</tr>
					</thead>
					<tbody>
						<tr key={employee.id}>
							<td>{employee.firstName}</td>
							<td>{employee.lastName}</td>
							<td>{employee.email}</td>
							<td>{employee.gender}</td>
							<td>{employee.salary}</td>
						</tr>
					</tbody>
				</Table>
				
				{/* Update Button */}
				<Link to={`${Endpoints.employees.base}${Endpoints.employees.update}`}>
					<Button
						variant="primary"
						className="mr-2"
					>
						Edit
					</Button>
				</Link>
				
				{/* Cancel Button */}
				<Link to={Endpoints.employees.base}>
					<Button
						variant="outline-primary"
						className="mr-2"
					>
						Cancel
					</Button>
				</Link>
			</Container>
		</>
	)
}