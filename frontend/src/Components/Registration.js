import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Row, Stack, Form, Nav, Tab} from 'react-bootstrap';
import validator from 'validator'
function Registartion(){

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

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            try {
                const body = {
                    password: form.password,
                    firstName: form.firstName,
                    middleName: form.middleName,
                    lastName: form.lastName,
                    age: form.age,
                    phone: form.phone,
                    email: form.email,
                    town: form.city,
                    telegram: form.telegram,
                    viber: form.viber,
                    whatsApp: form.whatsApp,
                    teacher: form.teacher,
                    teacherInput:{
                        learnInHome: form.learnInHome ,
                        learnInStudent: form.learnInStudent,
                        remote: form.remote,
                        education: form.education,
                        subject: form.subject,
                        price: form.price,
                        aboutTeacher: form.aboutTeacher,
                        img: form.avatar
                    }
                };
                console.log({
                    userInfo: body
                })
                await axios.post("http://localhost:8080/api/auth/register",
                    body,{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                navigate("/login")
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const findFormErrors = () => {
        const {  email, password, passwordConfirm, firstName, lastName, middleName, age, phone, city, teacher,  education, subject, price, aboutTeacher} = form
        const newErrors = {}
        if ( !email || email === '' ) newErrors.email = 'Пожалуйста заполните данное поле'
        else if ( !validator.isEmail(email) ) newErrors.email = 'Адрес должен содержать специальный символ "@"'
        if ( !passwordConfirm || passwordConfirm === '' || passwordConfirm.length <= 6) newErrors.passwordConfirm = 'Пароль должен быть больше 6 символов'
        else if (passwordConfirm !== password) newErrors.passwordConfirm = 'Пароли не совпадают'
        if ( !password || password === '' || password.length <= 6) newErrors.password = 'Пароль должен быть больше 6 символов'
        if ( !age || age === ''|| age < 8 || age > 150 ) newErrors.age = 'Пожалуйста заполните данное поле'
        if (!firstName || firstName === '') newErrors.firstName = 'Пожалуйста заполните данное поле'
        if (!middleName || middleName === '') newErrors.middleName = 'Пожалуйста заполните данное поле'
        if (!lastName || lastName === '') newErrors.lastName = 'Пожалуйста заполните данное поле'
        if (!city || city === '') newErrors.city = 'Пожалуйста заполните данное поле'
        if (!phone || phone === '') newErrors.phone = 'Пожалуйста заполните данное поле'
        if ((!education || education === '') && teacher === true) newErrors.education = 'Пожалуйста заполните данное поле'
        if ((!subject || subject === '') && teacher === true) newErrors.subject = 'Пожалуйста заполните данное поле'
        if ((!price || price === '') && teacher === true) newErrors.price = 'Пожалуйста заполните данное поле'
        if ((!aboutTeacher || aboutTeacher === '') && teacher === true) newErrors.aboutTeacher = 'Пожалуйста заполните данное поле'
        return newErrors
    }

    return (
        <Container style={{marginTop: '20px'}}>
            <Row className="justify-content-center" md="auto" xs="auto" xl="auto">
                <Col md="auto" xs="auto">
                    <div  className="login">
                        <Stack gap={1} >
                            <h1 className="text-center mt-1">Создайте аккаунт</h1>
                            <Form className="mt-1" onSubmit={handleSubmit} noValidate >
                                <Stack gap={1}>
                                    <Row className="mb-2">
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
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label >Пароль</Form.Label>
                                            <Form.Control type="password"
                                                          placeholder="не менее 6 символов"
                                                          isInvalid={errors.password }
                                                          onChange={ e => setField('password', e.target.value) } />
                                            <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Повторите пароль</Form.Label>
                                            <Form.Control type="password"
                                                          placeholder="Повторите пароль"
                                                          isInvalid={errors.passwordConfirm }
                                                          onChange={ e => setField('passwordConfirm', e.target.value) } />
                                            <Form.Control.Feedback type="invalid">
                                                Пароли не совпадают
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label >Имя</Form.Label>
                                            <Form.Control type="text"
                                                          placeholder="Введите ваше имя"
                                                          isInvalid={errors.firstName }
                                                          onChange={ e => setField('firstName', e.target.value) } />
                                            <Form.Control.Feedback type="invalid">
                                                Пожалуйста заполните данное поле
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label >Фамилия</Form.Label>
                                            <Form.Control type="text"
                                                          placeholder="введите вашу фамилию"
                                                          isInvalid={errors.lastName }
                                                          onChange={ e => setField('lastName', e.target.value) }  />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.lastName}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Отчество</Form.Label>
                                            <Form.Control type="text"
                                                          placeholder="введите ваше отчетство"
                                                          isInvalid={errors.middleName }
                                                          onChange={ e => setField('middleName', e.target.value) } />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.middleName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label >Возраст</Form.Label>
                                            <Form.Control type="number"
                                                          placeholder="Введите ваш возраст"
                                                          isInvalid={errors.age }
                                                          onChange={ e => setField('age', e.target.value) }  />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.age}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label >Номер телефона</Form.Label>
                                            <Form.Control type="number"
                                                          placeholder="Введите ваш номер"
                                                          isInvalid={errors.phone }
                                                          onChange={ e => setField('phone', e.target.value) }  />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="validationCustom05">
                                            <Form.Label>Ваш город</Form.Label>
                                            <Form.Control type="text"
                                                          placeholder="Введите название города"
                                                          isInvalid={errors.city }
                                                          onChange={ e => setField('city', e.target.value) }  />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.city}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Label>Отметьте варианты связи с вами</Form.Label>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Check
                                                label="telegram"
                                                onChange={ e => setField('telegram', e.target.checked) }  />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Check
                                                label="whatsApp"
                                                onChange={ e => setField('whatsApp', e.target.checked) }  />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Check
                                                label="viber"
                                                onChange={ e => setField('viber', e.target.checked) }  />
                                        </Form.Group>
                                    </Row>
                                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                        <Row>
                                            <Nav variant="pills">
                                                <Col>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="first" onSelect={()=>setField('teacher', false)}>Ученик</Nav.Link>
                                                    </Nav.Item>
                                                </Col>
                                                <Col>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="second" onClick={()=>setField('teacher', true)}>Учитель</Nav.Link>
                                                    </Nav.Item>
                                                </Col>
                                            </Nav>
                                        </Row>
                                        <Row>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="first">
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <Row className="mb-2">
                                                        <Form.Label>Отметьте варианты проведения ваших занятий</Form.Label>
                                                        <Form.Group as={Col} controlId="formGridEmail">
                                                            <Form.Check
                                                                label="Дома"
                                                                onChange={ e => setField('learnInHome', e.target.value) }  />
                                                        </Form.Group>

                                                        <Form.Group as={Col} controlId="formGridPassword">
                                                            <Form.Check
                                                                label="У ученика"
                                                                onChange={ e => setField('learnInStudent', e.target.value) }  />
                                                        </Form.Group>

                                                        <Form.Group as={Col} controlId="formGridPassword">
                                                            <Form.Check
                                                                label="Удаленно"
                                                                onChange={ e => setField('remote', e.target.value) }  />
                                                        </Form.Group>
                                                    </Row>

                                                    <Row className="mb-2">
                                                        <Form.Group as={Col} controlId="formGridEmail">
                                                            <Form.Label >Предмет, который преподаете</Form.Label>
                                                            <Form.Control type="text"
                                                                          placeholder="Введите название предмета"
                                                                          isInvalid={errors.subject }
                                                                          onChange={ e => {
                                                                              setField('subject', e.target.value)
                                                                          } } />
                                                            <Form.Control.Feedback type='invalid'>{ errors.subject }</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-2">
                                                        <Form.Group as={Col} controlId="formGridEmail">
                                                            <Form.Label >Цена занятий с вами</Form.Label>
                                                            <Form.Control type="number"
                                                                          placeholder="Введите цену в рублях"
                                                                          isInvalid={errors.price }
                                                                          onChange={ e => {
                                                                              setField('price', e.target.value)
                                                                          } } />
                                                            <Form.Control.Feedback type='invalid'>{ errors.price }</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-2">
                                                        <Form.Group as={Col} controlId="formGridEmail">
                                                            <Form.Label >Ваше образование</Form.Label>
                                                            <Form.Control type="text" as="textarea"
                                                                          placeholder="Введите ваше образование"
                                                                          rows="3"
                                                                          isInvalid={errors.education }
                                                                          onChange={ e => {
                                                                              setField('education', e.target.value)
                                                                          } } />
                                                            <Form.Control.Feedback type='invalid'>{ errors.education }</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-2">
                                                        <Form.Group as={Col} controlId="formGridEmail">
                                                            <Form.Label >Немного о вас</Form.Label>
                                                            <Form.Control type="text" as="textarea"
                                                                          placeholder="Введите информацию о себе"
                                                                          rows="5"
                                                                          isInvalid={errors.aboutTeacher }
                                                                          onChange={ e => {
                                                                              setField('aboutTeacher', e.target.value)
                                                                          } } />
                                                            <Form.Control.Feedback type='invalid'>{ errors.aboutTeacher }</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group controlId="formFile" className="mb-3">
                                                            <Form.Label>Ваше изображение</Form.Label>
                                                            <Form.Control type="file"
                                                                          accept="image/*"
                                                                //value={avatar}
                                                                          onChange={e => setField('avatar', e.target.files[0]) }
                                                                          required
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    {form.avatar && (
                                                        <div>
                                                            <img
                                                                src={URL.createObjectURL(form.avatar)}
                                                                alt="Thumb"
                                                            />
                                                        </div>
                                                    )}
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Row>
                                    </Tab.Container>
                                    <Button className="btn btn-success"  type="submit">Создать аккаунт</Button>
                                </Stack>
                            </Form>
                            <Link to="/login" className="text-center">Уже есть аккаунт?</Link>
                        </Stack>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}
export default Registartion;