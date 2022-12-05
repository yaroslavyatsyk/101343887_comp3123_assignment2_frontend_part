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
    function AddEmployeeForm() {

    // Inputs
    const first_name = React.useRef()
    const last_name = React.useRef()
    const email = React.useRef()
    const gender = React.useRef()
    const salary = React.useRef()

    const _genderOptions = ["male", "female", "other"]



    // Processing
    const handleFormSubmit = async () => {
        await _submitDataToServer()
        _navigateToEmployeeList()
    }

    const _submitDataToServer = async () => {
        const addEmpEndPoint = `${Endpoints.base}${Endpoints.employees.base}` 
        const newEmp = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            email: email.current.value,
            gender: gender.current.value,
            salary: Number(salary.current.value)
        }
        Axios.post(addEmpEndPoint, newEmp)
    }

    const to_navigate = useNavigate()

    const _navigateToEmployeeList = () => {
        const empListEnd = `${Endpoints.employees.base}${Endpoints.employees.readAll}`
        to_navigate( empListEnd)
    }

    const _capitalize = (aString) => aString[0].toLocaleUpperCase() + aString.substring(1)

    return (
        <Container>
            <h1 className="text-center mt-4 mb-4">Add Employee</h1>
            <Form>
                <Row className="mb-2">
                    <Col md>
                        <Form.Group controlId='empFirstName'>
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" ref={first_name} name = "first_name"/>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId='empLastName'>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" ref={last_name} name = "last_name" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Form.Group controlId='empEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="example@abc.org" ref={email} name = "email"/>
                        <Form.Text muted>Email must be unique</Form.Text>
                    </Form.Group>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId='empGender'>
                            <Form.Label>Sex</Form.Label>
                            <Form.Select ref={gender} name = "gender">
                                <option>Select a sex</option>
                                {
                                    _genderOptions.map(sex => {
                                        return <option
                                            key={sex}
                                            value={sex}>
                                            {_capitalize(sex)}
                                        </option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group controlId='empSalary'>
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number" placeholder="$99,999" ref={salary} name = "salary"/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Form.Group>
                        {/* Save Button */}
                        <Button
                            variant="primary"
                            onClick={handleFormSubmit}
                            className="mr-2"
                        >
                            Save
                        </Button>

                        {/* Cancel Button */}
                        <Link to={Endpoints.employees.base}>
                            <Button
                                variant="outline-primary"
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                        </Link>
                    </Form.Group>
                </Row>
            </Form>
        </Container>
    )
}