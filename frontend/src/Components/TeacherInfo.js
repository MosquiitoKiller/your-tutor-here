import React from "react"
import {useParams} from "react-router-dom"

const TeacherInfo = (props) => {
    return(
        <div className='teacher_info'>
            <h5>{props.img}</h5>
            <h5>{props.firstname}</h5>
            <h5>{props.lastname}</h5>
            <h5>{props.middlename}</h5>
            <h5>{props.age}</h5>
            <h5>{props.town}</h5>
            <h5>{props.education}</h5>
            <h5>{props.subject}</h5>
            <h5>{props.learnInHome}</h5>
            <h5>{props.learnInStudent}</h5>
            <h5>{props.remote}</h5>
            <h5>{props.viber}</h5>
            <h5>{props.telegram}</h5>
            <h5>{props.whatsApp}</h5>
            <h5>{props.aboutTeacher}</h5>
        </div>
    )
}

export default TeacherInfo