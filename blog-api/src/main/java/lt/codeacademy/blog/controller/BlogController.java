package lt.codeacademy.blog.controller;

import static lt.codeacademy.blog.ApiPath.*;

import lt.codeacademy.blog.data.Blog;
import lt.codeacademy.blog.service.BlogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(ROOT + "/blog")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping(value = "/get", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Blog> getBlogs() {
        return blogService.getAll();
    }

    @GetMapping(value = "/getas", consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<Blog> getBlogsa() {
        return blogService.getAll();
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Blog getBlog(@PathVariable UUID id) {
        return blogService.getById(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void saveBlog(@RequestBody Blog blog) {
        blogService.save(blog);
    }

    @GetMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBlog(@PathVariable UUID id) {
        blogService.delete(id);
    }
//
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @PostMapping(value = "/create")
//    public String processCreate(@Valid @ModelAttribute("newBlog") Blog blog,
//                                BindingResult result,
//                                Model model,
//                                Locale locale) {
//        if (result.hasErrors()) {
//            return "fragments/blog-form :: info-form";
//        }
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        User user = userService.findByUsername(auth.getName());
//        blog.setUser(user);
//        blogService.save(blog);
//        model.addAttribute("success",
//                messageSource.getMessage("lt.blog.blogSavedSuccessfully", null, locale)
//        );
//        return "fragments/blog-form :: info-form";
//    }
//
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @PostMapping("/delete")
//    public ResponseEntity<?> delete(@RequestParam String id, Locale locale) {
//        try {
//            blogService.delete(UUID.fromString(id));
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(400).body(e.getMessage());
//        }
//        return ResponseEntity.status(200).body(messageSource.getMessage("lt.blog.blogDeletedSuccessfully", null, locale));
//    }
//
//    @GetMapping("/single/{id}")
//    public String loadBlog(Model model, @PathVariable UUID id) {
//        model.addAttribute("newUser", new User());
//        model.addAttribute("newBlog", new Blog());
//        model.addAttribute("newComment", new Comment());
//        model.addAttribute("blog", blogService.getById(id));
//        return "blog";
//    }
}