import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import axios from "axios";
import {Button, Col, Container, Form, Modal, Row, Spinner, Stack} from "react-bootstrap";

function UpdateTeacherInfo(props) {
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
                    learnInHome: form.learnInHome ,
                    learnInStudent: form.learnInStudent,
                    remote: form.remote,
                    education: form.education,
                    subject: form.subject,
                    price: form.price,
                    aboutTeacher: form.aboutTeacher,
                    img: ''
                };
                console.log({
                    teacherInput: body
                })
                let token = JSON.parse(localStorage.getItem("user"));
                await axios.post("http://localhost:8080/api/teacher/info",
                    {teacherInput: body},{
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        }});
                props.onHide()
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const findFormErrors = () => {
        const {   education, subject, price, aboutTeacher } = form
        const newErrors = {}
        if ((!education || education === '')) newErrors.education = 'Пожалуйста заполните данное поле'
        if ((!subject || subject === '')) newErrors.subject = 'Пожалуйста заполните данное поле'
        if ((!price || price === '')) newErrors.price = 'Пожалуйста заполните данное поле'
        if ((!aboutTeacher || aboutTeacher === '')) newErrors.aboutTeacher = 'Пожалуйста заполните данное поле'
        return newErrors
    }
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/teacher/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                console.log(response.data)
                setForm({
                    learnInHome: response.data.learnInHome,
                    learnInStudent: response.data.learnInStudent,
                    remote: response.data.remote,
                    education: response.data.education,
                    subject: response.data.subject,
                    price: response.data.price,
                    aboutTeacher: response.data.aboutTeacher
                })
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
                            Обновление карточки преподавателя
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Введите ваши новые данные</h4>
                        <Container>
                            <Stack gap={1}>
                                <Row className="mb-2">
                                    <Form.Label>Отметьте варианты проведения ваших занятий</Form.Label>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Check
                                            label="Дома"
                                            defaultChecked={form.learnInHome}
                                            onChange={ e => setField('learnInHome', e.target.value) }  />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Check
                                            label="У ученика"
                                            defaultChecked={form.learnInStudent}
                                            onChange={ e => setField('learnInStudent', e.target.value) }  />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Check
                                            label="Удаленно"
                                            defaultChecked={form.remote}
                                            onChange={ e => setField('remote', e.target.value) }  />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Предмет, который преподаете</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="Введите название предмета"
                                                      isInvalid={errors.subject }
                                                      value={form.subject}
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
                                                      value={form.price}
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
                                                      value={form.education}
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
                                                      value={form.aboutTeacher}
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
                            </Stack>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </Form>
            }
        </Modal>
    );
}
export default UpdateTeacherInfo;