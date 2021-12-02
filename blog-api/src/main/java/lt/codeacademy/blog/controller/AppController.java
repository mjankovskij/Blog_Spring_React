package lt.codeacademy.blog.controller;

import lt.codeacademy.blog.data.Comment;
import lt.codeacademy.blog.data.Blog;
import lt.codeacademy.blog.data.User;
import lt.codeacademy.blog.service.BlogService;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.SortDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
public class AppController {

    @GetMapping
    public String loadIndex(Model model) {
        model.addAttribute("newUser", new User());
        return "index";
    }

}