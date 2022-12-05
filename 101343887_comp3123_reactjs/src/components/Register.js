import React from 'react'
import Axios from "axios";
import Endpoints from "../constants/url";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

export default
function RegisterForm() {
    
    const userR = React.useRef()
    const emailR = React.useRef();
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
        const signupEndpoint = `${Endpoints.base}${Endpoints.user.base}${Endpoints.user.signUp}`
        
        // Allow logging in by username/email, and password
        const newUserObj = { username: user, email: user, password: password }
    
        try {
            await Axios.post(
                signupEndpoint,
                JSON.stringify(newUserObj),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        
            setUser("")
            setPassword("")
            setSuccess(true)
        } catch (e) {
            if (!e?.response) {
                setErrorMessage('No Server Response')
            } else if (e.response?.status === 400) {
                setErrorMessage('Please check if username/email/password is correct in proper format')
            } else {
                setErrorMessage('Register Failed')
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
                            <h1 className="text-center mt-4 mb-4">You're Registered!</h1>
                            <p className="text-center mb-4">
                                <Link to={"/"}>
                                    <Button variant='primary'>Go to Login</Button>
                                </Link>
                            </p>
                        </Card>
                    </Container>
                ) : (
                    <Container>
                        <h1 className="text-center mt-4 mb-4">Register an Account</h1>
                        <p className="text-center mt-4 mb-4" ref={errorR} style={{color: 'red'}} aria-live="assertive">
                            {errorMessage}
                        </p>
                        <Form>
                            <Card className="p-3">
                                <Row className="mb-2">
                                        <Form.Group controlId='username'>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type='text'
                                                ref={userR}
                                                autoComplete='off'
                                                required={true}
                                                onChange={(e) => setUser(e.target.value)}
                                                aria-describedby="usernameHelpBlock"
                                            />
                                            <Form.Text
                                                muted
                                                id="usernameHelpBlock"
                                            >
                                                
                                            </Form.Text>
                                        </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                        <Form.Group controlId='email'>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type='text'
                                                ref={emailR}
                                                autoComplete='off'
                                                required={true}
                                                onChange={(e) => setUser(e.target.value)}
                                                aria-describedby="usernameHelpBlock"
                                            />
                                            <Form.Text
                                                muted
                                                id="usernameHelpBlock"
                                            >
                                                
                                            </Form.Text>
                                        </Form.Group>
                                </Row>
                                <Row>
                                    <Col md>
                                        <Form.Group controlId='password'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type='password'
                                                value={password}
                                                required={true}
                                                onChange={(e) => setPassword(e.target.value)}
                                                aria-describedby="passwordHelpBlock"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Your password must contain at least 1 lower case, 1 numeric digit,
                                        1 special character, and minimum length of 8
                                    </Form.Text>
                                </Row>
            
                                <Row className="mb-2">
                                    <Col md>
                                        <Button
                                            variant="primary"
                                            onClick={handleSubmit}
                                            className="mr-2"
                                        >
                                            Register
                                        </Button>
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