import React from 'react'
import AuthContext from "../authContext/authProvider";
import Axios from "axios";
import Endpoints from "../constants/url";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

export default function LoginForm() {
    const { setAuth } = React.useContext(AuthContext)
    
    const userR = React.useRef()
    const errorR = React.useRef()
    
    const [user, setUser] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")
    const [success, setSuccess] = React.useState(false)
    
    React.useEffect(() => {
        setErrorMessage("")
    }, [user, password])
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const loginEndpoint = `${Endpoints.base}${Endpoints.user.base}${Endpoints.user.login}`
        // Allow logging in by username, and password
        const userObj = { username: user, password: password }
        
        try {
            await Axios.post(
                loginEndpoint,
                JSON.stringify(userObj),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            
            setAuth({user, password})
            setUser("")
            setPassword("")
            setSuccess(true)
        } catch (e) {
            if (!e?.response) {
                setErrorMessage('No Server Response')
            } else if (e.response?.status === 400) {
                setErrorMessage('Missing Username or Password')
            } else if (e.response?.status === 401) {
                setErrorMessage('Unauthorized')
            } else {
                setErrorMessage('Login Failed')
            }
            errorR.current.focus() // For screen-reader
        }
    }
    
    return (
        <>
            {
                success ? (
                    <Container>
                        <Card className="p-3 mt-4">
                            <h1 className="text-center mt-4 mb-4">You're Logged In!</h1>
                            <p className="text-center mb-4">
                                <Link to={Endpoints.employees.base}>
                                    <Button variant='primary'>Go to Main Page</Button>
                                </Link>
                            </p>
                        </Card>
                    </Container>
                ) : (
                    <Container>
                        <h1 className="text-center mt-4 mb-4">Sign In</h1>
                        <p className="text-center mt-4 mb-4" ref={errorR} style={{color: 'red'}} aria-live="assertive">
                            {errorMessage}
                        </p>
                        <Form>
                            <Card className="p-3">
                                <Row className="mb-2">
                                    <Col md>
                                        <Form.Group controlId='username'>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type='text'
                                                ref={userR}
                                                autoComplete='off'
                                                required={true}
                                                onChange={(e) => setUser(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md>
                                        <Form.Group controlId='password'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type='password'
                                                value={password}
                                                required={true}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
    
                                <Row className="mb-2">
                                    <Col md>
                                        <Button
                                            variant="primary"
                                            onClick={handleSubmit}
                                            className="mr-2"
                                        >
                                            Sign In
                                        </Button>
                                    </Col>
                                    <Col md>
                                        <p>Need an Account?
                                            <span>
                                            <Link to={Endpoints.user.signUp}>
                                                <Button variant="link" size="sm">Sign Up</Button>
                                            </Link>
                                        </span>
                                        </p>
                                    </Col>
                                </Row>
                            </Card>
                        </Form>
                    </Container>
                )
            }
        </>
    )
}