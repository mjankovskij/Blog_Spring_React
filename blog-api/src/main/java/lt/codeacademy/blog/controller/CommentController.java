package lt.codeacademy.blog.controller;

import static lt.codeacademy.blog.ApiPath.*;

import lt.codeacademy.blog.data.Comment;
import lt.codeacademy.blog.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(ROOT + "/comment")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(value = "/get", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Comment> getComments() {
        return commentService.findAll();
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Comment getComment(@PathVariable UUID id) {
        return commentService.getById(id);
    }

    @PutMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void saveComment(@RequestBody Comment comment) {
        commentService.save(comment);
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable UUID id) {
        commentService.delete(id);
    }
}