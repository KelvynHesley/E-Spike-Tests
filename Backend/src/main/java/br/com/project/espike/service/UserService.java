package br.com.project.espike.service;


import br.com.project.espike.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    User addUser(User user);
    User getUserById(Long id);
    List<User> getUsers();
    void deleteUser(Long id);
    User updateUser(User user);
    User getUserByEmail(String email);
    void deleteUserByEmail(String email);
}
