package lt.codeacademy.blog.repository;

import lt.codeacademy.blog.entity.Role;
import lt.codeacademy.blog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    public Role findByName(String name);
}