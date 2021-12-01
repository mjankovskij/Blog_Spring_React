package lt.codeacademy.blog.exception.data;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Getter
public class ExceptionResponse {
    private final String message;
    private final int status;
    private final Long timestamp;

    public ExceptionResponse(String message, HttpStatus status) {
        this.message = message;
        this.status = status.value();
        timestamp = LocalDateTime.now().atZone(ZoneId.systemDefault()).toEpochSecond();
    }
}