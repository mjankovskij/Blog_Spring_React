package lt.codeacademy.blog.advice;

import lt.codeacademy.blog.exception.BlogNotFoundException;
import lt.codeacademy.blog.exception.CommentNotFoundException;
import lt.codeacademy.blog.exception.data.ExceptionResponse;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(BlogNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handlingBlogNotFound(BlogNotFoundException exception) {
        return new ExceptionResponse(String.format("Blog %s not found", exception.getId()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CommentNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handlingCommentNotFound(CommentNotFoundException exception) {
        return new ExceptionResponse(String.format("Comment %s not found", exception.getId()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handlingEmptyResult(EmptyResultDataAccessException exception) {
        return new ExceptionResponse(exception.getMessage(), HttpStatus.NOT_FOUND);
    }
}