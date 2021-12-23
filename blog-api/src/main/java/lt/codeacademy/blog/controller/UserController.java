package lt.codeacademy.blog.controller;

import lt.codeacademy.blog.dto.UserDto;
import lt.codeacademy.blog.entity.Role;
import lt.codeacademy.blog.entity.User;
import lt.codeacademy.blog.repository.RoleRepository;
import lt.codeacademy.blog.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final RoleRepository roleRepository;

    public UserController(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> processRegister(@Valid @RequestBody User user, HttpServletRequest request) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = "{bcrypt}" + passwordEncoder.encode(user.getPassword());
        String passPlain = user.getPassword();
        user.setPassword(encodedPassword);
        user.setPasswordRepeat(encodedPassword);
        Set<Role> setOfRoles = new HashSet<>();
        setOfRoles.add(roleRepository.findByName("USER"));
        user.setRoles(setOfRoles);
        userService.save(user);
//        try {
//            request.login(user.getUsername(), passPlain);
//        } catch (ServletException ignore) {
//        }
        return ResponseEntity.status(200).body("ok");
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> processLogin(@RequestBody User user,
//                                          HttpServletRequest request) {
//        try {
//            request.login(user.getUsername(), user.getPassword());
//            return ResponseEntity.status(200).body("ok");
//        } catch (ServletException e) {
//            Map<String, List<String>> map = new HashMap<>();
//            map.put("password", List.of(new String[]{e.getMessage()}));
//            return ResponseEntity.status(400).body(map);
//        }
//    }

    @PostMapping("/login")
    public UserDto login(@AuthenticationPrincipal User user) {
        return new UserDto(user);
    }

//    @GetMapping(value = "/get", produces = MediaType.APPLICATION_JSON_VALUE)
//    public User getUser() {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        return userService.findByUsername(auth.getName());
//    }
}