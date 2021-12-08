package lt.codeacademy.blog.controller;

import lt.codeacademy.blog.data.Role;
import lt.codeacademy.blog.data.User;
import lt.codeacademy.blog.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

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

    @PostMapping("/login")
    public ResponseEntity<?> processLogin(@RequestBody User user,
                                          HttpServletRequest request) {
        try {
            request.login(user.getUsername(), user.getPassword());
            return ResponseEntity.status(200).body("ok");
        } catch (ServletException e) {
            Map<String, List<String>> map = new HashMap<>();
            map.put("password", List.of(new String[]{e.getMessage()}));
            return ResponseEntity.status(400).body(map);
        }
    }

    @GetMapping(value = "/get", produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userService.findByUsername(auth.getName());
    }
}