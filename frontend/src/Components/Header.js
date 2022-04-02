import {NavLink} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
function Header(){
    return(
        <header className='header' style={{backgroundColor: "lightgoldenrodyellow"}}>
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Nav.Link as={NavLink} className="navLink" to="/"><h2>Название</h2></Nav.Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} className="navLink" to="/workers" style={({ isActive }) =>
                                isActive
                                    ? {
                                        color: '#fff',
                                        background: 'orange'
                                    }
                                    : { color: 'green'}}
                            ><h5>Работники</h5></Nav.Link>
                            <Nav.Link as={NavLink} className="navLink" to="/tasks" style={({ isActive }) =>
                                isActive
                                    ? {
                                        color: '#fff',
                                        background: 'orange'
                                    }
                                    : { color: 'green'}}
                            ><h5>Задания</h5></Nav.Link>
                        </Nav>
                        {localStorage.getItem("user") === null &&
                            <Nav>
                                <Nav.Link as={NavLink} className="navLink" to="/login" style={({ isActive }) =>
                                    isActive
                                        ? {
                                            color: '#fff',
                                            background: 'orange'
                                        }
                                        : { color: 'green'}}
                                ><h5>Войти</h5></Nav.Link>
                                <Nav.Link as={NavLink} className="navLink" to="/registration" style={({ isActive }) =>
                                    isActive
                                        ? {
                                            color: '#fff',
                                            background: 'orange'
                                        }
                                        : { color: 'green'}}
                                ><h5>Регистрация</h5></Nav.Link>
                            </Nav>
                        }
                        {localStorage.getItem("user") !== null &&
                            <Nav>
                                <Nav.Link as={NavLink} className="navLink" to="/profile" style={({ isActive }) =>
                                    isActive
                                        ? {
                                            color: '#fff',
                                            background: 'orange'
                                        }
                                        : { color: 'green'}}
                                ><h5>Личный кабинет</h5></Nav.Link>
                                <Nav.Link as={NavLink} className="navLink" to="/logout" style={({ isActive }) =>
                                    isActive
                                        ? {
                                            color: '#fff',
                                            background: 'orange'
                                        }
                                        : { color: 'red'}}
                                ><h5>Выйти</h5></Nav.Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
export default Header;