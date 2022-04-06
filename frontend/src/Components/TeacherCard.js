import {Button, Table} from "react-bootstrap";
import React from "react";
import {useHistory, useNavigate} from "react-router-dom";

const TeacherCard = (props) => {
    let navigate = useNavigate();

    return(
        <div className='teacher_card'>
            <h5>{props.teacher.teacher.img}</h5>
            <h5>{props.teacher.userInfo.firstName}</h5>
            <h5>{props.teacher.userInfo.lastName}</h5>
            <h5>{props.teacher.userInfo.middleName}</h5>
            <h5>{props.teacher.userInfo.age}</h5>
            <h5>{props.teacher.userInfo.town}</h5>
            <h5>{props.teacher.teacher.education}</h5>
            <h5>{props.teacher.teacher.subject}</h5>
            <Button className="btn btn-success" onClick={() => navigate("/teachers/"+props.teacher.id,{props})}>Подробнее</Button>
        </div>
    )
}
export default TeacherCard;