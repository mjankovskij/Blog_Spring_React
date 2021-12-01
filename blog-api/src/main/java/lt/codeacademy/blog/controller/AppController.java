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

    private final BlogService blogService;

    public AppController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public String loadIndex(Model model, @PageableDefault(size = 5)
    @SortDefault(sort = "datetime", direction = Sort.Direction.DESC) Pageable pageable) {
//        model.addAttribute("blogs", blogService.getBlogs(pageable));
        model.addAttribute("newUser", new User());
        model.addAttribute("newBlog", new Blog());
        model.addAttribute("newComment", new Comment());
        return "index";
    }

}