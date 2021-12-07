package lt.codeacademy.blog.controller;

import lt.codeacademy.blog.data.Role;
import lt.codeacademy.blog.data.User;
import lt.codeacademy.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@Controller
@RequestMapping("/user")
public class UserController {
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

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> processRegister(@Valid @RequestBody User user, HttpServletRequest request) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        String passPlain = user.getPassword();
        user.setPassword(encodedPassword);
        user.setPasswordRepeat(encodedPassword);
        Set<Role> setOfRoles = new HashSet<>();
        setOfRoles.add(new Role("ROLE_USER", user));
        user.setRoles(setOfRoles);
        userService.save(user);
        try {
            request.login(user.getUsername(), passPlain);
        } catch (ServletException ignore) {
        }
        return ResponseEntity.status(200).body("ok");
    }

    @PostMapping(value = "/login")
    public String processLogin(@ModelAttribute("newUser") User user,
                               HttpServletRequest request,
                               Model model) {
        try {
            request.login(user.getUsername(), user.getPassword());
            return "fragments/login-form :: info-success";
        } catch (ServletException e) {
            model.addAttribute("error", e.getMessage());
            return "fragments/login-form :: info-form";
        }
    }
}