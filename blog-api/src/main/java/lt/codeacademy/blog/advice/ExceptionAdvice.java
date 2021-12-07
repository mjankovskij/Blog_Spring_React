package lt.codeacademy.blog.advice;

import lt.codeacademy.blog.exception.BlogNotFoundException;
import lt.codeacademy.blog.exception.CommentNotFoundException;
import lt.codeacademy.blog.exception.data.ExceptionResponse;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, List<String>> map = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            try {
                map.get(fieldName).add(errorMessage);
            } catch (NullPointerException e) {
                map.put(fieldName, new ArrayList<>());
                map.get(fieldName).add(errorMessage);
            }
        });
        return ResponseEntity.status(400).body(map);
    }
}