package lt.codeacademy.blog.repository;

import lt.codeacademy.blog.data.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BlogRepository extends JpaRepository<Blog, UUID> {
    List<Blog> findAllByOrderByDatetimeDesc();
}