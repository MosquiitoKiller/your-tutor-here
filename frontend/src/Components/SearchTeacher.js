import {Link, useHistory, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";
import Teachers from "./TeacherCard";
import TeacherCard from "./TeacherCard";

const SearchTeacher = () => {
    let navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const getTeachers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/teachers");
            const jsonData = await response.data;
            setTeachers(jsonData);
            console.log(response)
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTeachers();
    }, []);

    return (
        <div className="teacher">
            {teachers.map(teacher => (
                <TeacherCard teacher={teacher} />
            ))}
        </div>
    );
};

export default SearchTeacher;
