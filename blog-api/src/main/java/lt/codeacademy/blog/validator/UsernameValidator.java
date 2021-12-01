package lt.codeacademy.blog.validator;

import lt.codeacademy.blog.service.UserService;
import lt.codeacademy.blog.validator.annotation.UniqueUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class UsernameValidator implements ConstraintValidator<UniqueUsername, String> {
    @Autowired
    UserService userService;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        return userService==null || userService.findByUsername(username) == null;
    }
}