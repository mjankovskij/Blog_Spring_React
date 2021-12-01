package lt.codeacademy.blog.repository;

import lt.codeacademy.blog.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUsername(String username);
}