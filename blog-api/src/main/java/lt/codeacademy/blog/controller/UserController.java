package lt.codeacademy.blog.controller;

import lt.codeacademy.blog.dto.UserDto;
import lt.codeacademy.blog.entity.Role;
import lt.codeacademy.blog.entity.User;
import lt.codeacademy.blog.repository.RoleRepository;
import lt.codeacademy.blog.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> processRegister(@Valid @RequestBody User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = "{bcrypt}" + passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setPasswordRepeat(encodedPassword);
        Set<Role> setOfRoles = new HashSet<>();
        setOfRoles.add(roleRepository.findByName("USER"));
        user.setRoles(setOfRoles);
        userService.save(user);
        return ResponseEntity.status(200).body("ok");
    }

    @PostMapping("/login")
    public UserDto login(@AuthenticationPrincipal User user) {
        return new UserDto(user);
    }

}