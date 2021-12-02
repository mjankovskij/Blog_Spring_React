package lt.codeacademy.blog.controller;

import static lt.codeacademy.blog.ApiPath.*;

import lt.codeacademy.blog.data.Blog;
import lt.codeacademy.blog.service.BlogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(ROOT + "/blog")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping(value = "/get", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Blog> getBlogs() {
        return blogService.findAll();
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Blog getBlog(@PathVariable UUID id) {
        return blogService.getById(id);
    }

    @PutMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void saveBlog(@RequestBody Blog blog) {
        blogService.save(blog);
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBlog(@PathVariable UUID id) {
        blogService.delete(id);
    }

}