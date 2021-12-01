package lt.codeacademy.blog.validator;

import lt.codeacademy.blog.data.User;
import lt.codeacademy.blog.validator.annotation.PasswordMatch;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<PasswordMatch, User> {
    @Override
    public boolean isValid(User user, ConstraintValidatorContext constraintValidatorContext) {
        String password = user.getPassword();
        String repeatPassword = user.getPasswordRepeat();

        constraintValidatorContext.buildConstraintViolationWithTemplate("{lt.blog.passwordNotMatch}")
                    .addPropertyNode("passwordRepeat")
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();

        return password != null && password.equals(repeatPassword);
    }
}