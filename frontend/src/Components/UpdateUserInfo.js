import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import axios from "axios";
import {Button, Col, Container, Form, Modal, Row, Spinner, Stack} from "react-bootstrap";

function UpdateUserInfo(props) {
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})
    const [ loading, setLoading] = useState(true)
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
                    town: form.town,
                    telegram: form.telegram,
                    viber: form.viber,
                    whatsApp: form.whatsApp,
                };
                console.log({
                    userInfo: body
                })
                let token = JSON.parse(localStorage.getItem("user"));
                await axios.post("http://localhost:8080/api/user/info",
                    body,{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }});
                props.onHide()
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const findFormErrors = () => {
        const {  email, password, passwordConfirm, firstName, lastName, middleName, age, phone, town   } = form
        const newErrors = {}
        if ( !email || email === '' ) newErrors.email = '???????????????????? ?????????????????? ???????????? ????????'
        else if ( !validator.isEmail(email) ) newErrors.email = '?????????? ???????????? ?????????????????? ?????????????????????? ???????????? "@"'
        if ( !passwordConfirm || passwordConfirm === '' || passwordConfirm.length <= 6) newErrors.passwordConfirm = '???????????? ???????????? ???????? ???????????? 6 ????????????????'
        else if (passwordConfirm !== password) newErrors.passwordConfirm = '???????????? ???? ??????????????????'
        if ( !password || password === '' || password.length <= 6) newErrors.password = '???????????? ???????????? ???????? ???????????? 6 ????????????????'
        if ( !age || age === ''|| age < 8 || age > 150 ) newErrors.age = '???????????????????? ?????????????????? ???????????? ????????'
        if (!firstName || firstName === '') newErrors.firstName = '???????????????????? ?????????????????? ???????????? ????????'
        if (!middleName || middleName === '') newErrors.middleName = '???????????????????? ?????????????????? ???????????? ????????'
        if (!lastName || lastName === '') newErrors.lastName = '???????????????????? ?????????????????? ???????????? ????????'
        if (!town || town === '') newErrors.city = '???????????????????? ?????????????????? ???????????? ????????'
        if (!phone || phone === '') newErrors.phone = '???????????????????? ?????????????????? ???????????? ????????'
        return newErrors
    }
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                console.log(response.data)
                setForm({
                    town: response.data.userInfo.town,
                    email: response.data.email,
                    firstName: response.data.userInfo.firstName,
                    lastName: response.data.userInfo.lastName,
                    age: response.data.userInfo.age,
                    middleName: response.data.userInfo.middleName,
                    telegram: response.data.userInfo.telegram,
                    viber: response.data.userInfo.viber,
                    whatsApp: response.data.userInfo.whatsApp,
                    phone: response.data.userInfo.phone,
                })
                console.log(form)
                setLoading(false)
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {loading ? <Spinner animation="border" style={{width: '300', height: '300'}}/> :
                <Form className="mt-1" onSubmit={handleSubmit} noValidate>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            ???????????????????? ???????????? ????????????
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>?????????????? ???????? ?????????? ????????????</h4>
                        <Container>
                            <Stack gap={1}>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>??????????</Form.Label>
                                        <Form.Control type="email"
                                                      placeholder="?????????????? ???????? ??????????"
                                                      value={form.email}
                                                      isInvalid={errors.email}
                                                      onChange={e => {
                                                          setField('email', e.target.value)
                                                      }}/>
                                        <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>????????????</Form.Label>
                                        <Form.Control type="password"
                                                      placeholder="???? ?????????? 6 ????????????????"
                                                      isInvalid={errors.password}
                                                      onChange={e => setField('password', e.target.value)}/>
                                        <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>?????????????????? ????????????</Form.Label>
                                        <Form.Control type="password"
                                                      placeholder="?????????????????? ????????????"
                                                      isInvalid={errors.passwordConfirm}
                                                      onChange={e => setField('passwordConfirm', e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">
                                            ???????????? ???? ??????????????????
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>??????</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="?????????????? ???????? ??????"
                                                      isInvalid={errors.firstName}
                                                      value={form.firstName}
                                                      onChange={e => setField('firstName', e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">
                                            ???????????????????? ?????????????????? ???????????? ????????
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>??????????????</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="?????????????? ???????? ??????????????"
                                                      isInvalid={errors.lastName}
                                                      value={form.lastName}
                                                      onChange={e => setField('lastName', e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>????????????????</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="?????????????? ???????? ??????????????????"
                                                      isInvalid={errors.middleName}
                                                      value={form.middleName}
                                                      onChange={e => setField('middleName', e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.middleName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>??????????????</Form.Label>
                                        <Form.Control type="number"
                                                      placeholder="?????????????? ?????? ??????????????"
                                                      isInvalid={errors.age}
                                                      value={form.age}
                                                      onChange={e => setField('age', e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.age}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>?????????? ????????????????</Form.Label>
                                        <Form.Control type="number"
                                                      placeholder="?????????????? ?????? ??????????"
                                                      isInvalid={errors.phone}
                                                      value={form.phone}
                                                      onChange={e => setField('phone', e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="validationCustom05">
                                        <Form.Label>?????? ??????????</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="?????????????? ???????????????? ????????????"
                                                      isInvalid={errors.town}
                                                      value={form.town}
                                                      onChange={e => setField('town', e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.town}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Label>???????????????? ???????????????? ?????????? ?? ????????</Form.Label>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Check
                                            label="telegram"
                                            defaultChecked={form.telegram}
                                            onChange={e => setField('telegram', e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Check
                                            label="whatsApp"
                                            defaultChecked={form.whatsApp}
                                            onChange={e => setField('whatsApp', e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Check
                                            label="viber"
                                            defaultChecked={form.viber}
                                            onChange={e => setField('viber', e.target.value)}/>
                                    </Form.Group>
                                </Row>
                            </Stack>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            ??????????????????????
                        </Button>
                    </Modal.Footer>
                </Form>
            }
        </Modal>
    );
}
export default UpdateUserInfo;