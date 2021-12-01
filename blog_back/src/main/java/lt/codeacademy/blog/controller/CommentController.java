package lt.codeacademy.blog.controller;

import lt.codeacademy.blog.data.Comment;
import lt.codeacademy.blog.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static lt.codeacademy.blog.ApiPath.ROOT;

@RestController
@RequestMapping(ROOT + "/comment")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(value = "/get", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Comment> getComments() {
        return commentService.getAll();
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Comment getComment(@PathVariable UUID id) {
        return commentService.getById(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void saveComment(@RequestBody Comment comment) {
        commentService.save(comment);
    }


//
//
//    @PreAuthorize("hasRole('ROLE_USER')")
//    @PostMapping(value = "/create")
//    public String processCreate(@Valid @ModelAttribute("newComment") Comment comment,
//                                BindingResult result,
//                                @RequestParam String blog_id,
//                                Model model,
//                                Locale locale) {
//        if (result.hasErrors()) {
//            return "fragments/comment-form :: info-form";
//        }
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        User user = userService.findByUsername(auth.getName());
//        if (!user.getRoles().stream().findFirst().get().getName().equals("ROLE_ADMIN") && comment.getId() != null && user != commentService.getById(comment.getId()).getUser()) {
//            throw new AccessDeniedException("Access is denied!");
//        } else {
//            comment.setBlog(blogService.getById(UUID.fromString(blog_id)));
//            comment.setUser(user);
//            commentService.save(comment);
//        }
//        model.addAttribute("success",
//                messageSource.getMessage("lt.blog.commentSavedSuccessfully", null, locale)
//        );
//        return "fragments/comment-form :: info-form";
//    }
//
//    @PreAuthorize("hasRole('ROLE_USER')")
//    @PostMapping("/delete")
//    public ResponseEntity<?> delete(@RequestParam String id, Locale locale) {
//        try {
//            Comment commentObj = commentService.getById(UUID.fromString(id));
//            commentService.delete(commentObj);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(400).body(e.getMessage());
//        }
//        return ResponseEntity.status(200).body(messageSource.getMessage("lt.blog.commentDeletedSuccessfully", null, locale));
//    }
}