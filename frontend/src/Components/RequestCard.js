import {Button, Table} from "react-bootstrap";
import React from "react";
import {useHistory, useNavigate} from "react-router-dom";

const RequestCard = (props) => {

    return(
        <div className='request_card'>
            <h5>{props.request.firstname}</h5>
            <h5>{props.lastname}</h5>
            <h5>{props.middlename}</h5>
            <h5>{props.age}</h5>
            <h5>{props.town}</h5>
            <h5>{props.request.subject}</h5>
            <h5>{props.request.learnInHome}</h5>
            <h5>{props.request.learnInStudent}</h5>
            <h5>{props.request.remote}</h5>
            <h5>{props.request.text}</h5>
            <h5>{props.request.date}</h5>
        </div>
    )
}
export default RequestCard;