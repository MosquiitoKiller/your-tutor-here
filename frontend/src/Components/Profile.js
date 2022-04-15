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
import UpdateUserInfo from "./UpdateUserInfo";
import UpdateTeacherInfo from "./UpdateTeacherInfo";

const UserProfile = () => {
    const [user, setUser] = useState("");
    const [teacher, setTeacher] = useState({});
    const [modalShow, setModalShow] = React.useState(false);
    const [modalTeacherShow, setModalTeacherShow] = React.useState(false);
    const [ loading, setLoading] = useState(true)
    const [isTeacher, setIsTeacher] = useState(false)
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
                setIsTeacher(response.data.roles.length > 1);
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
                {isTeacher &&
                    <Col>
                        <Card className="d-flex flex-column align-items-center login">
                            <h1 className="text-center">Карточка учителя</h1>
                            {loading ? <Spinner animation="border" style={{width: '300', height: '300'}}/> :
                                <Image src={teacher.img} roundedCircle width={300} height={300}/>}
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
                                            <Form.Label>Предмет, который преподаете</Form.Label>
                                            <Form.Control type="text"
                                                          placeholder="Название предмета"
                                                          value={teacher.subject}
                                                          disabled/>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Цена занятий с вами</Form.Label>
                                            <Form.Control type="number"
                                                          placeholder="Введите цену в рублях"
                                                          value={teacher.price}
                                                          disabled/>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Ваше образование</Form.Label>
                                            <Form.Control type="text" as="textarea"
                                                          placeholder="Введите ваше образование"
                                                          rows="3"
                                                          value={teacher.education}
                                                          disabled/>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Немного о вас</Form.Label>
                                            <Form.Control type="text" as="textarea"
                                                          placeholder="Введите информацию о себе"
                                                          rows="5"
                                                          value={teacher.aboutTeacher}
                                                          disabled/>
                                        </Form.Group>
                                    </Row>
                                    <Button variant="dark" className="justify-content-center"
                                            onClick={() => setModalTeacherShow(true)}>Редактировать</Button>
                                </Stack>
                                <UpdateTeacherInfo
                                    show={modalTeacherShow}
                                    onHide={() => {getTeacher(); setModalTeacherShow(false)}}/>
                            </Card.Body>
                        </Card>
                    </Col>
                }
                <Col>
                    <Row>
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
                            <UpdateUserInfo
                                show={modalShow}
                                onHide={() => {getUser(); setModalShow(false)}}/>
                        </Card>
                    </Row>
                    {isTeacher &&
                        <Row>
                            <Card className="d-flex flex-column align-items-center login mt-4">
                                <Row>
                                    <h1 className="text-center">Ваши согласия на выполнения заданий</h1>
                                </Row>
                            </Card>
                        </Row>
                    }
                    {!isTeacher &&
                        <Row>
                            <Card className="d-flex flex-column align-items-center login mt-4">
                                <Row>
                                    <h1 className="text-center">Ваши задания</h1>
                                </Row>
                            </Card>
                        </Row>
                    }
                </Col>
            </Row>
        </Container>
    )
}
export default UserProfile;