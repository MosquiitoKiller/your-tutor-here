import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Row, Stack} from 'react-bootstrap';
import validator from "validator";
const Login = () => {
    let navigate = useNavigate();
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }
    const findFormErrors = () => {
        const {  email, password   } = form
        const newErrors = {}
        if ( !email || email === '' ) newErrors.email = 'Пожалуйста заполните данное поле'
        if ( !password || password === '') newErrors.password = 'Пожалуйста заполните данное поле'
        return newErrors
    }
    const onSubmitLogin = async e => {
        e.preventDefault();
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            try {
                const body = {username: form.email, password: form.password};
                console.log(body);
                const response = await axios.post("http://localhost:8080/api/auth/login", {
                    email: body.username,
                    password: body.password
                }).then(response => {
                    console.log(response);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    navigate("/profile")
                })
            } catch (err) {
                if (err.response.data === "Неправильный ввод данных"){
                    const {  email, password   } = form
                    const newErrors = {}
                    newErrors.login = err.response.data
                    setErrors(newErrors)
                }
            }
        }
    };
    return (
        <Container fluid  className="vh-100 d-flex flex-column " style={{marginTop: '50px'}}>
            <Row className="align-items-center justify-content-center" md="auto" xs="auto" xl="auto">
                <Col md="auto" xs="auto">
                    <div  className="login">
                        <Stack gap={1} className="mx-auto">
                            <h1 className="text-center mt-2" style={{color:"#2A2E34"}}>Войдите в систему</h1>
                            <h5 className="text-center mt-2" style={{color:'red'}}>{errors.login}</h5>
                            <Form className="mt-1" onSubmit={onSubmitLogin} noValidate >
                                <Stack gap={1}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label >Почта</Form.Label>
                                            <Form.Control type="email"
                                                          placeholder="Введите вашу почту"
                                                          isInvalid={errors.email }
                                                          onChange={ e => {
                                                              setField('email', e.target.value)
                                                          } } />
                                            <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label >Пароль</Form.Label>
                                            <Form.Control type="password"
                                                          placeholder="не менее 6 символов"
                                                          isInvalid={errors.password }
                                                          onChange={ e => setField('password', e.target.value) } />
                                            <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button className="btn btn-success" type="submit">Войти</Button>
                                </Stack>
                            </Form>
                            {/*<p onClick={() => redirectToRegistration()} style={{color:"blue"}}>Зарегистрироваться</p>*/}
                            <Link to="/registration" className="text-center">Еще нет аккаунта?</Link>
                        </Stack>
                    </div>
                </Col>
            </Row>
        </Container>

    );
};

export default Login;