package lt.codeacademy.blog.controller;

import static lt.codeacademy.blog.ApiPath.*;

import lt.codeacademy.blog.data.Blog;
import lt.codeacademy.blog.data.Comment;
import lt.codeacademy.blog.data.User;
import lt.codeacademy.blog.service.BlogService;
import lt.codeacademy.blog.service.CommentService;
import lt.codeacademy.blog.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(ROOT + "/comment")
public class CommentController {

    private final CommentService commentService;
    private final BlogService blogService;
    private final UserService userService;

    public CommentController(CommentService commentService, BlogService blogService, UserService userService) {
        this.commentService = commentService;
        this.blogService = blogService;
        this.userService = userService;
    }

    @GetMapping(value = "/get", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Comment> getComments() {
        return commentService.findAll();
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Comment getComment(@PathVariable UUID id) {
        return commentService.getById(id);
    }

    @PutMapping(value = "/save/{blog_id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void saveBlog(@Valid @RequestBody Comment comment, @PathVariable UUID blog_id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findByUsername(auth.getName());
        comment.setBlog(blogService.getById(blog_id));
        comment.setUser(user);
        commentService.save(comment);
    }

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void saveComment(@Valid @RequestBody Comment comment) {
        commentService.save(comment);
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable UUID id) {
        commentService.delete(id);
    }
}