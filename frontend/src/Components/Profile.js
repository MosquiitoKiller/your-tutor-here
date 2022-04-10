import React, {useEffect, useState} from "react";
import axios from "axios";
import avatar from "../Assets/userProfile.png"
import {
    Button, Card,
    Col,
    Container,
    Form,
    FormControl, Image,
    InputGroup,
    Modal,
    Row, Spinner, Stack
} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import validator from "validator";
function UpdateModalUser(props) {
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

        }
    }

    const findFormErrors = () => {
        const {  email, password, passwordConfirm, firstName, lastName, middleName, age, phone, city   } = form
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
                    city: response.data.userInfo.city,
                    email: response.data.email,
                    firstName: response.data.userInfo.firstName,
                    lastName: response.data.userInfo.lastName,
                    age: response.data.userInfo.age,
                    middleName: response.data.userInfo.middleName,
                    phone: response.data.userInfo.phone
                })
                console.log(form)
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
            <Form className="mt-1" onSubmit={handleSubmit} noValidate >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Обновление личных данных
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Введите ваши новые данные</h4>
                    <Container>
                        <Stack gap={1}>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label >Почта</Form.Label>
                                    <Form.Control type="email"
                                                  placeholder="Введите вашу почту"
                                                  value={form.email}
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
                                                  value={form.firstName}
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
                                                  value={form.lastName}
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
                                                  value={form.middleName}
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
                                                  value={form.age}
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
                                                  value={form.phone}
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
                                                  value={form.city}
                                                  onChange={ e => setField('city', e.target.value) }  />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        </Stack>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
const UserProfile = () => {
    const [user, setUser] = useState("");
    const [teacher, setTeacher] = useState({});
    const [modalShow, setModalShow] = React.useState(false);
    const [ loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const getUser = async () => {
        console.log("dasdsadasd");
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            console.log("dasdsadasd");
            await axios.get("http://localhost:8080/api/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                console.log(response.data);
                setUser(response.data.userInfo);
                setLoading(false)
            })
        } catch (err) {
            console.log("dasdsadasd");
            console.error(err.message);
        }
    };
    const getTeacher = async () => {
        console.log("dasdsadasd");
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            console.log("dasdsadasd");
            await axios.get("http://localhost:8080/api/teacher/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                console.log(response.data);
                setTeacher(response.data);
                setLoading(false)
            })
        } catch (err) {
            console.log("dasdsadasd");
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUser();
        getTeacher();
    }, []);
    return(
        <Container  className="mb-3 mt-3">
            <Row  className="mb-3 mt-3">
                <Col>
                    <Card className="d-flex flex-column align-items-center login">
                        <h1 className="text-center">Карточка учителя</h1>
                        {loading ? <Spinner animation="border" style={{ width: '300', height: '300' }}/> :  <Image src={teacher.img} roundedCircle width={300} height={300}/>}
                        <Card.Body>
                            <Stack gap={1}>
                                <Row className="mb-2">
                                    <Form.Label>Отметьте варианты проведения ваших занятий</Form.Label>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Check
                                            label="Дома"
                                            checked={teacher.learnInHome}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Check
                                            label="У ученика"
                                            checked={teacher.learnInStudent}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Check
                                            label="Удаленно"
                                            checked={teacher.remote}
                                            disabled
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Предмет, который преподаете</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="Название предмета"
                                                      value={teacher.subject }
                                                      disabled />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Цена занятий с вами</Form.Label>
                                        <Form.Control type="number"
                                                      placeholder="Введите цену в рублях"
                                                      value={teacher.price }
                                                      disabled />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Ваше образование</Form.Label>
                                        <Form.Control type="text" as="textarea"
                                                      placeholder="Введите ваше образование"
                                                      rows="3"
                                                      value={teacher.education}
                                                      disabled/>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Немного о вас</Form.Label>
                                        <Form.Control type="text" as="textarea"
                                                      placeholder="Введите информацию о себе"
                                                      rows="5"
                                                      value={teacher.aboutTeacher }
                                                      disabled />
                                    </Form.Group>
                                </Row>
                                <Button variant="dark" className="justify-content-center" onClick={() => setModalShow(true)}>Редактировать</Button>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="d-flex flex-column align-items-center login">
                        <Row>
                            <h1 className="text-center">Информация о пользователе</h1>
                            <Col>
                                <Form.Label htmlFor="basic-url">Имя</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder="Ваше имя" value = {user.firstName} disabled/>
                                </InputGroup>
                                <Form.Label htmlFor="basic-url2">Отчетство</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url2" aria-describedby="basic-addon3" placeholder="Ваше отчество" value = {user.middleName} disabled/>
                                </InputGroup>
                                <Form.Label htmlFor="basic-url2">Возраст</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url2" aria-describedby="basic-addon3" placeholder="Ваш возраст" value = {user.age} disabled/>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="basic-url">Фамилия</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder="Ваша фамилия" value = {user.lastName} disabled/>
                                </InputGroup>
                                <Form.Label htmlFor="basic-url4">Город проживания</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url4" aria-describedby="basic-addon3" placeholder="Ваш город" value = {user.town} disabled/>
                                </InputGroup>
                                <Form.Label htmlFor="basic-url2">Номер телефона</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url2" aria-describedby="basic-addon3" placeholder="Ваш номер телефона" value = {user.phone} disabled/>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Form.Label>Отметьте варианты связи с вами</Form.Label>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Check
                                    label="telegram"
                                    checked={user.telegram}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Check
                                    label="whatsApp"
                                    checked={user.whatsApp}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Check
                                    label="viber"
                                    checked={user.viber}
                                    disabled
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Button variant="dark" className="justify-content-center" onClick={() => setModalShow(true)}>Редактировать</Button>
                        </Row>
                        <UpdateModalUser
                            show={modalShow}
                            onHide={() => setModalShow(false)}/>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default UserProfile;