package lt.codeacademy.blog.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class BlogNotFoundException extends RuntimeException{
    private final UUID id;
}