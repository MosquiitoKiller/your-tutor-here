import {Button, Table} from "react-bootstrap";
import React from "react";
import {useHistory, useNavigate} from "react-router-dom";

const RequestCard = (props) => {

    return(
        <div className='request_card'>
            <h5>{props.firstname}</h5>
            <h5>{props.lastname}</h5>
            <h5>{props.middlename}</h5>
            <h5>{props.age}</h5>
            <h5>{props.town}</h5>
            <h5>{props.subject}</h5>
            <h5>{props.learnInHome}</h5>
            <h5>{props.learnInStudent}</h5>
            <h5>{props.remote}</h5>
            <h5>{props.text}</h5>
            <h5>{props.date}</h5>
        </div>
    )
}
export default RequestCard;