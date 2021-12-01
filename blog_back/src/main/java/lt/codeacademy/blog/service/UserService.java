package lt.codeacademy.blog.service;

import lt.codeacademy.blog.data.User;
import lt.codeacademy.blog.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUsername(String username){
     return userRepository.findByUsername(username);
    }

    public void save(User user) {
            userRepository.save(user);
    }
}