import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link, useNavigate } from 'react-router-dom'
import Endpoints from '../constants/url'

import React from 'react'
import Axios from 'axios'


export default
function EditEmployeeForm() {
	// Inputs
	const [employee, setEmployee] = React.useState({})
	
	const _genderOptions = ["male", "female", "other"]
	
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

	
	// Processing
	const handleFormSubmit = async () => {
		await _submitDataToServer()
		_navigateToEmpList()
	}
	
	const _submitDataToServer = async () => {
		const updateEmployeeEndPoint = `${Endpoints.base}${Endpoints.employees.base}/${employee.id}`
		const empToUpdate = {
			first_name: employee.firstName,
			last_name: employee.lastName,
			email: employee.email,
			gender: employee.gender,
			salary: employee.salary
		}
		await Axios.put(updateEmployeeEndPoint, empToUpdate)
	}
	
	const _onFieldChanged = (event) => {
		setEmployee({
			...employee,
			[event.target.name]: event.target.value}
		)}
	
	const navigate = useNavigate()
	
	const _navigateToEmpList = () => {
		const empListEndpoint = `${Endpoints.employees.base}${Endpoints.employees.readAll}`
		navigate(/* to: */ empListEndpoint)
	}
	
	const _capitalize = (aString) => aString[0].toLocaleUpperCase() + aString.substring(1)
	
	return (
		<Container>
			<h1 className="text-center mt-4 mb-4">Update Employee</h1>
			<Form>
				<Row className="mb-2">
					<Col md>
						<Form.Group controlId='empFirstName'>
							<Form.Label>First name</Form.Label>
							<Form.Control
								type="text"
								name="firstName"
								value={employee.firstName}
								onChange={(event) => _onFieldChanged(event)}
							/>
						</Form.Group>
					</Col>
					<Col md>
						<Form.Group controlId='empLastName'>
							<Form.Label>Last name</Form.Label>
							<Form.Control
								type="text"
								name="lastName"
								value={employee.lastName}
								onChange={(event) => _onFieldChanged(event)}
							/>
						</Form.Group>
					</Col>
				</Row>
				
				<Row className="mb-2">
					<Form.Group controlId='empEmail'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="john.doe@abc.org"
							name="email"
							value={employee.email}
							onChange={(event) => _onFieldChanged(event)}
						/>
						<Form.Text muted>Email must be unique</Form.Text>
					</Form.Group>
				</Row>
				
				<Row className="mb-4">
					<Col>
						<Form.Group controlId='empGender'>
							<Form.Label>Gender</Form.Label>
							<Form.Select
								name="gender"
								value={employee.gender}
								onChange={(event) => _onFieldChanged(event)}
							>
								<option>Select a gender</option>
								{
									_genderOptions.map(eachGender => {
										return <option
											key={eachGender}
											value={eachGender}>
											{_capitalize(eachGender)}
										</option>
									})
								}
							</Form.Select>
						</Form.Group>
					
					</Col>
					<Col>
						<Form.Group controlId='empSalary'>
							<Form.Label>Salary</Form.Label>
							<Form.Control
								type="number"
								placeholder="$99,999"
								name="salary"
								value={employee.salary}
								onChange={(event) => _onFieldChanged(event)}
							/>
						</Form.Group>
					</Col>
				</Row>
				
				<Row>
					<Form.Group>
						{/* Update Button */}
						<Button
							variant="primary"
							onClick={handleFormSubmit}
							className="mr-2"
						>
							Update
						</Button>
						
						{/* Cancel Button */}
						<Button
							variant="outline-primary"
							className="mr-2"
							onClick={_navigateToEmpList}
						>
							Cancel
						</Button>
					</Form.Group>
				</Row>
			</Form>
		</Container>
	)
}