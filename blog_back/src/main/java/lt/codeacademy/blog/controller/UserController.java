package lt.codeacademy.blog.controller;

import lt.codeacademy.blog.data.Role;
import lt.codeacademy.blog.data.User;
import lt.codeacademy.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String processRegister(@Valid @ModelAttribute("newUser") User user,
                                  BindingResult result,
                                  HttpServletRequest request) {
        if (result.hasErrors()) {
            return "fragments/register-form :: info-form";
        }
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
        return "fragments/register-form :: info-success";
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