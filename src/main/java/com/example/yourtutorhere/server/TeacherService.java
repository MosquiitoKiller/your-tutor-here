package com.example.yourtutorhere.server;

import com.example.yourtutorhere.entities.Teacher;
import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.models.TeacherInput;
import com.example.yourtutorhere.repository.TeacherRepository;
import com.example.yourtutorhere.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TeacherService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    TeacherRepository teacherRepository;

    public List<User> getAll(){
        return userRepository.getAllByTeacherIsNotNull();
    }

    public Teacher getCurrentTeacher(){
        return teacherRepository.findTeacherByUserInfo(userRepository.findByEmail(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal())).get().getUserInfo());
    }
    public Teacher updateTeacher(TeacherInput teacher){
        System.out.println(teacher);
        Teacher teacher1 = getCurrentTeacher();
        teacher1.setAboutTeacher(teacher.getAboutTeacher());
        teacher1.setEducation(teacher.getEducation());
        teacher1.setPrice(teacher.getPrice());
        teacher1.setSubject(teacher.getSubject());
        teacher1.setRemote(teacher.isRemote());
        teacher1.setLearnInHome(teacher.isLearnInHome());
        teacher1.setLearnInStudent(teacher.isLearnInStudent());
        return teacherRepository.save(teacher1);
    }
    public User findById(ObjectId objectId){
        return userRepository.getUserByTeacherIsNotNullAndId(objectId);
    }
}
