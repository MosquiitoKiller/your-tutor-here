import {Button, Table} from "react-bootstrap";
import React from "react";
import {useHistory, useNavigate} from "react-router-dom";

const TeacherCard = (props) => {
    let navigate = useNavigate();

    return(
        <div className='teacher_card'>
            <h5>{props.img}</h5>
            <h5>{props.firstname}</h5>
            <h5>{props.lastname}</h5>
            <h5>{props.middlename}</h5>
            <h5>{props.age}</h5>
            <h5>{props.town}</h5>
            <h5>{props.education}</h5>
            <h5>{props.subject}</h5>
            <Button className="btn btn-success" onClick={() => navigate("/teachers/"+teacher.id,{teacher})}>Подробнее</Button>
        </div>
    )
}
export default TeacherCard;