package lt.codeacademy.blog.service;

import lt.codeacademy.blog.data.Blog;
import lt.codeacademy.blog.exception.BlogNotFoundException;
import lt.codeacademy.blog.repository.BlogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BlogService {

    private final BlogRepository postRepository;

    public BlogService(BlogRepository postRepository) {
        this.postRepository = postRepository;
    }

    public void save(Blog post) {
        postRepository.save(post);
    }

    public void delete(UUID id) {
        postRepository.deleteById(postRepository.findById(id).orElseThrow(() -> new BlogNotFoundException(id)).getId());
    }

    public List<Blog> findAll() {
        return postRepository.findAll();
    }

    public Blog getById(UUID id) {
        return postRepository.findById(id).orElseThrow(() -> new BlogNotFoundException(id));
    }


}