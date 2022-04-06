import {Link, useHistory, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";
import TeacherCard from "./TeacherCard";
import RequestCard from "./RequestCard";

const SearchRequest = () => {
    let navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const getRequests = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/requests");
            const jsonData = await response.data;
            setRequests(jsonData);
            console.log(response)
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getRequests();
    }, []);

    return (
        <div className="request">
            {requests.map(request => (
                <RequestCard request={request} />
            ))}
        </div>
    );
};

export default SearchRequest;
