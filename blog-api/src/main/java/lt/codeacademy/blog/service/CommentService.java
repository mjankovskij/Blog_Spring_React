package lt.codeacademy.blog.service;

import lt.codeacademy.blog.entity.Comment;
import lt.codeacademy.blog.exception.CommentNotFoundException;
import lt.codeacademy.blog.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public void save(Comment comment) {
            commentRepository.save(comment);
    }

    public void delete(UUID id) {
        commentRepository.deleteById(commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException(id)).getId());
    }

    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    public Comment getById(UUID id) {
        return commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException(id));
    }

}